import { AnyAction, Dispatch } from 'redux';

export const actions = {
  PAGE_INFO: 'page_info',
};

export default {
  queryPageInfo() {
    return function (dispatch: Dispatch) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const data = {
            pageList: [
              { name: 'mtt', nickName: '天天', sex: '男' },
              { name: 'sxx', nickName: '小强', sex: '男' },
            ],
            pageNum: 1,
            pageSize: 10,
            total: 2,
          };
          const action: AnyAction = { type: actions.PAGE_INFO, data };
          dispatch(action);
          return resolve(data);
        }, 500);
      });
    };
  },
};
