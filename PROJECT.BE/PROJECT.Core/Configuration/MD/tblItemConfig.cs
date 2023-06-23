using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PROJECT.CORE.Entities.MD;

namespace PROJECT.CORE.Configuration.MD
{
    public class tblItemConfig : IEntityTypeConfiguration<tblMdItem>
    {
        public void Configure(EntityTypeBuilder<tblMdItem> builder)
        {
            builder.HasOne<tblMdUnit>(i => i.Unit)
                .WithMany(u => u.ListItem)
                .HasForeignKey(i => i.UnitCode)
                .OnDelete(DeleteBehavior.SetNull);

            builder.HasOne<tblMdItemType>(i => i.ItemType)
                .WithMany(it => it.ListItem)
                .HasForeignKey(i => i.TypeCode)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
