import { useCallback, useState } from 'react';

export default () => {
  const [state, setState] = useState(0);

  const update = useCallback(() => {
    setState((prev) => prev + 1);
  }, []);

  return {
    state,
    update,
  };
};
