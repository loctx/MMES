using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PROJECT.CORE.Entities.MD;

namespace PROJECT.CORE.Configuration.MD
{
    public class tblUnitConfig : IEntityTypeConfiguration<tblMdUnit>
    {
        public void Configure(EntityTypeBuilder<tblMdUnit> builder)
        {
            builder.HasMany<tblMdItem>(u => u.ListItem)
                .WithOne(i => i.Unit)
                .HasForeignKey(i => i.UnitCode)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
