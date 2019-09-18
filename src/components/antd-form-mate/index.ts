import { config } from 'antd-form-mate';
import uploadFile, { getUrl, isUploadSuccess } from '@/services/upload';
export { createFormItems } from 'antd-form-mate';

const { setDefaultExtra, setUploadConfig } = config;
setUploadConfig({
  uploadFile,
  getUrl,
  isUploadSuccess,
});

setDefaultExtra({
  picture: '自定义图片默认提示',
});
