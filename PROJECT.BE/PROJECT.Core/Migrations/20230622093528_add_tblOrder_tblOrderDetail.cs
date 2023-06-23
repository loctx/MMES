using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PROJECT.CORE.Migrations
{
    /// <inheritdoc />
    public partial class add_tblOrder_tblOrderDetail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropTable(
            //    name: "tblStoreOrderOperating");

            migrationBuilder.CreateTable(
                name: "tblSoOrder",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    State = table.Column<string>(type: "varchar(50)", nullable: true),
                    PartnerCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    PartnerNote = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    AreaCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    PourDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PourLocation = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    PourCategory = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    PourType = table.Column<string>(type: "varchar(50)", nullable: true),
                    OrderType = table.Column<string>(type: "varchar(50)", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblSoOrder", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblSoOrderDetail",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrderCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ItemCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    IsMainItem = table.Column<bool>(type: "bit", nullable: true),
                    OrderNumber = table.Column<double>(type: "float", nullable: false),
                    SandCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    StoneCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblSoOrderDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblSoOrderDetail_tblSoOrder_OrderCode",
                        column: x => x.OrderCode,
                        principalTable: "tblSoOrder",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrderDetail_OrderCode",
                table: "tblSoOrderDetail",
                column: "OrderCode");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblSoOrderDetail");

            migrationBuilder.DropTable(
                name: "tblSoOrder");
        }
    }
}
