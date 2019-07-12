/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';

// Warning: Function components cannot be given refs.
const { RangePicker } = DatePicker;

export class CustomRangePicker extends Component {
  handleChange = (dates, dateStrings) => {
    if (this.props.onChange) {
      this.props.onChange(dateStrings);
    }
  };

  render() {
    const { value, onChange, ...rest } = this.props;

    return (
      <RangePicker
        value={!value ? null : [moment(value[0]), moment(value[1])]}
        allowClear={false}
        onChange={this.handleChange}
        {...rest}
      />
    );
  }
}

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
