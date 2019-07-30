import { message } from 'antd';
import { Model } from 'dva';

import { getTableList, getData, isResponseOk } from '@/utils/model';
import { callFunctionIfFunction } from '@/utils/decorators/callFunctionOrNot';

export type modelConfig = {
  fetchMethod?: Function;
  afterFetchActions?: string[];
  detailMethod?: Function;
  afterDetailActions?: string[];
  createMethod?: Function;
  afterCreateActions?: string[];
  updateMethod?: Function;
  afterUpdateActions?: string[];
  deleteMethod?: Function;
  afterDeleteActions?: string[];
  extraState?: Model['state'];
  extraEffects?: Model['effects'];
  extraReducers?: Model['reducers'];
};

export default (
  namespace: string,
  {
    fetchMethod,
    afterFetchActions,
    detailMethod,
    afterDetailActions,
    createMethod,
    afterCreateActions,
    updateMethod,
    afterUpdateActions,
    deleteMethod,
    afterDeleteActions,
    extraState,
    extraEffects,
    extraReducers,
  }: modelConfig
) => ({
  namespace,

  state: {
    data: {
      list: [],
      pagination: {},
    },
    detail: {},
    ...extraState,
  },

  effects: {
    ...extraEffects,
    *fetch({ payload }, { call, put }) {
      const response = yield call(fetchMethod, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (isResponseOk(response)) {
        for (let i = 0; i < afterFetchActions.length; i += 1) {
          yield put({
            type: afterFetchActions[i],
          });
        }
      }
    },
    *detail({ id }, { call, put }) {
      const response = yield call(detailMethod, id);
      yield put({
        type: 'saveDetail',
        payload: response,
      });
      if (isResponseOk(response)) {
        for (let i = 0; i < afterDetailActions.length; i += 1) {
          yield put({
            type: afterDetailActions[i],
          });
        }
      }
    },
    *create({ payload, callback }, { call, put, select }) {
      const response = yield call(createMethod, payload);
      if (isResponseOk(response)) {
        message.success('创建成功');
        callFunctionIfFunction(callback)();
        for (let i = 0; i < afterCreateActions.length; i += 1) {
          yield put({
            type: afterCreateActions[i],
          });
        }
        return;
      }
      callFunctionIfFunction(callback)(response);
    },
    *update({ id, payload, callback }, { call, put, select }) {
      const response = yield call(updateMethod, id, payload);
      if (isResponseOk(response)) {
        message.success('更新成功');

        const { data } = response;
        const list = yield select(state => state[namespace].data.list);
        yield put({
          type: 'save',
          payload: list.map(item => (item.id === data.id ? data : item)),
        });
        callFunctionIfFunction(callback)();
        for (let i = 0; i < afterUpdateActions.length; i += 1) {
          yield put({
            type: afterUpdateActions[i],
          });
        }
        return;
      }
      callFunctionIfFunction(callback)(response);
    },
    *delete({ id, callback }, { call, put, select }) {
      const response = yield call(deleteMethod, id);
      if (isResponseOk(response)) {
        message.success('删除成功');
        callFunctionIfFunction(callback)();
        for (let i = 0; i < afterDeleteActions.length; i += 1) {
          yield put({
            type: afterDeleteActions[i],
          });
        }
        return;
      }
      callFunctionIfFunction(callback)(response);
    },
  },

  reducers: {
    ...extraReducers,
    save(state, action) {
      return {
        ...state,
        data: getTableList(action),
      };
    },
    saveDetail(state, action) {
      return {
        ...state,
        detail: getData(action),
      };
    },
  },
});
