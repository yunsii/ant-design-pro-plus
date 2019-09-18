import React from 'react';
import { Badge } from 'antd';
import _find from 'lodash/find';
import _isArray from 'lodash/isArray';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import _partial from 'lodash/partial';

export function getData(response) {
  const { data } = response;
  return data || {};
}

export function getTableList(response) {
  // 本地化更新数据，直接传入数组
  if (_isArray(response)) {
    return { list: response };
  }
  // 请求接口响应数据处理
  const { data } = response;
  return data.data
    ? {
        list: _isArray(data.data) ? data.data : [],
        pagination: {
          current: data.current_page,
          pageSize: data.per_page,
          total: data.total,
        },
      }
    : { list: _isArray(data) ? data : [] };
}

function isValidCode(code) {
  return isNumber(code) || isString(code);
}
export function renderBadge(node) {
  const color = node.status ? { status: node.status } : { color: node.color };
  return <Badge {...color} text={node.text} />;
}

export function renderStatus(status, code) {
  if (isValidCode(code)) {
    const target = _find(status, { value: code });
    if (!target) return `未编码：${code}`;

    return renderBadge(target);
  }
  return '无状态';
}

export function renderCode(list, code) {
  if (isValidCode(code)) {
    const type = _find(list, { value: code });
    if (type && type.color) {
      return renderBadge(type);
    }
    if (type) return type.text;
    return `未编码：${code}`;
  }
  return `无类型`;
}

export function isResponseOk(response) {
  return response && response.status_code === 200;
}
