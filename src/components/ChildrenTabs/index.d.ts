import * as React from 'react';
import { TabsProps } from 'antd/lib/tabs';

export declare interface ChildrenTabsProps {
  activeKey: string;
  activetTitle: string;
  handleTabChange: (keyToSwitch: string, activedTabs: any[]) => void;
  handleRemoveTab: (removeKey: string, nextTabKey: string, activedTabs: any[]) => void;
  extraTabProperties?: {};
  tabsConfig?: TabsProps;
}
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
