using Microsoft.EntityFrameworkCore.Migrations;

namespace RetroSpective_EFSQLRetroSpectiveDbImpl.Migrations
{
    public partial class UniqueValue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FamilyId",
                table: "BaseItem",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_BaseItem_FamilyId",
                table: "BaseItem",
                column: "FamilyId",
                unique: true,
                filter: "[FamilyId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_BaseItem_FamilyId",
                table: "BaseItem");

            migrationBuilder.DropColumn(
                name: "FamilyId",
                table: "BaseItem");
        }
    }
}
