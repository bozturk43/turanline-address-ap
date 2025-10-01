using System.Text.RegularExpressions;
using AddressApp.Api.Data;
using AddressApp.Api.Models;

namespace AddressApp.Api.Services
{
    public class AddressService : IAddressService
    {
        private readonly DataContext _context;

        public AddressService(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Address>> ParseAndSaveAddressesAsync(IEnumerable<string> addressLines)
        {

            // Bu Regex deseni, metindeki her bir parçayı isimlendirilmiş gruplarla yakalar.
            var regex = new Regex(
                @"^(?<region>[^,]+),\s*(?<city>[^,]+),\s*Відділення\s*№(?<branchNumber>\d+)[^:]*:\s*(?<streetAddress>[^,]+,\s*\d+),\s*(?<phone>\+?\d+),\s*(?<workingHours>.+)$",
                RegexOptions.Compiled);

            var newAddresses = new List<Address>();

            foreach (var line in addressLines)
            {
                var match = regex.Match(line);
                if (match.Success)
                {
                    var address = new Address
                    {
                        Region = match.Groups["region"].Value.Trim(),
                        City = match.Groups["city"].Value.Trim(),
                        BranchNumber = match.Groups["branchNumber"].Value.Trim(),
                        StreetAddress = match.Groups["streetAddress"].Value.Trim(),
                        Phone = match.Groups["phone"].Value.Trim(),
                        WorkingHours = match.Groups["workingHours"].Value.Trim()
                    };
                    newAddresses.Add(address);
                }
            }

            if (newAddresses.Any())
            {
                await _context.Addresses.AddRangeAsync(newAddresses);
                await _context.SaveChangesAsync();
            }

            return newAddresses;
        }
    }
}