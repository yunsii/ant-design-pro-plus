import React from 'react';
import { Divider } from 'antd';
import _flatten from 'lodash/flatten';

export function addDivider(actions) {
  return _flatten(
    actions.map((item, index) => {
      if (index + 1 < actions.length) {
        return [item, <Divider key={`${item.key}_divider`} type="vertical" />];
      }
      return [item];
    })
  );
}

export function transferBoolArrayToString(boolArray = []) {
  let result = '';
  for (let i = 0; i < boolArray.length; i += 1) {
    result += boolArray[i] ? '1' : '0';
  }
  return result;
}
