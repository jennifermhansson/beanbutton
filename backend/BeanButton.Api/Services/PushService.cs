using BeanButton.Api.Data;
using Microsoft.EntityFrameworkCore;
using WebPush;

namespace BeanButton.Api.Services;

public class PushService(AppDbContext db, IConfiguration config, ILogger<PushService> logger)
{
    private readonly string _publicKey = config["Vapid:PublicKey"] ?? throw new InvalidOperationException("Vapid:PublicKey not configured");
    private readonly string _privateKey = config["Vapid:PrivateKey"] ?? throw new InvalidOperationException("Vapid:PrivateKey not configured");
    private readonly string _subject = config["Vapid:Subject"] ?? "mailto:admin@beanbutton.app";

    public async Task SendBrewNotificationAsync(string brewerName)
    {
        var subscriptions = await db.PushSubscriptions.ToListAsync();
        if (subscriptions.Count == 0) return;

        var client = new WebPushClient();
        client.SetVapidDetails(_subject, _publicKey, _privateKey);

        var payload = System.Text.Json.JsonSerializer.Serialize(new
        {
            title = "☕ Kaffe är klart!",
            body = $"{brewerName} har bryggat kaffe",
            icon = "/favicon.svg"
        });

        var staleEndpoints = new List<int>();

        await Parallel.ForEachAsync(subscriptions, async (sub, _) =>
        {
            try
            {
                var pushSub = new PushSubscription(sub.Endpoint, sub.P256dh, sub.Auth);
                await client.SendNotificationAsync(pushSub, payload);
            }
            catch (WebPushException ex) when (ex.StatusCode is System.Net.HttpStatusCode.Gone or System.Net.HttpStatusCode.NotFound)
            {
                lock (staleEndpoints) staleEndpoints.Add(sub.Id);
            }
            catch (Exception ex)
            {
                logger.LogWarning(ex, "Failed to send push to endpoint {Endpoint}", sub.Endpoint);
            }
        });

        if (staleEndpoints.Count > 0)
        {
            db.PushSubscriptions.RemoveRange(db.PushSubscriptions.Where(s => staleEndpoints.Contains(s.Id)));
            await db.SaveChangesAsync();
        }
    }
}
