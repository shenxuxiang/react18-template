import { useState } from 'react';

type IAction<S> = Partial<S> | ((state: S) => Partial<S>);

type SetState<S> = (action: IAction<S>) => void;

function reducer<S>(state: S, action: Partial<S>): S {
  if (action == null) return state;
  return {...state, ...action};
}

export default function useReducer<S>(initialState: S): [S, SetState<S>] {
  const [state, dispatch] = useState(initialState);

  let setState: SetState<S> = function (action: IAction<S>): void {
    if (typeof action === 'function') {
      dispatch((prevState) => reducer(prevState, action(prevState)));
    } else {
      dispatch(reducer(state, action));
    }
  }
  return [state, setState];
}
