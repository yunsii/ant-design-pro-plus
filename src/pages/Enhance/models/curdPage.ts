import curdModel from '@/base-models/curd';
import { fetchCurdPage, createCurdPage, updateCurdPage, deleteCurdPage } from '@/services/curdPage';

export const Namespace = 'curdPage';

const model = curdModel(Namespace, {
  fetchMethod: fetchCurdPage,
  createMethod: createCurdPage,
  updateMethod: updateCurdPage,
  deleteMethod: deleteCurdPage,
});

export default model;
