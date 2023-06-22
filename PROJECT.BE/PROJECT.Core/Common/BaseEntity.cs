namespace PROJECT.CORE.Common
{
    public class BaseEntity : IBaseEntity
    {
        public string CreateBy { get; set; }
        public string UpdateBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public bool? IsDeleted { get; set; }
    }
}
