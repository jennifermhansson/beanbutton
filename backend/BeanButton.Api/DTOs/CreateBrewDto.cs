using System.ComponentModel.DataAnnotations;

namespace BeanButton.Api.DTOs;

public class CreateBrewDto
{
    [Required]
    [MaxLength(100)]
    [RegularExpression(@"^[^<>]+$", ErrorMessage = "Name may not contain '<' or '>'.")]
    public string Name { get; set; } = string.Empty;
}
