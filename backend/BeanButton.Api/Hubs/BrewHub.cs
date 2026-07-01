using BeanButton.Api.DTOs;
using Microsoft.AspNetCore.SignalR;

namespace BeanButton.Api.Hubs;

public class BrewHub : Hub
{
    public async Task JoinBrews()
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, "brews");
    }
}

public static class BrewHubExtensions
{
    public static Task BroadcastBrewAdded(IHubContext<BrewHub> hub, BrewDto brew) =>
        hub.Clients.Group("brews").SendAsync("BrewAdded", brew);

    public static Task BroadcastKudosUpdated(IHubContext<BrewHub> hub, int id, int newKudos) =>
        hub.Clients.Group("brews").SendAsync("KudosUpdated", id, newKudos);
}
