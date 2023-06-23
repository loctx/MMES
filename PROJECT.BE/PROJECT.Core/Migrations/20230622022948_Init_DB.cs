using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PROJECT.CORE.Migrations
{
    /// <inheritdoc />
    public partial class Init_DB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tblAdAccountGroup",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    State = table.Column<bool>(type: "bit", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblAdAccountGroup", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblAdMenu",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrderNumber = table.Column<int>(type: "int", nullable: false),
                    RightId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Icon = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblAdMenu", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblAdMessage",
                columns: table => new
                {
                    Code = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Lang = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblAdMessage", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblAdRight",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrderNumber = table.Column<int>(type: "int", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblAdRight", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblMdArea",
                columns: table => new
                {
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdArea", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblMdDepartment",
                columns: table => new
                {
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdDepartment", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblMdItem",
                columns: table => new
                {
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    UnitCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TypeCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CreateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdItem", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblMdItemType",
                columns: table => new
                {
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdItemType", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblMdMixer",
                columns: table => new
                {
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdMixer", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblMdModule",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LicenseKey = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NumberOrder = table.Column<int>(type: "int", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdModule", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblMdOrderType",
                columns: table => new
                {
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdOrderType", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblMdPartner",
                columns: table => new
                {
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    IsCustomer = table.Column<bool>(type: "bit", nullable: false),
                    IsProvider = table.Column<bool>(type: "bit", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdPartner", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblMdPourType",
                columns: table => new
                {
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdPourType", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblMdSand",
                columns: table => new
                {
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdSand", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblMdStock",
                columns: table => new
                {
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdStock", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblMdStone",
                columns: table => new
                {
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdStone", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblMdUnit",
                columns: table => new
                {
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdUnit", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblMdVehicle",
                columns: table => new
                {
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Tonnage = table.Column<double>(type: "float", nullable: false),
                    Driver = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    TypeCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdVehicle", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblMdVehicleType",
                columns: table => new
                {
                    Code = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    CreateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdVehicleType", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblStoreOrderOperating",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Vehicle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DriverName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PartnerId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NameDistributor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ItemId = table.Column<double>(type: "float", nullable: true),
                    ItemCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ItemUnitName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NameProduct = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CatId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SumNumber = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TimeIn33 = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CardNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrderId = table.Column<int>(type: "int", nullable: true),
                    DeliveryCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeliveryCodeParent = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrderDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TypeProduct = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TypeXK = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TimeIn21 = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TimeIn22 = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Confirm1 = table.Column<int>(type: "int", nullable: true),
                    TimeConfirm1 = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Confirm2 = table.Column<int>(type: "int", nullable: true),
                    TimeConfirm2 = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Confirm3 = table.Column<int>(type: "int", nullable: true),
                    TimeConfirm3 = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Confirm4 = table.Column<int>(type: "int", nullable: true),
                    TimeConfirm4 = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Confirm5 = table.Column<int>(type: "int", nullable: true),
                    TimeConfirm5 = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Confirm6 = table.Column<int>(type: "int", nullable: true),
                    TimeConfirm6 = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Confirm7 = table.Column<int>(type: "int", nullable: true),
                    TimeConfirm7 = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Confirm8 = table.Column<int>(type: "int", nullable: true),
                    TimeConfirm8 = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Confirm9 = table.Column<int>(type: "int", nullable: true),
                    TimeConfirm9 = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Confirm10 = table.Column<int>(type: "int", nullable: true),
                    TimeConfirm10 = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Confirm9Note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Confirm9Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Step = table.Column<int>(type: "int", nullable: true),
                    IndexOrder = table.Column<int>(type: "int", nullable: true),
                    IndexOrder1 = table.Column<int>(type: "int", nullable: true),
                    IndexOrder2 = table.Column<int>(type: "int", nullable: true),
                    Trough = table.Column<int>(type: "int", nullable: true),
                    Trough1 = table.Column<int>(type: "int", nullable: true),
                    NumberVoice = table.Column<int>(type: "int", nullable: true),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prioritize = table.Column<int>(type: "int", nullable: true),
                    DayCreate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IDDistributorSyn = table.Column<int>(type: "int", nullable: true),
                    AreaId = table.Column<int>(type: "int", nullable: true),
                    AreaName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CodeStore = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NameStore = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DriverUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DriverAccept = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IndexOrderTemp = table.Column<int>(type: "int", nullable: true),
                    WeightIn = table.Column<int>(type: "int", nullable: true),
                    WeightInTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    WeightOut = table.Column<int>(type: "int", nullable: true),
                    WeightOutTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NoteFinish = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Longitude = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Latitude = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CountReindex = table.Column<int>(type: "int", nullable: true),
                    IsVoiced = table.Column<bool>(type: "bit", nullable: true),
                    LocationCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TransportMethodId = table.Column<int>(type: "int", nullable: true),
                    TransportMethodName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LockInDbet = table.Column<bool>(type: "bit", nullable: true),
                    LogJobAttach = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsSyncedByNewWS = table.Column<bool>(type: "bit", nullable: true),
                    TroughLineCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsScaleAuto = table.Column<bool>(type: "bit", nullable: true),
                    TimeConfirmHistory = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LogHistory = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MoocCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LogProcessOrder = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DriverPrintNumber = table.Column<int>(type: "int", nullable: true),
                    DriverPrintTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    WarningNotCall = table.Column<bool>(type: "bit", nullable: true),
                    XiRoiAttatchmentFile = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PackageNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Shifts = table.Column<int>(type: "int", nullable: true),
                    AutoScaleOut = table.Column<bool>(type: "bit", nullable: true),
                    Type = table.Column<int>(type: "int", nullable: true),
                    CreateDay = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateDay = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReasonExport = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RealRequireNumber = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    RealNumber = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    CodeExport = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NoteExport = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblStoreOrderOperating", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblAdAccount",
                columns: table => new
                {
                    UserName = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    State = table.Column<bool>(type: "bit", nullable: false),
                    CreateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblAdAccount", x => x.UserName);
                    table.ForeignKey(
                        name: "FK_tblAdAccount_tblAdAccountGroup_GroupId",
                        column: x => x.GroupId,
                        principalTable: "tblAdAccountGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "tblAdAccountGroupRight",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RightId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblAdAccountGroupRight", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblAdAccountGroupRight_tblAdAccountGroup_GroupId",
                        column: x => x.GroupId,
                        principalTable: "tblAdAccountGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tblAdAccountGroupRight_tblAdRight_RightId",
                        column: x => x.RightId,
                        principalTable: "tblAdRight",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblAdAccount_GroupId",
                table: "tblAdAccount",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_tblAdAccountGroupRight_GroupId",
                table: "tblAdAccountGroupRight",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_tblAdAccountGroupRight_RightId",
                table: "tblAdAccountGroupRight",
                column: "RightId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblAdAccount");

            migrationBuilder.DropTable(
                name: "tblAdAccountGroupRight");

            migrationBuilder.DropTable(
                name: "tblAdMenu");

            migrationBuilder.DropTable(
                name: "tblAdMessage");

            migrationBuilder.DropTable(
                name: "tblMdArea");

            migrationBuilder.DropTable(
                name: "tblMdDepartment");

            migrationBuilder.DropTable(
                name: "tblMdItem");

            migrationBuilder.DropTable(
                name: "tblMdItemType");

            migrationBuilder.DropTable(
                name: "tblMdMixer");

            migrationBuilder.DropTable(
                name: "tblMdModule");

            migrationBuilder.DropTable(
                name: "tblMdOrderType");

            migrationBuilder.DropTable(
                name: "tblMdPartner");

            migrationBuilder.DropTable(
                name: "tblMdPourType");

            migrationBuilder.DropTable(
                name: "tblMdSand");

            migrationBuilder.DropTable(
                name: "tblMdStock");

            migrationBuilder.DropTable(
                name: "tblMdStone");

            migrationBuilder.DropTable(
                name: "tblMdUnit");

            migrationBuilder.DropTable(
                name: "tblMdVehicle");

            migrationBuilder.DropTable(
                name: "tblMdVehicleType");

            migrationBuilder.DropTable(
                name: "tblStoreOrderOperating");

            migrationBuilder.DropTable(
                name: "tblAdAccountGroup");

            migrationBuilder.DropTable(
                name: "tblAdRight");
        }
    }
}
