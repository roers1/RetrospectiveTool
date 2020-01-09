using Microsoft.EntityFrameworkCore.Migrations;

namespace RetroSpective_EFSQLRetroSpectiveDbImpl.Migrations
{
    public partial class RemoveUniqueValue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_BaseItem_FamilyId",
                table: "BaseItem");

            migrationBuilder.DropColumn(
                name: "FamilyId",
                table: "BaseItem");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FamilyId",
                table: "BaseItem",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_BaseItem_FamilyId",
                table: "BaseItem",
                column: "FamilyId",
                unique: true,
                filter: "[FamilyId] IS NOT NULL");
        }
    }
}
