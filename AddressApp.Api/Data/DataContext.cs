using AddressApp.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace AddressApp.Api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        public DbSet<Address> Addresses { get; set; }
    }
}