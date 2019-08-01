import { curdModel } from 'dva-base-models';
import { getTableList, getData, isResponseOk } from '@/utils/model';

curdModel.curdModelConfig({
  getTableList,
  getData,
  isResponseOk,
})

export default curdModel.setCurdModel;