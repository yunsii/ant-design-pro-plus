/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { Select, Spin } from 'antd';

const { Option } = Select;

class CustomSelect extends PureComponent {
  handleChange = (value, option) => {
    if (this.props.handleChange) {
      this.props.handleChange(value, option);
    }
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  render() {
    const { value, options, loading, onChange, handleChange, ...rest } = this.props;
    const disabledStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.25)',
    };
    return (
      <Spin spinning={loading || false}>
        <Select value={value} placeholder="请选择" onChange={this.handleChange} {...rest}>
          {options.map(item => (
            <Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              style={item.disabled ? disabledStyle : {}}
            >
              {item.text}
            </Option>
          ))}
        </Select>
      </Spin>
    );
  }
}

export default CustomSelect;
