import { curdModel } from 'dva-base-models';
import { getList, getData, isResponseOk } from '@/utils/model';

curdModel.config({
  getList,
  getData,
  isResponseOk,
});

export default curdModel.set;
