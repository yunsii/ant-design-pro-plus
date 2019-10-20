import request from '@/utils/request';
import { stringify } from 'qs';
import { getMembers, getDetail } from './mock/curdPage';
import { usePromise, promiseTimeout } from './mock/config';

export async function fetchCurdPage(params?: any) {
  if (usePromise) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(getMembers(params || {}));
      }, promiseTimeout);
    });
  }
  return request(`/api/enhance/curd-page?${stringify(params)}`);
}

export async function detailCurdPage(id: number | string) {
  if (usePromise) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(getDetail(id));
      }, promiseTimeout);
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
