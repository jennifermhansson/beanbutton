using BeanButton.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BeanButton.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Brew> Brews => Set<Brew>();
    public DbSet<PushSubscription> PushSubscriptions => Set<PushSubscription>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Brew>(entity =>
        {
            entity.Property(b => b.Name).HasMaxLength(100).IsRequired();
            entity.HasIndex(b => b.BrewedAt).IsDescending();
        });

        modelBuilder.Entity<PushSubscription>(entity =>
        {
            entity.HasIndex(p => p.Endpoint).IsUnique();
            entity.Property(p => p.Endpoint).HasMaxLength(512).IsRequired();
            entity.Property(p => p.P256dh).HasMaxLength(256).IsRequired();
            entity.Property(p => p.Auth).HasMaxLength(128).IsRequired();
        });
    }
}
