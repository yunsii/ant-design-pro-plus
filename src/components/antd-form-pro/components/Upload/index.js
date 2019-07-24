import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import _isString from 'lodash/isString';
import _isArray from 'lodash/isArray';
import uploadFile, { getValueForFormItemFromResponse, isUploadSuccess } from '@/services/upload';

const { Dragger } = Upload;

export function processFileList(fileList) {
  return fileList.map(item => {
    if (item.response) {
      return {
        ...item,
        url: getValueForFormItemFromResponse(item.response), // uploading 状态 无 response 属性
      };
    }
    return item;
  });
}

export function filterFileList(fileList) {
  return fileList.filter(item => item.status === 'uploading' || item.url);
}

export function filterFileListOnComplete(fileList) {
  return fileList.filter(item => item.url);
}

const customRequest = uploadFunction => async ({ file, onSuccess, onError }) => {
  let response = null;
  if (uploadFunction) {
    response = await uploadFunction(file);
  } else {
    response = await uploadFile(file);
  }
  if (isUploadSuccess(response)) {
    onSuccess(response, file);
  } else {
    onError(response);
  }
};

function setFileNameByPath(path) {
  const pathSegment = path.split(/\//g);
  return pathSegment[pathSegment.length - 1];
}

export function setFileList(props) {
  const { value } = props;
  let fileList = [];
  if (value && _isString(value)) {
    fileList = [{ uid: -48, url: value, name: setFileNameByPath(value) }];
  } else if (value && _isArray(value)) {
    fileList = [...value];
  }
  return fileList;
}

export class CustomDragger extends Component {
  static getDerivedStateFromProps(props) {
    return {
      fileList: setFileList(props),
    };
  }

  state = {
    fileList: setFileList(this.props),
  };

  handleChange = ({ fileList }) => {
    const { onChange, filesLimit } = this.props;
    let newFileList = [...fileList];
    if (filesLimit <= fileList.length) {
      newFileList = newFileList.slice(-1);
    }
    const formatFiles = processFileList(newFileList);

    if (onChange) {
      onChange(filterFileList(formatFiles));
    }
  };

  render() {
    const { uploadFunction, onChange, ...rest } = this.props;
    const { fileList } = this.state;

    return (
      <Dragger
        name="file"
        // multiple: true
        customRequest={customRequest(uploadFunction)}
        onChange={this.handleChange}
        fileList={fileList}
        onError={() => {
          message.error('上传失败');
          const { fileList: afterErrorFileList } = this.state;
          onChange(filterFileListOnComplete(afterErrorFileList));
        }}
        {...rest}
      >
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">点击或拖拽文件到此处上传</p>
        {/* <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
        </p> */}
      </Dragger>
    );
  }
}

export default function CustomUpload(props) {
  const {
    accept,
    listType,
    fileList,
    onPreview,
    onChange,
    onError,
    children,
    disabled,
    uploadFunction,
  } = props;
  return (
    <Upload
      accept={accept}
      name="image"
      onError={onError}
      customRequest={customRequest(uploadFunction)}
      listType={listType || 'text'}
      fileList={fileList}
      onPreview={onPreview}
      onChange={onChange}
      disabled={disabled}
    >
      {children}
    </Upload>
  );
}
