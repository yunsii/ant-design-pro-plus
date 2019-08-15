declare module '*.less';

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
