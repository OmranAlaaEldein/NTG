using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NTG.Models
{
    public class Department
    {
        [Key]
        public int DepartmentId { set; get; }

        [StringLength(20, MinimumLength = 2)]
        public string DepartmentName { set; get; }
        
        [StringLength(200, MinimumLength = 10)]
        public string Location { set; get; }

        public ICollection<Employee> DEmployee { set; get; }
    }
}
