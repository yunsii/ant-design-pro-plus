import request from '@/utils/request';

export default async function uploadFn(file) {
  const fd = new FormData();
  fd.append('file', file);

  return request(`/upload/file/api`, {
    method: 'POST',
    data: fd,
  });
}

export function isUploadOk(response) {
  const { data } = response;
  return data;
}

export function getUrl(response) {
  const {
    data: { path },
  } = response;
  return path;
}
