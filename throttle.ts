const throttle = <T extends any[]>(func: (...arg: T) => void, { interval }) => {
  let timer: Nodejs.Timeout = undefined;
  let ready = true;

  const throttled = (...arg: T) => {
    if (!ready) {
      return;
    }
    func(...arg);
    ready = false;
   
    timer = setTimeout(() => {
      ready = true;
      timer = undefined;
    }, interval);
  };

  return throttled;
};
