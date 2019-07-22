import React from 'react';
import { Icon, Dropdown, Menu, Divider, Popconfirm, Modal } from 'antd';
import _flatten from 'lodash/flatten';
import _isArray from 'lodash/isArray';

function isConfirmKeyAndItem(key, confirmKeys) {
  for (let i = 0; i < confirmKeys.length; i += 1) {
    if (_isArray(confirmKeys[i]) && confirmKeys[i][0] === key) {
      return [true, confirmKeys[i]];
    }
    if (confirmKeys[i] === key) {
      return [true, confirmKeys[i]];
    }
  }
  return [false, null];
}

function setConfirmTitle(confirmKey, item, record) {
  if (_isArray(confirmKey)) {
    const [, setTitle] = confirmKey;
    return setTitle(record);
  }
  return `确定${item.title}吗？`;
}

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

const generateShowActions = record => (actions, confirmKeys = []) => {
  return actions.map(item => {
    const [isConfirmKey, confirmKey] = isConfirmKeyAndItem(item.key, confirmKeys);
    if (isConfirmKey) {
      return (
        <Popconfirm
          key={item.key}
          title={setConfirmTitle(confirmKey, item, record)}
          onClick={event => {
            event.stopPropagation();
          }}
          onConfirm={() => item.handleClick(record)}
        >
          <a>{item.title}</a>
        </Popconfirm>
      );
    }
    return (
      <a
        key={item.key}
        onClick={event => {
          event.stopPropagation();
          item.handleClick(record);
        }}
      >
        {item.title}
      </a>
    );
  });
};

export const renderActions = record => (actions, moreActions, confirmKeys) => {
  if (!moreActions.length) {
    return generateShowActions(record)(actions, confirmKeys);
  }

  return [
    ...generateShowActions(record)(actions, confirmKeys),
    <Dropdown
      key="more"
      // 阻止 Dropdown 点击事件冒泡，否则会触发 actions 容器点击事件
      onClick={event => {
        event.stopPropagation();
      }}
      overlay={
        // 阻止 Menu 点击事件冒泡，否则会触发 actions 容器点击事件
        <Menu
          onClick={({ domEvent }) => {
            domEvent.stopPropagation();
          }}
        >
          {moreActions.map(item => {
            const [isConfirmKey, confirmKey] = isConfirmKeyAndItem(item.key, confirmKeys);
            return (
              <Menu.Item
                key={item.key}
                onClick={() => {
                  if (isConfirmKey) {
                    Modal.confirm({
                      title: setConfirmTitle(confirmKey, item, record),
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
            );
          })}
        </Menu>
      }
    >
      <a style={{ whiteSpace: 'nowrap' }}>
        更多 <Icon type="down" style={{ width: 24 }} />
      </a>
    </Dropdown>,
  ];
};

export function transferBoolArrayToString(boolArray = []) {
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
