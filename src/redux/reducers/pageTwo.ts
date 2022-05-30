import { AnyAction } from 'redux';
import { actions } from '@/redux/actions/pageTwo';

export default function reducer(state = {}, action: AnyAction) {
  switch (action.type) {
    case actions.PAGE_INFO:
      return { ...state, pageInfo: action.data };
    default:
      return state;
  }
}
