using BeanButton.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BeanButton.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Brew> Brews => Set<Brew>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Brew>(entity =>
        {
            entity.Property(b => b.Name).HasMaxLength(100).IsRequired();
            entity.Property(b => b.Kudos).HasDefaultValue(0);
            entity.HasIndex(b => b.BrewedAt).IsDescending();
        });
    }
}
