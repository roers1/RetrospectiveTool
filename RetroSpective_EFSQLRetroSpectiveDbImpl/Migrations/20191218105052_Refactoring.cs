using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RetroSpective_EFSQLRetroSpectiveDbImpl.Migrations
{
    public partial class Refactoring : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Retrospectives",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "Date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Retrospectives", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RetroColumns",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(nullable: true),
                    RetrospectiveId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RetroColumns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RetroColumns_Retrospectives_RetrospectiveId",
                        column: x => x.RetrospectiveId,
                        principalTable: "Retrospectives",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RetroCards",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(nullable: true),
                    Position = table.Column<int>(nullable: false),
                    RetroColumnId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RetroCards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RetroCards_RetroColumns_RetroColumnId",
                        column: x => x.RetroColumnId,
                        principalTable: "RetroColumns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RetroCards_RetroColumnId",
                table: "RetroCards",
                column: "RetroColumnId");

            migrationBuilder.CreateIndex(
                name: "IX_RetroColumns_RetrospectiveId",
                table: "RetroColumns",
                column: "RetrospectiveId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RetroCards");

            migrationBuilder.DropTable(
                name: "RetroColumns");

            migrationBuilder.DropTable(
                name: "Retrospectives");
        }
    }
}
