using AddressApp.Api.Data;
using AddressApp.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AddressApp.Api.Dtos;
using AddressApp.Api.Services;


namespace AddressApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AddressesController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IAddressService _addressService;


        public AddressesController(DataContext context,IAddressService addressService)
        {
            _context = context;
            _addressService = addressService;
        }

        [HttpPost]
        public async Task<ActionResult<Address>> CreateAddress(CreateAddressDto addressDto)
        {
            var address = new Address
            {
                Region = addressDto.Region,
                City = addressDto.City,
                BranchNumber = addressDto.BranchNumber,
                StreetAddress = addressDto.StreetAddress,
                Phone = addressDto.Phone,
                WorkingHours = addressDto.WorkingHours
            };

            _context.Addresses.Add(address);
            
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAddress), new { id = address.Id }, address);
        }
        [HttpPost("bulk-import")]
        public async Task<ActionResult<IEnumerable<Address>>> BulkImport([FromBody] IEnumerable<string> addressLines)
        {
            if (addressLines == null || !addressLines.Any())
            {
                return BadRequest("Address lines cannot be empty.");
            }

            var createdAddresses = await _addressService.ParseAndSaveAddressesAsync(addressLines);

            return Ok(new { Message = $"{createdAddresses.Count()} addresses successfully imported.", Data = createdAddresses });
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Address>>> GetAddresses()
        {
            var addresses = await _context.Addresses.ToListAsync();
            return Ok(addresses);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Address>> GetAddress(int id)
        {
            var address = await _context.Addresses.FindAsync(id);

            if (address == null)
            {
                return NotFound();
            }

            return address;
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAddress(int id, UpdateAddressDto addressDto)
        {
            var address = await _context.Addresses.FindAsync(id);

            if (address == null)
            {
                return NotFound();
            }

            address.Region = addressDto.Region;
            address.City = addressDto.City;
            address.BranchNumber = addressDto.BranchNumber;
            address.StreetAddress = addressDto.StreetAddress;
            address.Phone = addressDto.Phone;
            address.WorkingHours = addressDto.WorkingHours;

            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAddress(int id)
        {
            var address = await _context.Addresses.FindAsync(id);

            if (address == null)
            {
                return NotFound();
            }

            _context.Addresses.Remove(address);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}