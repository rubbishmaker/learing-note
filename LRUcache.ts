class LRUCache {

    capacity:any
    cache: Map<string, any> 
    constructor(capacity) {
      this.capacity = capacity;
      this.cache = new Map();
    }
  
    get(key:string) {
      if (this.cache.has(key)) {
        // 将最近访问的数据移到最前面
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
      }
      return -1; // 未找到
    }
  
    put(key:string, value) {
      if (this.cache.has(key)) {
        // 如果 key 存在，更新值，并将其移到最前面
        this.cache.delete(key);
      } else if (this.cache.size >= this.capacity) {
        // 如果缓存已满，删除最旧的数据（最后一个数据）
        const firstKey = this.cache.keys().next().value;
        this.cache.delete(firstKey);
      }
      this.cache.set(key, value);
    }
  }