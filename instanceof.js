const myInstanceof = (left, right) => {
  if (typeof right !== 'function') throw new TypeError('Right-hand side of "instanceof" is not a function');
  if (left == null || (typeof left !== 'object' && typeof left !== 'function')) return false;
  let proto = Object.getPrototypeOf(left);
  const prototype = right.prototype;
  while (proto) {
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
};