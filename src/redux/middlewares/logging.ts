import { AnyAction, MiddlewareAPI } from 'redux';

export default function logging(ref: MiddlewareAPI) {
  return function (next: Function) {
    return function (action: AnyAction) {
      console.log('dispatch action before ====' + action.type, ref.getState());
      const result = next(action);
      console.log('dispatch action after ====' + action.type, ref.getState());
      return result;
    };
  };
}
