import curdModel from '@/base-models/curd';
import { fetchCurdPage, createCurdPage, updateCurdPage, deleteCurdPage } from '@/services/curdPage';

const model = curdModel('curdPage', {
  fetchMethod: fetchCurdPage,
  createMethod: createCurdPage,
  updateMethod: updateCurdPage,
  deleteMethod: deleteCurdPage,
});

export default model;
