using AddressApp.Api.Models;

namespace AddressApp.Api.Services
{
    public interface IAddressService
    {
        Task<IEnumerable<Address>> ParseAndSaveAddressesAsync(IEnumerable<string> addressLines);
    }
}