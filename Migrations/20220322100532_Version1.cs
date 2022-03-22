using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebProjekat.Migrations
{
    public partial class Version1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Korisnik",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Korisnik", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Ordinacija",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Adresa = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ordinacija", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Termin",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Vreme = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Termin", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Usluga",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Tip = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Cena = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usluga", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Zubar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Godine = table.Column<int>(type: "int", nullable: false),
                    OrdinacijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zubar", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Zubar_Ordinacija_OrdinacijaID",
                        column: x => x.OrdinacijaID,
                        principalTable: "Ordinacija",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Spoj",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UslugaID = table.Column<int>(type: "int", nullable: true),
                    ZubarID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spoj", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Spoj_Usluga_UslugaID",
                        column: x => x.UslugaID,
                        principalTable: "Usluga",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Spoj_Zubar_ZubarID",
                        column: x => x.ZubarID,
                        principalTable: "Zubar",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Zakazano",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ZubarID = table.Column<int>(type: "int", nullable: true),
                    TerminID = table.Column<int>(type: "int", nullable: true),
                    KorisnikID = table.Column<int>(type: "int", nullable: true),
                    UslugaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zakazano", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Zakazano_Korisnik_KorisnikID",
                        column: x => x.KorisnikID,
                        principalTable: "Korisnik",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Zakazano_Termin_TerminID",
                        column: x => x.TerminID,
                        principalTable: "Termin",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Zakazano_Usluga_UslugaID",
                        column: x => x.UslugaID,
                        principalTable: "Usluga",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Zakazano_Zubar_ZubarID",
                        column: x => x.ZubarID,
                        principalTable: "Zubar",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Spoj_UslugaID",
                table: "Spoj",
                column: "UslugaID");

            migrationBuilder.CreateIndex(
                name: "IX_Spoj_ZubarID",
                table: "Spoj",
                column: "ZubarID");

            migrationBuilder.CreateIndex(
                name: "IX_Zakazano_KorisnikID",
                table: "Zakazano",
                column: "KorisnikID");

            migrationBuilder.CreateIndex(
                name: "IX_Zakazano_TerminID",
                table: "Zakazano",
                column: "TerminID");

            migrationBuilder.CreateIndex(
                name: "IX_Zakazano_UslugaID",
                table: "Zakazano",
                column: "UslugaID");

            migrationBuilder.CreateIndex(
                name: "IX_Zakazano_ZubarID",
                table: "Zakazano",
                column: "ZubarID");

            migrationBuilder.CreateIndex(
                name: "IX_Zubar_OrdinacijaID",
                table: "Zubar",
                column: "OrdinacijaID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Spoj");

            migrationBuilder.DropTable(
                name: "Zakazano");

            migrationBuilder.DropTable(
                name: "Korisnik");

            migrationBuilder.DropTable(
                name: "Termin");

            migrationBuilder.DropTable(
                name: "Usluga");

            migrationBuilder.DropTable(
                name: "Zubar");

            migrationBuilder.DropTable(
                name: "Ordinacija");
        }
    }
}
