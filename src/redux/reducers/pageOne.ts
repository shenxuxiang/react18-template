import { AnyAction } from 'redux';
import { actions } from '@/redux/actions/pageOne';

export default function reducer(state = {}, action: AnyAction) {
  switch (action.type) {
    case actions.USER_INFO:
      return { ...state, userInfo: action.data };
    case actions.TASK_DETAIL:
      return { ...state, taskDetail: action.data };
    default:
      return state;
  }
}
