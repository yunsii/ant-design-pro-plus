import React from 'react';
import { Icon, Dropdown, Menu, Divider, Popconfirm, Modal } from 'antd';
import _flatten from 'lodash/flatten';

function isConfirmKey(key, confirmKeys) {
  return confirmKeys.includes(key);
}

function addDivider(actions) {
  return _flatten(
    actions.map((item, index) => {
      if (index + 1 < actions.length) {
        return [item, <Divider key={`${item.key}_divider`} type="vertical" />];
      }
      return [item];
    })
  );
}

const generateShowActions = record => (actions, confirmKeys = []) => {
  return [
    ...actions.map(item => {
      if (isConfirmKey(item.key, confirmKeys)) {
        return (
          <Popconfirm
            key={item.key}
            title={`确定${item.title}吗？`}
            onConfirm={() => item.handleClick(record)}
          >
            <a>{item.title}</a>
          </Popconfirm>
        );
      }
      return (
        <a key={item.key} onClick={() => item.handleClick(record)}>
          {item.title}
        </a>
      );
    }),
  ];
};

export const renderActions = record => (sortedActions, showActionsCount, confirmKeys) => {
  if (sortedActions.length <= showActionsCount) {
    return addDivider(generateShowActions(record)(sortedActions, confirmKeys));
  }

  const showActions = sortedActions.slice(0, showActionsCount);
  const moreAction = sortedActions.slice(showActionsCount);
  return addDivider([
    ...generateShowActions(record)(showActions, confirmKeys),
    <Dropdown
      key="more"
      overlay={
        <Menu>
          {moreAction.map(item => (
            <Menu.Item
              key={item.key}
              onClick={() => {
                if (isConfirmKey(item.key, confirmKeys)) {
                  Modal.confirm({
                    title: `确定${item.title}吗？`,
                    onOk() {
                      item.handleClick(record);
                    },
                    okText: '确定',
                    cancelText: '取消',
                  });
                  return;
                }
                item.handleClick(record);
              }}
            >
              <a>{item.title}</a>
            </Menu.Item>
          ))}
        </Menu>
      }
    >
      <a>
        更多 <Icon type="down" />
      </a>
    </Dropdown>,
  ]);
};

export function transferBoolArrayToStringArray(boolArray = []) {
  let result = '';
  for (let i = 0; i < boolArray.length; i += 1) {
    result += boolArray[i] ? '1' : '0';
  }
  return result;
}

export function sortAndFilterActionsAsc(actions, hideActions) {
  return [...actions]
    .filter(item => !hideActions.includes(item))
    .sort((x, y) => {
      if (x.key > y.key) return 1;
      if (x.key < y.key) return -1;
      return 0;
    });
}
