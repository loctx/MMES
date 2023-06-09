using Newtonsoft.Json;

namespace PROJECT.API.AppCode.Extensions
{
    public class ValidationError
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Field { get; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int Code { get; set; }

        public string Message { get; }

        public ValidationError(string field, int code, string message)
        {
            Field = field != string.Empty ? field : null;
            Code = code != 0 ? code : 55;  //set the default code to 55. you can remove it or change it to 400.  
            Message = message;
        }
    }
}
