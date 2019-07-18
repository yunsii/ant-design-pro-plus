import React from 'react';

export interface PageTabsProps {
  proRootPath?: string;
  children: JSX.Element;
  originalMenuData: any[];
}

export default class PageTabs extends React.Component<PageTabsProps, any> {}
