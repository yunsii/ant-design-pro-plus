import * as React from 'react';

export declare type ChildrenTabsProps = {
  tabKey: string;
  tabName: string;
  extraTabProperties?: {};
  beforeSwtichTab?: (keyToSwitch: string, activedTabs: any[]) => string;
  handleTabChange?: (keyToSwitch: string, activedTabs: any[]) => void;
  beforeRemoveTab?: (nextTabKey: string, activedTabs: any[]) => any;
};
interface ChildrenTabsState {
  activedTabs: any[];
  activeKey: string | null;
}

declare class ChildrenTabs extends React.Component<ChildrenTabsProps, ChildrenTabsState> {
  static getDerivedStateFromProps(props: ChildrenTabsProps, state: ChildrenTabsState): any;
  handleSwitch(keyToSwitch: string): void;
  handleTabEdit(targetKey: string, action: 'add' | 'remove'): void;
  remove(key: string): void;
  handleTabsMenuClick(event): void;
  render(): JSX.Element;
}
export default ChildrenTabs;
