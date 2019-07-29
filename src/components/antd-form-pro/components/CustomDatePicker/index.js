/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import moment from 'moment';
import _isArray from 'lodash/isArray';
import { DatePicker } from 'antd';

// Warning: Function components cannot be given refs.
const { RangePicker } = DatePicker;

function setDataPickerValue(value) {
  if (!value) return null;
  if (value instanceof moment) return value;
  return moment(value);
}

function setRangePickerValue(value) {
  if (!value) return null;
  if (!(_isArray(value) && value.length >= 2)) {
    console.error('RangePicker value is error:', value);
    return null;
  }
  if (value[0] instanceof moment) return value;
  return [moment(value[0]), moment(value[1])];
}

export class CustomRangePicker extends Component {
  handleChange = (dates, dateStrings) => {
    if (this.props.onChange) {
      this.props.onChange(dates, dateStrings);
    }
  };

  render() {
    const { value, onChange, ...rest } = this.props;

    return (
      <RangePicker
        value={setRangePickerValue(value)}
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
      this.props.onChange(timeMoment, timeString);
    }
  };

  render() {
    const { onChange, value, ...rest } = this.props;
    return (
      <DatePicker
        value={setDataPickerValue(value)}
        allowClear={false}
        onChange={this.handleChange}
        {...rest}
      />
    );
  }
}
