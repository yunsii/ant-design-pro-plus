import { DetailFormDrawerProps } from '@/components/DetailFormDrawer';

export interface CustomDetailFormDrawerProps extends DetailFormDrawerProps {
  drawerConfig: {
    title?: never;
    visible?: never;
    onClose?: never;
  };
  onOk?: never;
  itemsConfig: never;
  loading?: never;
}
