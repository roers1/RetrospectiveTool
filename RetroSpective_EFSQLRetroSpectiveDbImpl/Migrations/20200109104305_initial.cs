using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RetroSpective_EFSQLRetroSpectiveDbImpl.Migrations
{
    public partial class initial : Migration
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
                name: "BaseItem",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(nullable: true),
                    Position = table.Column<int>(nullable: false),
                    RetroColumnId = table.Column<int>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    UpVotes = table.Column<int>(nullable: true),
                    DownVotes = table.Column<int>(nullable: true),
                    RetroFamilyId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaseItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BaseItem_RetroColumns_RetroColumnId",
                        column: x => x.RetroColumnId,
                        principalTable: "RetroColumns",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_BaseItem_BaseItem_RetroFamilyId",
                        column: x => x.RetroFamilyId,
                        principalTable: "BaseItem",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_BaseItem_RetroColumnId",
                table: "BaseItem",
                column: "RetroColumnId");

            migrationBuilder.CreateIndex(
                name: "IX_BaseItem_RetroFamilyId",
                table: "BaseItem",
                column: "RetroFamilyId");

            migrationBuilder.CreateIndex(
                name: "IX_RetroColumns_RetrospectiveId",
                table: "RetroColumns",
                column: "RetrospectiveId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BaseItem");

            migrationBuilder.DropTable(
                name: "RetroColumns");

            migrationBuilder.DropTable(
                name: "Retrospectives");
        }
    }
}
