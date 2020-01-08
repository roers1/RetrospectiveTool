using Microsoft.EntityFrameworkCore.Migrations;

namespace RetroSpective_EFSQLRetroSpectiveDbImpl.Migrations
{
    public partial class Introducedabstractclassforcontent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RetroCards_RetroColumns_RetroColumnId",
                table: "RetroCards");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RetroCards",
                table: "RetroCards");

            migrationBuilder.RenameTable(
                name: "RetroCards",
                newName: "BaseItem");

            migrationBuilder.RenameColumn(
                name: "Upvotes",
                table: "BaseItem",
                newName: "UpVotes");

            migrationBuilder.RenameColumn(
                name: "Downvotes",
                table: "BaseItem",
                newName: "DownVotes");

            migrationBuilder.RenameIndex(
                name: "IX_RetroCards_RetroColumnId",
                table: "BaseItem",
                newName: "IX_BaseItem_RetroColumnId");

            migrationBuilder.AlterColumn<int>(
                name: "UpVotes",
                table: "BaseItem",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "DownVotes",
                table: "BaseItem",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "BaseItem",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "FamilyId",
                table: "BaseItem",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RetroFamilyId",
                table: "BaseItem",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_BaseItem",
                table: "BaseItem",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_BaseItem_RetroFamilyId",
                table: "BaseItem",
                column: "RetroFamilyId");

            migrationBuilder.AddForeignKey(
                name: "FK_BaseItem_RetroColumns_RetroColumnId",
                table: "BaseItem",
                column: "RetroColumnId",
                principalTable: "RetroColumns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BaseItem_BaseItem_RetroFamilyId",
                table: "BaseItem",
                column: "RetroFamilyId",
                principalTable: "BaseItem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BaseItem_RetroColumns_RetroColumnId",
                table: "BaseItem");

            migrationBuilder.DropForeignKey(
                name: "FK_BaseItem_BaseItem_RetroFamilyId",
                table: "BaseItem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BaseItem",
                table: "BaseItem");

            migrationBuilder.DropIndex(
                name: "IX_BaseItem_RetroFamilyId",
                table: "BaseItem");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "BaseItem");

            migrationBuilder.DropColumn(
                name: "FamilyId",
                table: "BaseItem");

            migrationBuilder.DropColumn(
                name: "RetroFamilyId",
                table: "BaseItem");

            migrationBuilder.RenameTable(
                name: "BaseItem",
                newName: "RetroCards");

            migrationBuilder.RenameColumn(
                name: "UpVotes",
                table: "RetroCards",
                newName: "Upvotes");

            migrationBuilder.RenameColumn(
                name: "DownVotes",
                table: "RetroCards",
                newName: "Downvotes");

            migrationBuilder.RenameIndex(
                name: "IX_BaseItem_RetroColumnId",
                table: "RetroCards",
                newName: "IX_RetroCards_RetroColumnId");

            migrationBuilder.AlterColumn<int>(
                name: "Upvotes",
                table: "RetroCards",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Downvotes",
                table: "RetroCards",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_RetroCards",
                table: "RetroCards",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RetroCards_RetroColumns_RetroColumnId",
                table: "RetroCards",
                column: "RetroColumnId",
                principalTable: "RetroColumns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
