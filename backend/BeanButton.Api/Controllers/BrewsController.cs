using BeanButton.Api.Data;
using BeanButton.Api.DTOs;
using BeanButton.Api.Hubs;
using BeanButton.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace BeanButton.Api.Controllers;

[ApiController]
[Route("api")]
public class BrewsController(AppDbContext db, IHubContext<BrewHub> hub) : ControllerBase
{
    [HttpPost("brews")]
    [EnableRateLimiting("write")]
    public async Task<IActionResult> CreateBrew([FromBody] CreateBrewDto dto)
    {
        var name = dto.Name.Trim();
        if (name.Length == 0)
            return BadRequest("Name is required.");

        var brew = new Brew
        {
            Name = name,
            BrewedAt = DateTime.UtcNow,
            Kudos = 0
        };

        db.Brews.Add(brew);
        await db.SaveChangesAsync();

        var result = ToDto(brew);
        await BrewHubExtensions.BroadcastBrewAdded(hub, result);

        return CreatedAtAction(nameof(GetBrews), new { }, result);
    }

    [HttpGet("brews")]
    public async Task<IActionResult> GetBrews()
    {
        var brews = await db.Brews
            .OrderByDescending(b => b.BrewedAt)
            .Take(20)
            .Select(b => ToDto(b))
            .ToListAsync();

        return Ok(brews);
    }

    [HttpPost("brews/{id}/kudos")]
    [EnableRateLimiting("write")]
    public async Task<IActionResult> GiveKudos(int id)
    {
        while (true)
        {
            var brew = await db.Brews.FindAsync(id);
            if (brew is null)
                return NotFound();

            brew.Kudos += 1;

            try
            {
                await db.SaveChangesAsync();
                await BrewHubExtensions.BroadcastKudosUpdated(hub, brew.Id, brew.Kudos);
                return Ok(new { brew.Id, brew.Kudos });
            }
            catch (DbUpdateConcurrencyException)
            {
                db.Entry(brew).Reload();
            }
        }
    }

    [HttpGet("brewers/top")]
    public async Task<IActionResult> GetTopBrewers()
    {
        var top = await db.Brews
            .GroupBy(b => b.Name)
            .Select(g => new TopBrewerDto
            {
                Name = g.Key,
                TotalKudos = g.Sum(b => b.Kudos)
            })
            .OrderByDescending(t => t.TotalKudos)
            .Take(5)
            .ToListAsync();

        return Ok(top);
    }

    private static BrewDto ToDto(Brew b) => new()
    {
        Id = b.Id,
        Name = b.Name,
        BrewedAt = b.BrewedAt,
        Kudos = b.Kudos
    };
}
