//起步构建
// 1.用类创建Promise，类中需要有个执行器executor
// 2.执行者中发生错误，交给异常状态处理
// 3.执行者中状态只能触发一次，状态触发一次之后，不能修改状态
// 4.执行者中的this，由调用执行者的作用域决定，因此我们需要将执行者中的this绑定为我们创建的Promise对象。
// 5.在构造函数中需要为Promise对象创建status和value记录Promise的状态和传值。
1
class MyPromise {
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'
  constructor(executor) {
    this.status = MyPromise.PENDING;
    this.value = null;
    this.callbacks = [];
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
     } catch (error) {
      this.reject(error)
     }
   }
  resolve(value) {
    if (this.status == MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED;
      this.value = value
      setTimeout(() => {
        this.callbacks.map(item => {
          item.onFulfilled(this.value);
         })
       })
     }
   }
  reject(reason) {
    if (this.status == MyPromise.PENDING) {
      this.status = MyPromise.REJECTED;
      this.value = reason
      setTimeout(() => {
        this.callbacks.map(item => {
          item.onRejected(this.value);
         })
       })
     }
   }
  //开始写then方法
  //1.then接收2个参数，一个成功回调函数，一个失败回调函数
  //2.then中发生错误，状态为rejected，交给下一个then处理
  //3.then返回的也是一个Promise
  //4.then的参数值可以为空，可以进行传值穿透
  //5.then中的方法是异步执行的
  //6.then需要等promise的状态改变后，才执行，并且异步执行
  //7.then是可以链式操作的
  //8.then的onFulfilled可以用来返回Promise对象，并且then的状态将以这个Promise为准
  //9.then的默认状态是成功的，上一个Promise对象的状态不会影响下一个then的状态
  //10.then返回的promise对象不是then相同的promise
  then(onFulfilled, onRejected) {
    if (typeof onFulfilled != 'function') {
      onFulfilled = value => value
     }
    if (typeof onRejected != 'function') {
      onRejected = reason => reason
     }
    let promise = new MyPromise((resolve, reject) => {
      if (this.status == MyPromise.FULFILLED) {
        setTimeout(() => {
          this.parse(promise, onFulfilled(this.value), resolve, reject)
         });
       }
      if (this.status == MyPromise.REJECTED) {
        setTimeout(() => {
          this.parse(promise, onRejected(this.value), resolve, reject)
         })
       }
      if (this.status == MyPromise.PENDING) {
        this.callbacks.push({
          onFulfilled: value => {
            this.parse(promise, onFulfilled(value), resolve, reject)
           },
          onRejected: reason => {
            this.parse(promise, onRejected(reason), resolve, reject)
           }
         });
       }
     })
    return promise
   }

  //整理冗余代码
  parse(promise, result, resolve, reject) {
    if (promise == result) {
      throw new TypeError('Chaining cycle detected for promise')
     }
    try {
      if (result instanceof MyPromise) {
        result.then(resolve, reject)
       } else {
        resolve(result)
       }
     } catch (error) {
      reject(error)
     }
   }
  //Promise的静态方法，resolve
  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      if (value instanceof MyPromise) {
        value.then(resolve, reject)
       } else {
        resolve(value)
       }
     })
   }
  //Promise的静态方法，reject
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
     })
   }
  //Promise的静态方法，all
  static all(promises) {
    let values = [];
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        if (promise.status == MyPromise.FULFILLED) {
          values.push(promise.value)
         } else if (promise.status == MyPromise.REJECTED) {
          reject(promise.value)
         }
        if (values.length == promises.length) {
          resolve(values)
         }
       });
     })
   }
  //Promise的静态方法，race
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(value => {
          resolve(value)
         })
       });
     })
   }
  //Promise的静态方法，race
  catch (onRejected) {
    return this.then(null, onRejected)
   }
}

