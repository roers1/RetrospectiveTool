using Microsoft.EntityFrameworkCore.Migrations;

namespace Retrospective_EFSQLRetroSpectiveDbImpl.Migrations
{
    public partial class addedcascade : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RetroCards_RetroColumns_RetroColumnId",
                table: "RetroCards");

            migrationBuilder.DropForeignKey(
                name: "FK_RetroColumns_Retrospectives_RetrospectiveId",
                table: "RetroColumns");

            migrationBuilder.AlterColumn<int>(
                name: "RetrospectiveId",
                table: "RetroColumns",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "RetroColumnId",
                table: "RetroCards",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_RetroCards_RetroColumns_RetroColumnId",
                table: "RetroCards",
                column: "RetroColumnId",
                principalTable: "RetroColumns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RetroColumns_Retrospectives_RetrospectiveId",
                table: "RetroColumns",
                column: "RetrospectiveId",
                principalTable: "Retrospectives",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RetroCards_RetroColumns_RetroColumnId",
                table: "RetroCards");

            migrationBuilder.DropForeignKey(
                name: "FK_RetroColumns_Retrospectives_RetrospectiveId",
                table: "RetroColumns");

            migrationBuilder.AlterColumn<int>(
                name: "RetrospectiveId",
                table: "RetroColumns",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "RetroColumnId",
                table: "RetroCards",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_RetroCards_RetroColumns_RetroColumnId",
                table: "RetroCards",
                column: "RetroColumnId",
                principalTable: "RetroColumns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RetroColumns_Retrospectives_RetrospectiveId",
                table: "RetroColumns",
                column: "RetrospectiveId",
                principalTable: "Retrospectives",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
