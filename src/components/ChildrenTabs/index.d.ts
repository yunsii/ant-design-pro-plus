import * as React from 'react';

export declare type ChildrenTabsProps = {
  activeKey: string;
  activetTitle: string;
  extraTabProperties?: {};
  beforeSwtichTab?: (keyToSwitch: string, activedTabs: any[]) => string;
  handleTabChange?: (keyToSwitch: string, activedTabs: any[]) => void;
  beforeRemoveTab?: (nextTabKey: string, activedTabs: any[]) => void;
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
