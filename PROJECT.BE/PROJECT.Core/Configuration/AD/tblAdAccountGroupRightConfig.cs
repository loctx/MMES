﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PROJECT.CORE.Entities.AD;

namespace PROJECT.CORE.Configuration.AD
{
    public class tblAdAccountGroupRightConfig : IEntityTypeConfiguration<tblAdAccountGroupRight>
    {
        public void Configure(EntityTypeBuilder<tblAdAccountGroupRight> builder)
        {
            builder.HasOne<tblAdRight>(x => x.Right).WithMany(y => y.ListAccountGroupRight).HasForeignKey(x => x.RightId);
            builder.HasOne<tblAdAccountGroup>(x => x.AccountGroup).WithMany(y => y.ListAccountGroupRight).HasForeignKey(x => x.GroupId);
        }
    }
}
