using System.ComponentModel.DataAnnotations;

namespace BeanButton.Api.Models;

public class Brew
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    public DateTime BrewedAt { get; set; }

    public int Kudos { get; set; } = 0;
}
