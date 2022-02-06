using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using NTG.Models;
using System.IO;

namespace NTG.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly NTGDbContext _context;
        private readonly IWebHostEnvironment _Hosting;

        public EmployeesController(NTGDbContext context, IWebHostEnvironment Hosting)
        {
            _Hosting = Hosting;
            _context = context;
        }

        [HttpGet]
        public JsonResult GetEmployees()
        {
            var res = _context.Employees.Include(x => x.MyDepartment).ToList();
            return new JsonResult(res);
        }

        [HttpGet("{id}")]
        public JsonResult GetEmployee(int id)
        {
            var employee =  _context.Employees.Include(x=>x.MyDepartment).FirstOrDefault(i => i.EmployeeId == id);

            if (employee == null)
            {
                return new JsonResult("error");
            }

            return new JsonResult(employee);
        }

        [Route("search")]
        public JsonResult Search(string term)
        {
            var res = _context.Employees.Include(x => x.MyDepartment).Where(x=>x.FName.ToLower().Equals(term.ToLower())|| x.LName.ToLower().Equals(term.ToLower())).ToList();
            return new JsonResult(res);
        }

        [HttpPut("{id}")]
        public JsonResult PutEmployee(int id, Employee employee)
        {
            if (id != employee.EmployeeId)
            {
                return new JsonResult("error");
            }

            int DepartmentiD = employee.MyDepartment.DepartmentId;
            employee.MyDepartment = _context.Departments.Find(DepartmentiD);

            var sentFile = null ;//Request.Form != null ? Request.Form.Files[0] : null;
            if (sentFile != null)
            {
                var physicalPath = _Hosting.ContentRootPath + "/images/" + employee.PhotoPath;
                System.IO.File.Delete(physicalPath);
                physicalPath = _Hosting.ContentRootPath + "/images" + sentFile.FileName;
                sentFile.CopyTo(new FileStream(physicalPath, FileMode.Create));
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                 _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return new JsonResult("error");
                }
                else
                {
                    throw;
                }
            }

            return new JsonResult("Success");
        }

        [HttpPost]
        public JsonResult PostEmployee(Employee employee)
        {
            int DepartmentiD = employee.MyDepartment.DepartmentId;
            employee.MyDepartment = _context.Departments.Find(DepartmentiD);

            var sentFile = null ;//Request.Form != null ? Request.Form.Files[0] : null;
            if (sentFile!=null)
            {
                var physicalPath = _Hosting.ContentRootPath + "/images" + sentFile.FileName;
                sentFile.CopyTo(new FileStream(physicalPath, FileMode.Create));
            }

            _context.Employees.Add(employee);
             _context.SaveChanges();

            return new JsonResult("success");//CreatedAtAction("GetEmployee", new { id = employee.EmployeeId }, employee);
        }

        [HttpDelete("{id}")]
        public JsonResult DeleteEmployee(int id)
        {
            var employee = _context.Employees.Find(id);
            if (employee == null)
            {
                return new JsonResult("error");
            }

            if (employee.PhotoPath != null)
            {
                var physicalPath = _Hosting.ContentRootPath + "/images/" + employee.PhotoPath;
                System.IO.File.Delete(physicalPath);
            }
            _context.Employees.Remove(employee);
            _context.SaveChanges();



            return new JsonResult("");
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.EmployeeId == id);
        }
    }
}
