/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';

export default class CustomDatePicker extends Component {
  handleChange = (timeMoment, timeString) => {
    // console.log(timeMoment, timeString);  // null ""
    if (this.props.onChange) {
      this.props.onChange(timeString);
    }
  };

  render() {
    const { onChange, value, ...rest } = this.props;
    return (
      <DatePicker
        value={!value ? null : moment(value)}
        allowClear={false}
        onChange={this.handleChange}
        {...rest}
      />
    );
  }
}
