import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';
import { queryCurrent } from '@/services/user';

export type AppModelState = {
  users: any[];
};

export type AppModal = {
  namespace: 'app';
  state: AppModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    updateState: Reducer<any>;
  };
  subscriptions: { setup: Subscription };
};

const AppModel: AppModal = {
  namespace: 'app',

  state: {
    users: [],
  },

  effects: {
    *query(_: any, { call, put }) {
      const data = yield call(queryCurrent);
      yield put({
        type: 'updateState',
        payload: {
          users: data,
        },
      });
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
};

export default AppModel;
