using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NTG.Models
{
    public class NTGDbContext: DbContext
    {
        public NTGDbContext(DbContextOptions<NTGDbContext> options) : base(options)
        {

        }
        public DbSet<Department> Departments { set; get; }
        public DbSet<Employee> Employees { set; get; }

    }
}
