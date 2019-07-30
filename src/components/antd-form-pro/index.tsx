import React from 'react';
import { Form, Input, InputNumber, Slider } from 'antd';
import { FormItemProps, ValidationRule } from 'antd/lib/form';
import { WrappedFormUtils, GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { ColProps } from 'antd/lib/col';

import CustomDatePicker, { CustomRangePicker } from './components/CustomDatePicker';
import CustomSelect from './components/Select';
import LocationPicker from './components/LocationPicker';
import PicturesWall from './components/PicturesWall';
import CustomSwitch from './components/CustomSwitch';
import { CustomDragger } from './components/Upload';
import { inputComponentStyle } from './style';

const FormContext = React.createContext<WrappedFormUtils | null>(null);
export const FormProvider = FormContext.Provider;
const FormConsumer = FormContext.Consumer;

export const defaultExtra = {
  picture: '图片必须大于100*100像素',
};

export const defaultTypeHint = {
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
          style={{ minWidth: 'unset', ...inputComponentStyle }}
          format="YYYY-MM-DD HH:mm:ss"
          showTime
          {...componentProps}
        />
      );
    case 'datetime-range':
      return (
        <CustomRangePicker
          format="YYYY-MM-DD HH:mm:ss"
          showTime
          style={inputComponentStyle}
          {...componentProps}
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
    case 'file-dragger':
      return <CustomDragger {...componentProps} />;
    case 'location':
      return <LocationPicker {...componentProps} />;
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

export interface CustomFormItemProps extends FormItemProps {
  dense: boolean;
}

export type ComponentType =
  | 'custom'
  | 'date'
  | 'datetime'
  | 'datetime-range'
  | 'number'
  | 'select'
  | 'textarea'
  | 'password'
  | 'picture'
  | 'switch'
  | 'slider'
  | 'file-dragger'
  | 'location'
  | string;

export interface ItemConfig {
  type: ComponentType;
  field: string;
  formItemProps?: CustomFormItemProps;
  fieldProps?: GetFieldDecoratorOptions;
  componentProps?: any;
  component?: React.ElementType;
}

export interface Layout {
  labelCol?: ColProps;
  wrapperCol?: ColProps;
}

export const createFormItems = (itemsConfig: ItemConfig[], globalLayout?: Layout) => {
  return itemsConfig.map(item => {
    const {
      type,
      field,
      formItemProps = {} as CustomFormItemProps,
      fieldProps = {},
      componentProps = {},
      component,
    } = item;
    const { style = {}, dense, extra, wrapperCol, labelCol, ...restFormItemProps } = formItemProps;
    const { rules = [], ...restFieldProps } = fieldProps;
    const itemLayout = wrapperCol && labelCol ? { wrapperCol, labelCol } : null;

    let layout = itemLayout || globalLayout || defaultLayout;
    if (!itemLayout && !globalLayout && !restFormItemProps.label) {
      layout = {
        wrapperCol: { span: 24 },
      };
    }

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
              <span className="ant-form-text">
                {restFieldProps.initialValue as React.ReactNode}
              </span>
            ) : (
              form &&
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
