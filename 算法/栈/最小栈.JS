function MinStack(){
    this.stack = [];
    this.stack2 = []
}

MinStack.prototype.push = function(item){
  this.stack.push(item);

  //空或者比栈顶元素小也要入栈
  if(this.stack2.length === 0 || this.stack2[this.stack2.length - 1] >= item){
    this.stack2.push(item)
  }
}

MinStack.prototype.pop = function(){
    if(this.stack.pop() === this.stack2[this.stack2.length - 1]){
        this.stack2.pop()
    }
}
MinStack.prototype.min = function(){
    return this.stack2[this.stack2.length - 1]
}
