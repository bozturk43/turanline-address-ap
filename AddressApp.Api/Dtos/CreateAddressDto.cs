using System.ComponentModel.DataAnnotations;

namespace AddressApp.Api.Dtos
{
    public class CreateAddressDto
    {
        [Required]
        public string? Region { get; set; }

        [Required]
        public string? City { get; set; }

        public string? BranchNumber { get; set; }

        [Required]
        public string? StreetAddress { get; set; }

        public string? Phone { get; set; }
        
        public string? WorkingHours { get; set; }
    }
}