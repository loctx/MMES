using PROJECT.API.AppCode.Cache;
using PROJECT.API.AppCode.Logger;
using PROJECT.BUSINESS.Common;
using PROJECT.BUSINESS.Common.Class;

namespace PROJECT.API.AppCode.Util
{
    public static class MessageUtil
    {
        public static void AddToCache(MessageObject obj)
        {
            var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            var applicationName = configuration.GetValue<string>("ApplicationName");
            var strKey = $"{applicationName}-Message-{obj.Code}-{obj.Language}";
            CachingProvider.AddItem(strKey, obj);
        }

        public static string GetMessage(string code, string lang = "")
        {
            var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            if (!string.IsNullOrEmpty(lang))
            {
                lang = configuration.GetValue<string>("LanguageDefault");
            }

            var applicationName = configuration.GetValue<string>("ApplicationName");
            var strKey = $"{applicationName}-Message-{code}-{lang}";
            MessageObject obj = CachingProvider.GetItem(strKey) as MessageObject;
            return obj != null ? obj.Message : code;
        }

        //public static void GetMessage(string msgCode, IBaseService service, TransferObject transferObject, params object[] paramObject)
        //{
        //    var logId = "LID" + DateTime.Now.ToString("yyMMddHHmmssFF");
        //    var code = msgCode;
        //    if (!string.IsNullOrWhiteSpace(service.MessageObject.Code))
        //    {
        //        code = service.MessageObject.Code;
        //    }
        //    transferObject.MessageObject.Code = code;
        //    transferObject.MessageObject.Message = MessageUtil.GetMessage(code);
        //    if (!string.IsNullOrWhiteSpace(transferObject.MessageObject.Message))
        //    {
        //        transferObject.MessageObject.Message = string.Format(transferObject.MessageObject.Message, paramObject);
        //    }

        //    if (service.Exception != null)
        //    {
        //        transferObject.MessageObject.MessageDetail += service.Exception.ToString();
        //        transferObject.MessageObject.LogId += logId;
        //        LoggerService.LogError(logId + Environment.NewLine + service.Exception.ToString());
        //    }
        //}
    }
}
