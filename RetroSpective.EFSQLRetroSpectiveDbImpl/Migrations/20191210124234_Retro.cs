using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Retrospective.EFSQLRetroSpectiveDbImpl.Migrations
{
    public partial class Retro : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RetroSpectives",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RetroSpectives", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Facilitators",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Retrospective = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Facilitators", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Facilitators_RetroSpectives_Retrospective",
                        column: x => x.Retrospective,
                        principalTable: "RetroSpectives",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RetroColumns",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(nullable: true),
                    RetroColumns = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RetroColumns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RetroColumns_RetroSpectives_RetroColumns",
                        column: x => x.RetroColumns,
                        principalTable: "RetroSpectives",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Participants",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Participants = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Participants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Participants_Facilitators_Participants",
                        column: x => x.Participants,
                        principalTable: "Facilitators",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RetroCards",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(nullable: true),
                    RetroCards = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RetroCards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RetroCards_RetroColumns_RetroCards",
                        column: x => x.RetroCards,
                        principalTable: "RetroColumns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Facilitators_Retrospective",
                table: "Facilitators",
                column: "Retrospective");

            migrationBuilder.CreateIndex(
                name: "IX_Participants_Participants",
                table: "Participants",
                column: "Participants");

            migrationBuilder.CreateIndex(
                name: "IX_RetroCards_RetroCards",
                table: "RetroCards",
                column: "RetroCards");

            migrationBuilder.CreateIndex(
                name: "IX_RetroColumns_RetroColumns",
                table: "RetroColumns",
                column: "RetroColumns");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Participants");

            migrationBuilder.DropTable(
                name: "RetroCards");

            migrationBuilder.DropTable(
                name: "Facilitators");

            migrationBuilder.DropTable(
                name: "RetroColumns");

            migrationBuilder.DropTable(
                name: "RetroSpectives");
        }
    }
}
