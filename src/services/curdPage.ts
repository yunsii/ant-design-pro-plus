import request from '@/utils/request';
import { stringify } from 'qs';

export async function fetchCurdPage(params?: any) {
  return request(`/api/enhance/curd-page${stringify(params)}`);
}

export async function createCurdPage(payload) {
  return request(`/api/enhance/curd-page`, {
    method: 'POST',
    data: payload,
  });
}

export async function updateCurdPage(id: number, payload) {
  return request(`/api/enhance/curd-page/${id}`, {
    method: 'PATCH',
    data: payload,
  });
}

export async function deleteCurdPage(id: number) {
  return request(`/api/enhance/curd-page/${id}`, {
    method: 'DELETE',
  });
}
