import { debounce } from './debounce';
import { useMemo,useRef,useEffect } from 'react'


type noop = (...args: any[]) => any;

function useDebounceFn<T extends noop>(fn: T, options = {}) {


  const fnRef = useRef();
  fnRef.current  = fn

  const wait = 'wait' in options ? options.wait : 1000;

  const debounced = useMemo(
    () =>
      debounce(
        (...args: Parameters<T>): ReturnType<T> => {
          return fnRef.current(...args);
        },
        {delay:wait},
      ),
    [],
  );

  useEffect(() => {
   return ()=>{
     debounced.cancel();
   }
  });

  return {
    run: debounced,
    cancel: debounced.cancel,
    flush: debounced.flush,
  };
}

export default useDebounceFn;