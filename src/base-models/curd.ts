import { message } from 'antd';

import { getTableList /* getData*/, isCommitSuccessNew } from '@/utils/model';
import { callFunctionIfFunction } from '@/utils/decorators/callFunctionOrNot';

export type modelConfig = {
  fetchMethod?: Function;
  afterFetchActions?: string[];
  createMethod?: Function;
  afterCreateActions?: string[];
  updateMethod?: Function;
  afterUpdateActions?: string[];
  deleteMethod?: Function;
  afterDeleteActions?: string[];
  extraEffects?: {};
  extraReducers?: {};
};

export default (
  namespace: string,
  {
    fetchMethod,
    afterFetchActions,
    createMethod,
    afterCreateActions,
    updateMethod,
    afterUpdateActions,
    deleteMethod,
    afterDeleteActions,
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
  },

  effects: {
    ...extraEffects,
    *fetch({ payload }, { call, put }) {
      const response = yield call(fetchMethod, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      console.log(response);
      if (response) {
        console.log(afterFetchActions);
        for (let i = 0; i < afterFetchActions.length; i += 1) {
          yield put({
            type: afterFetchActions[i],
          });
        }
      }
    },
    *create({ payload, callback }, { call, put, select }) {
      const response = yield call(createMethod, payload);
      if (isCommitSuccessNew(response)) {
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
      if (isCommitSuccessNew(response)) {
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
      if (isCommitSuccessNew(response)) {
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
        data: { ...getTableList(action) },
      };
    },
  },
});
