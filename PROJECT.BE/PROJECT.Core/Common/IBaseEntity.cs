namespace PROJECT.CORE.Common
{
    public interface IBaseEntity
    {
        string CreateBy { get; set; }
        string UpdateBy { get; set; }
        DateTime? CreateDay { get; set; }
        DateTime? UpdateDay { get; set; }
    }
}
