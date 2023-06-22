using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PROJECT.CORE.Entities.MD;

namespace PROJECT.CORE.Configuration.MD
{
    public class tblVehicleConfig : IEntityTypeConfiguration<tblMdVehicle>
    {
        public void Configure(EntityTypeBuilder<tblMdVehicle> builder)
        {
            builder.HasOne<tblMdVehicleType>(v => v.VehicleType)
                .WithMany(vt => vt.ListVehicle)
                .HasForeignKey(v => v.TypeCode)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
