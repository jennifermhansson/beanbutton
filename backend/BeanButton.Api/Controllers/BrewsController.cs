using BeanButton.Api.Data;
using BeanButton.Api.DTOs;
using BeanButton.Api.Hubs;
using BeanButton.Api.Models;
using BeanButton.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace BeanButton.Api.Controllers;

[ApiController]
[Route("api")]
public class BrewsController(AppDbContext db, IHubContext<BrewHub> hub, PushService pushService) : ControllerBase
{
    [HttpPost("brews")]
    public async Task<IActionResult> CreateBrew([FromBody] CreateBrewDto dto)
    {
        var brew = new Brew
        {
            Name = dto.Name,
            BrewedAt = DateTime.UtcNow,
            Kudos = 0
        };

        db.Brews.Add(brew);
        await db.SaveChangesAsync();

        var result = ToDto(brew);
        await BrewHubExtensions.BroadcastBrewAdded(hub, result);
        _ = Task.Run(() => pushService.SendBrewNotificationAsync(brew.Name));

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
