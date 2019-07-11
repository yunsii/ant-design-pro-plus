import React from 'react';
import { TreeSelect } from 'antd';

export default function setFormItemsConfig(detail = {}, mode) {
  return [
    {
      type: 'custom',
      field: 'organ_id',
      formItemProps: {
        label: '所属机构',
      },
      fieldProps: {
        rules: [{ required: true, message: '请选择所属机构' }],
        initialValue: detail.organ_id,
      },
      component: (
        <TreeSelect
          style={{ width: '100%' }}
          placeholder="请选择所属机构！"
          disabled={mode === 'update'}
        />
      ),
    },
    {
      type: 'date',
      field: 'date',
      formItemProps: {
        label: '日期',
      },
      fieldProps: {
        rules: [{ required: true, message: '请选择日期！' }],
        initialValue: detail.date,
      },
    },
    {
      type: 'datetime',
      field: 'datetime',
      formItemProps: {
        label: '日期时间',
      },
      fieldProps: {
        rules: [{ required: true, message: '请选择日期时间！' }],
        initialValue: detail.datetime,
      },
    },
    {
      type: 'number',
      field: 'number',
      formItemProps: {
        label: '数字',
      },
      fieldProps: {
        rules: [{ required: true, message: '请输入数字！' }],
        initialValue: detail.number,
      },
    },
    {
      type: 'select',
      field: 'select',
      formItemProps: {
        label: '选择',
      },
      fieldProps: {
        rules: [{ required: true, message: '请选择选择！' }],
        initialValue: detail.select,
      },
      componentProps: {
        options: [
          {
            text: '银河',
            value: 'yh',
          },
        ],
      },
    },
    {
      type: 'textarea',
      field: 'textarea',
      formItemProps: {
        label: '文本框',
      },
      fieldProps: {
        rules: [{ required: true, message: '请输入文本框！' }],
        initialValue: detail.textarea,
      },
      componentProps: {
        autoSize: { minRows: 2, maxRows: 6 },
      },
    },
    {
      type: 'password',
      field: 'password',
      formItemProps: {
        label: '密码',
      },
      fieldProps: {
        rules: [{ required: true, message: '请输入密码！' }],
        initialValue: detail.password,
      },
    },
    {
      type: 'picture',
      field: 'picture',
      formItemProps: {
        label: '图片',
      },
      fieldProps: {
        rules: [{ required: true, message: '请选择图片！' }],
        initialValue: detail.picture,
      },
    },
    {
      type: 'switch',
      field: 'switch',
      formItemProps: {
        label: '开关',
      },
      fieldProps: {
        initialValue: detail.switch,
      },
    },
    {
      type: 'slider',
      field: 'slider',
      formItemProps: {
        label: '滑动输入条',
      },
      fieldProps: {
        initialValue: detail.slider,
      },
    },
    {
      type: 'default/string',
      field: 'string',
      formItemProps: {
        label: '字符串',
      },
      fieldProps: {
        initialValue: detail.string,
      },
    },
  ];
}
