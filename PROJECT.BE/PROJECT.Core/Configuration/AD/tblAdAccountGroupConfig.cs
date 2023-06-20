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
    public class tblAdAccountGroupConfig : IEntityTypeConfiguration<tblAdAccountGroup>
    {
        public void Configure(EntityTypeBuilder<tblAdAccountGroup> builder)
        {
            builder.HasMany<tblAdRight>(x => x.ListRight)
                .WithMany(x => x.ListAccountGroup)
                .UsingEntity(
                    "tblAdAccountGroupRight",
                    l => l.HasOne(typeof(tblAdRight)).WithMany().HasForeignKey("RightId").HasPrincipalKey(nameof(tblAdRight.Id)),
                    r => r.HasOne(typeof(tblAdAccountGroup)).WithMany().HasForeignKey("GroupId").HasPrincipalKey(nameof(tblAdAccountGroup.Id)),
                    j => j.HasKey("RightId", "GroupId"));

        }
    }
}
