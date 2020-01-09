using Microsoft.EntityFrameworkCore.Migrations;

namespace RetroSpective_EFSQLRetroSpectiveDbImpl.Migrations
{
    public partial class Initial3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "RetroFamilyId",
                table: "RetroCards",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "RetroFamilyId",
                table: "RetroCards",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
