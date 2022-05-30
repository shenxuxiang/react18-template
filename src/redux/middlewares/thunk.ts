import { AnyAction, MiddlewareAPI } from 'redux';

export default function chunk(ref: MiddlewareAPI) {
  return (next: Function) => {
    return (action: AnyAction | Function) => {
      if (typeof action === 'function') {
        return action(ref.dispatch, ref.getState);
      } else {
        return next(action);
      }
    };
  };
}
