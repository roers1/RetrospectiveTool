using Microsoft.EntityFrameworkCore.Migrations;

namespace RetroSpective_EFSQLRetroSpectiveDbImpl.Migrations
{
    public partial class Additionofforeignkey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BaseItem_BaseItem_RetroFamilyId",
                table: "BaseItem");

            migrationBuilder.DropIndex(
                name: "IX_BaseItem_RetroFamilyId",
                table: "BaseItem");

            migrationBuilder.AddForeignKey(
                name: "FK_BaseItem_BaseItem_RetroColumnId",
                table: "BaseItem",
                column: "RetroColumnId",
                principalTable: "BaseItem",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BaseItem_BaseItem_RetroColumnId",
                table: "BaseItem");

            migrationBuilder.CreateIndex(
                name: "IX_BaseItem_RetroFamilyId",
                table: "BaseItem",
                column: "RetroFamilyId");

            migrationBuilder.AddForeignKey(
                name: "FK_BaseItem_BaseItem_RetroFamilyId",
                table: "BaseItem",
                column: "RetroFamilyId",
                principalTable: "BaseItem",
                principalColumn: "Id");
        }
    }
}
