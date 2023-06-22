using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using PROJECT.CORE.Common;
using PROJECT.CORE.Entities.AD;
using PROJECT.CORE.Entities.MD;
using PROJECT.CORE.Entities.SO;
using System.IdentityModel.Tokens.Jwt;

namespace PROJECT.CORE
{
    public class AppDbContext : DbContext
    {
        protected IHttpContextAccessor HttpContextAccessor { get; }
        public AppDbContext(DbContextOptions<AppDbContext> options, IHttpContextAccessor httpContextAccessor) : base(options)
        {
            this.HttpContextAccessor = httpContextAccessor;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyAllConfigurations();
            //modelBuilder.Entity<tblMDUnit>().Property(x => x.CreateDay).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
            base.OnModelCreating(modelBuilder);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

        public string UserProvider
        {
            get
            {
                //TODO
                return "";
            }
        }

        public Func<DateTime> TimestampProvider { get; set; } = ()
            => DateTime.Now;

        public override int SaveChanges()
        {
            TrackChanges();
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            TrackChanges();
            return await base.SaveChangesAsync(cancellationToken);
        }

        private void TrackChanges()
        {
            var token = HttpContextAccessor.HttpContext.Request.Headers["Authorization"].ToString().Split(" ").ToList();
            var user = "";
            if (token.Count > 1)
            {
                JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
                JwtSecurityToken securityToken = (JwtSecurityToken)tokenHandler.ReadToken(token[1]);
                var claim = securityToken.Claims;
                var result = claim.FirstOrDefault(x => x.Type == "username");
                user = result?.Value;
            }

            foreach (var entry in this.ChangeTracker.Entries().Where(e => e.State == EntityState.Added || e.State == EntityState.Modified))
            {
                if (entry.Entity is IBaseEntity)
                {
                    var auditable = entry.Entity as IBaseEntity;
                    if (entry.State == EntityState.Added)
                    {
                        auditable.CreateBy = user;
                        auditable.CreateDate = TimestampProvider();
                    }
                    else
                    {
                        this.Entry(auditable).Property(x => x.CreateBy).IsModified = false;
                        this.Entry(auditable).Property(x => x.CreateDate).IsModified = false;
                        auditable.UpdateBy = user;
                        auditable.UpdateDate = TimestampProvider();
                    }
                }
            }
        }

        #region System Manage
        public DbSet<tblAdAccount> tblAdAccount { get; set; }
        public DbSet<tblAdAccountGroup> tblAdAccountGroup { get; set; }
        public DbSet<tblAdMenu> tblAdMenu { get; set; }
        public DbSet<tblAdRight> tblAdRight { get; set; }
        public DbSet<tblAdMessage> tblAdMessage { get; set; }
        //public DbSet<tblAdAccountGroupRight> tblAdAccountGroupRight { get; set; }

        #endregion

        #region Master Data
        public DbSet<tblMdItem> tblMdItem { get; set; }
        public DbSet<tblMdUnit> tblMdUnit { get; set; }
        public DbSet<tblMdItemType> tblMdItemType { get; set; }
        public DbSet<tblMdStock> tblMdStock { get; set; }
        public DbSet<tblMdPartner> tblMdPartner { get; set; }
        public DbSet<tblMdPourType> tblMdPourType { get; set; }
        public DbSet<tblMdOrderType> tblMdOrderType { get; set; }
        public DbSet<tblMdStone> tblMdStone { get; set; }
        public DbSet<tblMdSand> tblMdSand { get; set; }
        public DbSet<tblMdVehicleType> tblMdVehicleType { get; set; }
        public DbSet<tblMdMixer> tblMdMixer { get; set; }
        public DbSet<tblMdArea> tblMdArea { get; set; }
        public DbSet<tblMdDepartment> tblMdDepartment { get; set; }
        public DbSet<tblMdVehicle> tblMdVehicle { get; set; }
        #endregion

        #region Sale Order
        public DbSet<tblSoOrder> tblSoOrder { get; set; }
        public DbSet<tblSoOrderDetail> tblSoOrderDetail { get; set; }
        #endregion

    }
}
