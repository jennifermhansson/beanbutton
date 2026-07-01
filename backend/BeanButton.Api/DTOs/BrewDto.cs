namespace BeanButton.Api.DTOs;

public class BrewDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime BrewedAt { get; set; }
    public int Kudos { get; set; }
}
