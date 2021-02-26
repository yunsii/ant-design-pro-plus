export enum Mode {
  /** 使用页面路由定义作为标签页 ID ，形如 /path/:name 的路由定义只打开一个标签页 */
  Route = 'route',
  /** 使用页面路由参数作为标签页 id ，因此，可能需要再在 PageTabs 组件中动态设置标签页的标题 */
  Dynamic = 'dynamic',
}
