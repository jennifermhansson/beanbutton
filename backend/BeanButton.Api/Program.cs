using BeanButton.Api.Data;
using BeanButton.Api.Hubs;
using BeanButton.Api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING")
    ?? throw new InvalidOperationException("CONNECTION_STRING environment variable is not set.");

var frontendUrl = Environment.GetEnvironmentVariable("FRONTEND_URL") ?? "http://localhost:5173";

builder.Configuration["Vapid:PublicKey"] = Environment.GetEnvironmentVariable("VAPID_PUBLIC_KEY") ?? "";
builder.Configuration["Vapid:PrivateKey"] = Environment.GetEnvironmentVariable("VAPID_PRIVATE_KEY") ?? "";
builder.Configuration["Vapid:Subject"] = Environment.GetEnvironmentVariable("VAPID_SUBJECT") ?? "mailto:admin@beanbutton.app";

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddScoped<PushService>();

builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(frontendUrl)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddControllers();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await dbContext.Database.MigrateAsync();
}

app.UseCors();
app.MapControllers();
app.MapHub<BrewHub>("/hubs/brew");

app.Run();
