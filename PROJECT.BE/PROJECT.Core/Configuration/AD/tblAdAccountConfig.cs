using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PROJECT.CORE.Entities.AD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
