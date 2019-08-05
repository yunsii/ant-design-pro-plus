import FormMate, { config } from 'antd-form-mate';
import uploadFile, { getUrl, isUploadSuccess } from '@/services/upload';

const { uploadConfig } = config;
uploadConfig({
  uploadFile,
  getUrl,
  isUploadSuccess,
});

const { setDefaultExtra } = FormMate;
setDefaultExtra({
  picture: '自定义图片默认提示'
})

export const { FormProvider, createFormItems } = FormMate;