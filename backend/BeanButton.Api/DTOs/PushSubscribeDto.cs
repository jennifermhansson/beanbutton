using System.ComponentModel.DataAnnotations;

namespace BeanButton.Api.DTOs;

public record PushSubscribeDto(
    [Required] string Endpoint,
    [Required] string P256dh,
    [Required] string Auth
);
