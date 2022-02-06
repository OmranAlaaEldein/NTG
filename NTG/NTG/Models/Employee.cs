using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NTG.Models
{
    public class Employee
    {
        [Key]
        public int EmployeeId { set; get; }

        [StringLength(20, MinimumLength = 2)]
        public string FName { set; get; }

        [StringLength(20, MinimumLength = 2)]
        public string LName { set; get; }

        public string Address { set; get; }

        [EmailAddress]
        public string Email { set; get; }

        [Phone]
        public string PhoneNumber { set; get; }

        public DateTime DateJoin { set; get; }

        public string PhotoPath { set; get; }

        public Department MyDepartment { set; get; }
    }
}
