import { AnyAction, Dispatch } from 'redux';

export const actions = {
  USER_INFO: 'user_info',
  TASK_DETAIL: 'task_detail',
};

export default {
  queryUserInfo() {
    return function (dispatch: Dispatch) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const data = { userName: 'sxx', age: 100, sex: 'man' };
          const action: AnyAction = { type: actions.USER_INFO, data };
          dispatch(action);
          return resolve(data);
        }, 500);
      });
    };
  },
  queryTaskDetail(query: any) {
    return function (dispatch: Dispatch) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const action: AnyAction = { type: actions.TASK_DETAIL, data: query };
          dispatch(action);
          return resolve(query);
        }, 500);
      });
    };
  },
};
