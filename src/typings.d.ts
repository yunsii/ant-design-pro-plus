declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'svg';

declare module 'hash-string';

// google analytics interface
interface GAFieldsObject {
  eventCategory: string;
  eventAction: string;
  eventLabel?: string;
  eventValue?: number;
  nonInteraction?: boolean;
}
interface Window {
  ga: (
    command: 'send',
    hitType: 'event' | 'pageview',
    fieldsObject: GAFieldsObject | string,
  ) => void;
  reloadAuthorized: () => void;
  routerBase: string;

  reloadTab: (path?: string) => void;
  /** 如果已经打开的标签页会触发 callback ，如果 force 为 true ，总会调用 callback */
  goBackTab: (path?: string, callback?: () => void, force?: boolean) => void;
  /** 关闭后自动切换到附近的标签页，如果是最后一个标签页不可删除 */
  closeTab: (path?: string, callback?: () => void, force?: boolean) => void;
  closeAndGoBackTab: (path?: string, callback?: () => void, force?: boolean) => void;
}

declare let ga: Function;

// preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
declare let ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: 'site' | undefined;

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;
