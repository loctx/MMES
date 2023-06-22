using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PROJECT.CORE.Entities.AD;

namespace PROJECT.CORE.Configuration.AD
{
    public class tblAdAccountGroupConfig : IEntityTypeConfiguration<tblAdAccountGroup>
    {
        public void Configure(EntityTypeBuilder<tblAdAccountGroup> builder)
        {
            builder.HasMany<tblAdAccount>(x => x.ListAccount).WithOne(y => y.AccountGroup).HasForeignKey(x => x.GroupId).OnDelete(DeleteBehavior.SetNull);
        }
    }
}
