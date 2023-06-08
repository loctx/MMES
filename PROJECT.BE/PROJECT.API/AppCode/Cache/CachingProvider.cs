﻿using Microsoft.Extensions.Caching.Memory;
namespace PROJECT.API.AppCode.Cache
{
    public class CachingProvider
    {
        private readonly static IMemoryCache _memoryCache = new MemoryCache(new MemoryCacheOptions() { });
        public static void AddItem(string key, object value)
        {
            _memoryCache.Remove(key);
            MemoryCacheEntryOptions options = new MemoryCacheEntryOptions();
            options.AbsoluteExpiration = DateTimeOffset.MaxValue;
            _memoryCache.Set<object>(key, value, options);
        }

        public static void RemoveItem(string key)
        {
            _memoryCache.Remove(key);
        }

        public static object GetItem(string key)
        {
            if (_memoryCache.TryGetValue(key, out object obj))
            {
                return _memoryCache.Get(key);
            }
            return null;
        }
    }
}
