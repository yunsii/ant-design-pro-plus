import React from 'react';
import { FormConfigProvider } from 'antd-curd';
import uploadFn, { getUrl, isUploadOk } from '@/services/upload';

const GlobalLayout: React.FC<any> = props => {
  return (
    <FormConfigProvider
      value={{
        uploadFn,
        getUrl,
        isUploadOk,
        commenExtra: {
          picture: '自定义图片默认提示',
        },
      }}
      {...props}
    />
  );
};

export default GlobalLayout;
