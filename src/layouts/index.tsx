import React, { useState } from 'react';
import { FormConfigProvider } from 'antd-curd';
import uploadFn, { getUrl, isUploadOk } from '@/services/upload';

const GlobalLayout: React.FC<any> = props => {
  const [config] = useState({
    uploadFn,
    getUrl,
    isUploadOk,
    commenExtra: {
      picture: '自定义图片默认提示',
    },
  });
  return <FormConfigProvider value={config} {...props} />;
};

export default GlobalLayout;
