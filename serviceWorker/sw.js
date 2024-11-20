const addResourcesToCache = async (resources) => {
    const cache = await caches.open("v1");
    await cache.addAll(resources);
  };
  
  self.addEventListener("install", (event) => {
    event.waitUntil(
      addResourcesToCache([]),
    );
  });
  
  const putInCache = async (request, response) => {
    const cache = await caches.open("v1");
    await cache.put(request, response);
  };
  
  const cacheFirst = async (request) => {
    const responseFromCache = await caches.match(request);
  
    if (responseFromCache) {
      return responseFromCache;
    }
    const responseFromNetwork = await fetch(request);
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  };
  
  self.addEventListener("fetch", (event) => {
    //这里去决定缓存
    if(event.request.url.includes('.png')){
       event.respondWith(cacheFirst(event.request));
    }
    // event.respondWith(cacheFirst(event.request));
  });
  
  const deleteCache = async (key) => {
    await caches.delete(key);
  };
  
  const deleteOldCaches = async () => {
    const cacheKeepList = [];
    const keyList = await caches.keys();
    const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
    await Promise.all(cachesToDelete.map(deleteCache));
  };
  
  // self.addEventListener("activate", (event) => {
  //   event.waitUntil(deleteOldCaches());
  // });