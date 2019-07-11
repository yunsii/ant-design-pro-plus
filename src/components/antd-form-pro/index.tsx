import React from 'react';
import {
  Form,
  Input,
  InputNumber,
  Slider,
  WrappedFormUtils,
  FormItemProps,
  ColProps,
  ValidationRule,
  GetFieldDecoratorOptions,
} from 'antd';

import CustomDatePicker from './components/CustomDatePicker';
import CustomSelect from './components/Select';
import PicturesWall from './components/PicturesWall';
import CustomSwitch from './components/CustomSwitch';
import { inputComponentStyle } from './style';

const FormContext = React.createContext<WrappedFormUtils | null>(null);
export const FormProvider = FormContext.Provider;
const FormConsumer = FormContext.Consumer;

const defaultExtra = {
  picture: '图片必须大于100*100像素',
};

const defaultTypeHint = {
  email: '请输入正确的邮箱格式',
};

const defaultLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 12 },
};

function renderInputComponent(inputConfig) {
  const { type, component: CustomComponent, ...componentProps } = inputConfig;
  switch (type) {
    case 'custom':
      return CustomComponent;
    case 'date':
      return <CustomDatePicker style={inputComponentStyle} {...componentProps} />;
    case 'datetime':
      return (
        <CustomDatePicker
          {...componentProps}
          style={inputComponentStyle}
          format="YYYY-MM-DD HH:mm:ss"
          showTime
        />
      );
    case 'number':
      return <InputNumber placeholder="请输入" {...componentProps} style={inputComponentStyle} />;
    case 'select':
      return <CustomSelect {...componentProps} style={inputComponentStyle} />;
    case 'textarea':
      return (
        <Input.TextArea
          style={{ ...inputComponentStyle }}
          placeholder="请输入"
          {...componentProps}
        />
      );
    case 'password':
      return (
        <Input.Password style={inputComponentStyle} placeholder="请输入密码" {...componentProps} />
      );
    case 'picture':
      return <PicturesWall {...componentProps} />;
    case 'switch':
      return <CustomSwitch {...componentProps} />;
    case 'slider':
      return <Slider {...componentProps} />;
    default:
      return <Input style={inputComponentStyle} placeholder="请输入" {...componentProps} />;
  }
}

function setDefaultCheckedTypeHint(type: string, rules: ValidationRule[]) {
  let result = [...rules];
  if (type === 'email') {
    result = [{ type: 'email', message: defaultTypeHint.email }, ...rules];
  }
  return result;
}

export interface ItemConfig {
  type: string;
  field: string;
  formItemProps?: FormItemProps;
  fieldProps?: GetFieldDecoratorOptions;
  componentProps?: any;
  component?: React.ElementType;
}

export interface Layout {
  labelCol?: ColProps;
  wrapperCol?: ColProps;
}

export const createFormItems = (itemsConfig: ItemConfig[], globalLayout: Layout) => {
  return itemsConfig.map(item => {
    const {
      type,
      field,
      formItemProps = {},
      fieldProps = {},
      componentProps = {},
      component,
    } = item;
    const { style = {}, dense, extra, layout: itemLayout, ...restFormItemProps } = formItemProps;
    const { rules = [], ...restFieldProps } = fieldProps;

    const layout = itemLayout || globalLayout || defaultLayout;

    return (
      <FormConsumer key={field}>
        {form => (
          <Form.Item
            style={dense ? { marginBottom: 0, ...style } : style}
            {...layout}
            extra={extra || defaultExtra[type]}
            {...restFormItemProps}
          >
            {type === 'plain' ? (
              <span className="ant-form-text">{restFieldProps.initialValue}</span>
            ) : (
              form.getFieldDecorator(field, {
                ...restFieldProps,
                rules: setDefaultCheckedTypeHint(type, rules),
              })(renderInputComponent({ ...componentProps, type, component }))
            )}
          </Form.Item>
        )}
      </FormConsumer>
    );
  });
};
