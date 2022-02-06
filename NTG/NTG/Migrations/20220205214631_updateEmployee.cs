using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace NTG.Migrations
{
    public partial class updateEmployee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateJoin",
                table: "Employees",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "PhotoPath",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateJoin",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "PhotoPath",
                table: "Employees");
        }
    }
}
