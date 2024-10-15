class ConcurrentLimit {
  /** ts中声明实例属性*/
  runningCount: number;
  concurrent: number;
  tsaks: any[];

  constructor(concurrent = 2) {
    this.runningCount = 0;
    this.concurrent = concurrent;
    this.tsaks = [];
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.tsaks.push({
        resolve,
        reject,
        task,
      });
      /** 添加完需要run一下*/
      this.runningCount++;
      this.run();
    });
  }

  run() {
    //正运行个数少于约定并发数 并且tasks没有执行完才执行
    while (this.runningCount <= this.concurrent && this.tsaks.length) {
      const { task, resolve, reject } = this.tsaks.shift();
      task(resolve, reject)?.finally(() => {
        this.runningCount--;
        //重新run
        this.run();
      });
    }
  }
}

const concurrentLimitClass = new ConcurrentLimit(3);

const createRequest = (request, params) => {
  return concurrentLimitClass
    ?.add(() => {
      request(params);
    })
    ?.then((res) => {
      return res;
    });
};
