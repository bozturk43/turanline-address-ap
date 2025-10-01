using System.ComponentModel.DataAnnotations;

namespace AddressApp.Api.Models
{
    public class Address
    {
        [Key]
        public int Id { get; set; }

        public string? Region { get; set; }

        public string? City { get; set; }

        public string? BranchNumber { get; set; }

        public string? StreetAddress { get; set; }

        public string? Phone { get; set; }

        public string? WorkingHours { get; set; }
    }
}