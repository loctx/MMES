using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PROJECT.CORE.Entities.AD;

namespace PROJECT.CORE.Configuration.AD
{
    public class tblAdAccountConfig : IEntityTypeConfiguration<tblAdAccount>
    {
        public void Configure(EntityTypeBuilder<tblAdAccount> builder)
        {
            builder.HasOne<tblAdAccountGroup>(x => x.AccountGroup)
                .WithMany(g => g.ListAccount)
                .HasForeignKey(x => x.GroupId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
