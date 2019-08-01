import { curdModel } from 'dva-base-models';
import { getTableList, getData, isResponseOk } from '@/utils/model';

curdModel.curdModelConfig({
  getTableList,
  getData,
  isResponseOk,
})

console.log(curdModel);

export default curdModel.setCurdModel;