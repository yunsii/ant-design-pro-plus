import curdModel from '@/base-models/curd';
import {
  fetchCurdPage,
  detailCurdPage,
  createCurdPage,
  updateCurdPage,
  deleteCurdPage,
} from '@/services/curdPage';
import { getTableList } from '@/utils/model';
import { delay } from '@/utils/enhanceUtils';

export const modelName = 'curdPage';

function* putGenerator(put, actions, payload?: any) {
  for (const actionName of actions) {
    yield put({
      type: actionName,
      payload,
    });
  }
}

const model = curdModel(modelName, {
  fetchMethod: fetchCurdPage,
  // parallelFetchActions: ['testForParallelWithFetch'],
  // afterFetchActions: ['test'],
  detailMethod: detailCurdPage,
  createMethod: createCurdPage,
  updateMethod: updateCurdPage,
  deleteMethod: deleteCurdPage,
  extraEffects: {
    *test({ payload }, { call, put, select }) {
      console.log(`call ${modelName}/test`);
      yield putGenerator((put as any).resolve, ['testForParallelWithFetch']);
      console.log('fetch curdPage');
      const response = yield call(fetchCurdPage, payload);
      yield put({
        type: 'testSave',
        payload: getTableList(response),
      });
      const testData = yield select(state => state[modelName].testData);
      console.log('testData', testData);
    },
    *testForParallelWithFetch({ payload }, { call }) {
      console.log(`call ${modelName}/testForParallelWithFetch`);
      console.log('get payload', payload);
      yield call(delay, 5000);
      console.log('after delay');
    },
  },
  extraReducers: {
    testSave(state, action) {
      console.log(`call ${modelName}/testSave`);
      return {
        ...state,
        testData: { ...action.payload },
      };
    },
  },
});

export default model;
