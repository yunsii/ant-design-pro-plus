import { curdModel } from 'dva-base-models';
import { getTableList, getData, isResponseOk } from '@/utils/model';

curdModel.config({
  getTableList,
  getData,
  isResponseOk,
});

export default curdModel.set;
