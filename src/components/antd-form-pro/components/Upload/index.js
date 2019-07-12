import React, { Component } from 'react';
import { Upload, Icon } from 'antd';
import _isString from 'lodash/isString';
import _isArray from 'lodash/isArray';

import uploadFile from '@/services/upload';

const { Dragger } = Upload;

async function customRequest({ file, onSuccess, onError }) {
  const response = await uploadFile(file);
  if (response) {
    onSuccess(response, file);
  } else {
    onError(response);
  }
}

function setFileNameByPath(path) {
  const pathSegment = path.split(/\//g);
  return pathSegment[pathSegment.length - 1];
}

function setFileList(props) {
  const { value } = props;
  let fileList = [];
  if (value && _isString(value)) {
    fileList = [{ uid: 1, url: value, name: setFileNameByPath(value) }];
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
    const formatFiles = newFileList.map(item => {
      const path = item.response ? item.response.data.path : '';
      return {
        uid: item.uid,
        name: setFileNameByPath(path),
        status: item.status,
        url: path, // uploading 状态 无 response 属性
      };
    });

    if (onChange) {
      onChange(formatFiles);
    } else {
      this.setState({ fileList: formatFiles });
    }
  };

  render() {
    const { fileList } = this.state;

    return (
      <Dragger
        name="file"
        // multiple: true
        customRequest={customRequest}
        onChange={this.handleChange}
        fileList={fileList}
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
  const { accept, listType, fileList, onPreview, onChange, children, disabled } = props;
  return (
    <Upload
      accept={accept}
      name="image"
      onError={err => console.log(err)}
      customRequest={customRequest}
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
