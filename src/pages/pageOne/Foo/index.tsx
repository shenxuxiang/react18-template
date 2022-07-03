import React, { useCallback } from 'react';
import useReducer from '@/utils/useReducer';

const initState = {
  pageSize: 10,
  pageNum: 1,
  total: 0,
}
export default function Foo() {
  const [state, setState] = useReducer(initState);
  const handleClick = useCallback(() => {
    setState((prevState) => ({ pageSize: prevState.pageSize + 1 }));
  }, []);

  return (
    <div onClick={handleClick}>
      hello world {state.pageSize}
    </div>
  );
}
