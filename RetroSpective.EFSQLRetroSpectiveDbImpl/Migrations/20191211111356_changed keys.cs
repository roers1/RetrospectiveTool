using Microsoft.EntityFrameworkCore.Migrations;

namespace Retrospective_EFSQLRetroSpectiveDbImpl.Migrations
{
    public partial class changedkeys : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RetroCards_RetroColumns_RetroCards",
                table: "RetroCards");

            migrationBuilder.DropForeignKey(
                name: "FK_RetroColumns_RetroSpectives_RetroColumns",
                table: "RetroColumns");

            migrationBuilder.DropTable(
                name: "Participants");

            migrationBuilder.DropTable(
                name: "Facilitators");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RetroSpectives",
                table: "RetroSpectives");

            migrationBuilder.DropIndex(
                name: "IX_RetroColumns_RetroColumns",
                table: "RetroColumns");

            migrationBuilder.DropIndex(
                name: "IX_RetroCards_RetroCards",
                table: "RetroCards");

            migrationBuilder.DropColumn(
                name: "RetroColumns",
                table: "RetroColumns");

            migrationBuilder.DropColumn(
                name: "RetroCards",
                table: "RetroCards");

            migrationBuilder.RenameTable(
                name: "RetroSpectives",
                newName: "Retrospectives");

            migrationBuilder.AddColumn<int>(
                name: "RetrospectiveId",
                table: "RetroColumns",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Position",
                table: "RetroCards",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RetroColumnId",
                table: "RetroCards",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Retrospectives",
                table: "Retrospectives",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_RetroColumns_RetrospectiveId",
                table: "RetroColumns",
                column: "RetrospectiveId");

            migrationBuilder.CreateIndex(
                name: "IX_RetroCards_RetroColumnId",
                table: "RetroCards",
                column: "RetroColumnId");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RetroCards_RetroColumns_RetroColumnId",
                table: "RetroCards");

            migrationBuilder.DropForeignKey(
                name: "FK_RetroColumns_Retrospectives_RetrospectiveId",
                table: "RetroColumns");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Retrospectives",
                table: "Retrospectives");

            migrationBuilder.DropIndex(
                name: "IX_RetroColumns_RetrospectiveId",
                table: "RetroColumns");

            migrationBuilder.DropIndex(
                name: "IX_RetroCards_RetroColumnId",
                table: "RetroCards");

            migrationBuilder.DropColumn(
                name: "RetrospectiveId",
                table: "RetroColumns");

            migrationBuilder.DropColumn(
                name: "Position",
                table: "RetroCards");

            migrationBuilder.DropColumn(
                name: "RetroColumnId",
                table: "RetroCards");

            migrationBuilder.RenameTable(
                name: "Retrospectives",
                newName: "RetroSpectives");

            migrationBuilder.AddColumn<int>(
                name: "RetroColumns",
                table: "RetroColumns",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RetroCards",
                table: "RetroCards",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_RetroSpectives",
                table: "RetroSpectives",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Facilitators",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RetrospectiveId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Facilitators", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Facilitators_RetroSpectives_RetrospectiveId",
                        column: x => x.RetrospectiveId,
                        principalTable: "RetroSpectives",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Participants",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FacilitatorId = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Participants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Participants_Facilitators_FacilitatorId",
                        column: x => x.FacilitatorId,
                        principalTable: "Facilitators",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RetroColumns_RetroColumns",
                table: "RetroColumns",
                column: "RetroColumns");

            migrationBuilder.CreateIndex(
                name: "IX_RetroCards_RetroCards",
                table: "RetroCards",
                column: "RetroCards");

            migrationBuilder.CreateIndex(
                name: "IX_Facilitators_RetrospectiveId",
                table: "Facilitators",
                column: "RetrospectiveId");

            migrationBuilder.CreateIndex(
                name: "IX_Participants_FacilitatorId",
                table: "Participants",
                column: "FacilitatorId");

            migrationBuilder.AddForeignKey(
                name: "FK_RetroCards_RetroColumns_RetroCards",
                table: "RetroCards",
                column: "RetroCards",
                principalTable: "RetroColumns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RetroColumns_RetroSpectives_RetroColumns",
                table: "RetroColumns",
                column: "RetroColumns",
                principalTable: "RetroSpectives",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
