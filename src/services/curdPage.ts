import request from '@/utils/request';
import { stringify } from 'qs';
import { getMembers, getDetail } from './mock/curdPage';
import { usePromise } from './mock/config';

export async function fetchCurdPage(params?: any) {
  if (usePromise) {
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve(getMembers(params || {}));
      }, 1200);
    });
  }
  return request(`/api/enhance/curd-page?${stringify(params)}`);
}

export async function detailCurdPage(id: number | string) {
  if (usePromise) {
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve(getDetail(id));
      }, 1200);
    });
  }
  return request(`/api/enhance/curd-page/${id}`);
}

export async function createCurdPage(payload) {
  return request(`/api/enhance/curd-page`, {
    method: 'POST',
    data: payload,
  });
}

export async function updateCurdPage(id: number | string, payload) {
  return request(`/api/enhance/curd-page/${id}`, {
    method: 'PATCH',
    data: payload,
  });
}

export async function deleteCurdPage(id: number | string) {
  return request(`/api/enhance/curd-page/${id}`, {
    method: 'DELETE',
  });
}
