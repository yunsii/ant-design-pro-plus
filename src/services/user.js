import request from '@/utils/request';
import { getCurrentUser } from './mock/user';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'production') {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(getCurrentUser());
      }, 1200);
    });
  }
  return request('/api/currentUser');
}
