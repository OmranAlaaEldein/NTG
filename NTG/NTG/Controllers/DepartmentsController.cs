using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NTG.Models;

namespace NTG.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly NTGDbContext _context;
        public DepartmentsController(NTGDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public JsonResult GetDepartments()
        {
            return new JsonResult(_context.Departments.ToList());
        }

        [HttpGet("{id}")]
        public JsonResult GetDepartment(int id)
        {
            var department =  _context.Departments.Find(id);

            if (department == null)
            {
                return new JsonResult("error");
            }

            return new JsonResult(department);
        }

        [Route("search")]
        public JsonResult Search(string term)
        {
            var res = _context.Departments.Where(x => x.DepartmentName.ToLower().Equals(term.ToLower()) ).ToList();
            return new JsonResult(res);
        }

        [HttpPut("{id}")]
        public JsonResult PutDepartment(Department department)
        {
            _context.Entry(department).State = EntityState.Modified;
             _context.SaveChanges();
            return new JsonResult("Success");
        }

        [HttpPost]
        public JsonResult PostDepartment(Department department)
        {
            _context.Departments.Add(department);
            _context.SaveChanges();

            return new JsonResult("success");//CreatedAtAction("GetDepartment", new { id = department.DepartmentId }, department);
        }

        [HttpDelete("{id}")]
        public JsonResult DeleteDepartment(int id)
        {
            var department =  _context.Departments.Find(id);
            if (department == null)
            {
                return new JsonResult("error");
            }

            _context.Departments.Remove(department);
            _context.SaveChanges();

            return new JsonResult("success");
        }

        private bool DepartmentExists(int id)
        {
            return _context.Departments.Any(e => e.DepartmentId == id);
        }
    }
}
