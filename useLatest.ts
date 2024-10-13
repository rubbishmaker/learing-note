import { useRef } from 'react';

/**
 * 一直保持值
 */
function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}

export default useLatest;
