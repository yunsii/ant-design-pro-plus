import React from 'react';
import { createFormItems, ConfigProvider as FormConfigProvider } from 'antd-form-mate';
import { ConfigProvider as CurdConfigProvider } from 'antd-curd';
import uploadFn, { getUrl, isUploadOk } from '@/services/upload';

const GlobalLayout: React.FC<any> = props => {
  const { children } = props;
  return (
    <FormConfigProvider
      uploadFn={uploadFn}
      getUrl={getUrl}
      isUploadOk={isUploadOk}
      commenExtra={{
        picture: '自定义图片默认提示',
      }}
    >
      <CurdConfigProvider createFormItemsFn={createFormItems}>{children}</CurdConfigProvider>
    </FormConfigProvider>
  );
};

export default GlobalLayout;
