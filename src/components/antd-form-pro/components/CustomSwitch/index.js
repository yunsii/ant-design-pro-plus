import React, { Component } from 'react';
import { Switch } from 'antd';
import { callFunctionIfFunction } from '@/utils/decorators/callFunctionOrNot';

export default class CustomSwitch extends Component {
  onClick = checked => {
    const { onChange, onClick: onPropsClick } = this.props;
    onChange(checked ? 1 : 0);
    callFunctionIfFunction(onPropsClick)(checked);
  };

  render() {
    const { value, onChange, onClick: onPropsClick, ...rest } = this.props;
    return <Switch checked={value === 1} onClick={this.onClick} {...rest} />;
  }
}
