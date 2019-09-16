declare module '*.less';
// import ChildrenTabs from '@/components/ChildrenTabs';

declare interface UmiChildren extends React.ReactChildren {
  props: {
    location: Location;
  };
}

declare interface MenuItem {
  authority: string[] | undefined;
  children?: UmiChildren[];
  component?: React.Component;
  icons?: string;
  name?: string;
  path: string;
}

interface Window {
  childrenTabs: any;
}
