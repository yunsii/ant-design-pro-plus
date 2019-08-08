import curdModel from '@/base-models/curd';
import {
  fetchCurdPage,
  detailCurdPage,
  createCurdPage,
  updateCurdPage,
  deleteCurdPage,
} from '@/services/curdPage';
import { getTableList } from '@/utils/model';

export const Namespace = 'curdPage';

const model = curdModel(Namespace, {
  fetchMethod: fetchCurdPage,
  afterFetchActions: ['test'],
  detailMethod: detailCurdPage,
  createMethod: createCurdPage,
  updateMethod: updateCurdPage,
  deleteMethod: deleteCurdPage,
  extraState: {
    testData: [],
  },
  extraEffects: {
    *test({ payload }, { call, put, select }) {
      console.log(`call ${Namespace}/test`);
      const response = yield call(fetchCurdPage, payload);
      yield put({
        type: 'testSave',
        payload: getTableList(response),
      });
      const testData = yield select(state => state[Namespace].testData);
      console.log('testData', testData);
    },
  },
  extraReducers: {
    testSave(state, action) {
      console.log(`call ${Namespace}/testSave`);
      return {
        ...state,
        testData: { ...action.payload },
      };
    },
  },
});

export default model;
