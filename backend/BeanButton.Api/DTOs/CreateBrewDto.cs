using System.ComponentModel.DataAnnotations;

namespace BeanButton.Api.DTOs;

public class CreateBrewDto
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;
}
