import curdModel from '@/base-models/curd';
import {
  fetchCurdPage,
  detailCurdPage,
  createCurdPage,
  updateCurdPage,
  deleteCurdPage,
} from '@/services/curdPage';
import { getTableList } from '@/utils/model';

export const modelName = 'curdPage';

const model = curdModel(modelName, {
  fetchMethod: fetchCurdPage,
  afterFetchActions: ['test'],
  detailMethod: detailCurdPage,
  createMethod: createCurdPage,
  updateMethod: updateCurdPage,
  deleteMethod: deleteCurdPage,
  extraEffects: {
    *test({ payload }, { call, put, select }) {
      console.log(`call ${modelName}/test`);
      console.log('refetch');
      const response = yield call(fetchCurdPage, payload);
      yield put({
        type: 'testSave',
        payload: response,
      });
      const testData = yield select(state => state[modelName].testData);
      console.log('testData', testData);
    },
  },
  extraReducers: {
    testSave(state, action) {
      console.log(`call ${modelName}/testSave`);
      return {
        ...state,
        testData: { ...getTableList(action) },
      };
    },
  },
});

export default model;
