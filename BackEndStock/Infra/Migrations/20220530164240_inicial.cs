using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class inicial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Fornecedores",
                columns: table => new
                {
                    Id_Fornecedor = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fornecedores", x => x.Id_Fornecedor);
                });

            migrationBuilder.CreateTable(
                name: "Produtos",
                columns: table => new
                {
                    Id_Produto = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: false),
                    Qtd = table.Column<int>(type: "int", nullable: false),
                    Id_Fornecedor = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FornecedoresId_Fornecedor = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Produtos", x => x.Id_Produto);
                    table.ForeignKey(
                        name: "FK_Produtos_Fornecedores_FornecedoresId_Fornecedor",
                        column: x => x.FornecedoresId_Fornecedor,
                        principalTable: "Fornecedores",
                        principalColumn: "Id_Fornecedor",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Produtos_FornecedoresId_Fornecedor",
                table: "Produtos",
                column: "FornecedoresId_Fornecedor");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Produtos");

            migrationBuilder.DropTable(
                name: "Fornecedores");
        }
    }
}
