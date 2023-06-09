using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using PROJECT.CORE.Common;
using PROJECT.CORE.Entities.AD;
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
            => DateTime.UtcNow;

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
                        auditable.CreateDay = TimestampProvider();
                    }
                    else
                    {
                        auditable.UpdateBy = user;
                        auditable.UpdateDay = TimestampProvider();
                    }
                }
            }
        }

        #region System Manage
        public DbSet<tblAccount> tblAccount { get; set; }
        public DbSet<tblMenu> tblMenu { get; set; }
        #endregion

        #region Master Data
        #endregion

        #region Sale Order
        public DbSet<tblStoreOrderOperating> tblStoreOrderOperating { get; set; }
        #endregion

    }
}
