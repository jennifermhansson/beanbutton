using BeanButton.Api.Data;
using BeanButton.Api.DTOs;
using BeanButton.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BeanButton.Api.Controllers;

[ApiController]
[Route("api/push")]
public class PushController(AppDbContext db, IConfiguration config) : ControllerBase
{
    [HttpGet("vapid-public-key")]
    public IActionResult GetPublicKey()
    {
        var key = config["Vapid:PublicKey"];
        if (string.IsNullOrEmpty(key))
            return NotFound();
        return Ok(new { publicKey = key });
    }

    [HttpPost("subscribe")]
    public async Task<IActionResult> Subscribe([FromBody] PushSubscribeDto dto)
    {
        var existing = await db.PushSubscriptions.FirstOrDefaultAsync(s => s.Endpoint == dto.Endpoint);
        if (existing is not null)
            return Ok();

        db.PushSubscriptions.Add(new PushSubscription
        {
            Endpoint = dto.Endpoint,
            P256dh = dto.P256dh,
            Auth = dto.Auth
        });
        await db.SaveChangesAsync();
        return Created(string.Empty, null);
    }

    [HttpDelete("subscribe")]
    public async Task<IActionResult> Unsubscribe([FromBody] PushSubscribeDto dto)
    {
        var sub = await db.PushSubscriptions.FirstOrDefaultAsync(s => s.Endpoint == dto.Endpoint);
        if (sub is null) return NoContent();
        db.PushSubscriptions.Remove(sub);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
