import request from '@/utils/request';

export default async function uploadFile(file) {
  const fd = new FormData();
  fd.append('file', file);

  return request(`/upload/file/api`, {
    method: 'POST',
    data: fd,
  });
}
