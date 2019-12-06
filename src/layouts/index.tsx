import React from 'react';
import { FormConfigProvider } from 'antd-curd';
import uploadFile, { getUrl, isUploadSuccess } from '@/services/upload';

const GlobalLayout: React.FC<any> = props => {
  return (
    <FormConfigProvider
      value={{
        uploadFn: uploadFile,
        getUrl,
        isUploadOk: isUploadSuccess,
        commenExtra: {
          picture: '自定义图片默认提示',
        },
      }}
      {...props}
    />
  );
};

export default GlobalLayout;
