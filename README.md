<h1 align="center">Ant Design Pro Plus</h1>

<div align="center">

官方说明请参阅 [/master/README.zh-CN](https://github.com/ant-design/ant-design-pro/blob/master/README.zh-CN.md)

![github pages](https://github.com/yunsii/ant-design-pro-plus/workflows/github%20pages/badge.svg) [![GitHub license](https://img.shields.io/github/license/yunsii/ant-design-pro-plus.svg)](https://github.com/yunsii/ant-design-pro-plus/blob/master/LICENSE) [![GitHub stars](https://img.shields.io/github/stars/yunsii/ant-design-pro-plus.svg)](https://github.com/yunsii/ant-design-pro-plus/stargazers) [![GitHub issues](https://img.shields.io/github/issues/yunsii/ant-design-pro-plus.svg)](https://github.com/yunsii/ant-design-pro-plus/issues) [![GitHub commit activity](https://img.shields.io/github/commit-activity/m/yunsii/ant-design-pro-plus.svg)](https://github.com/yunsii/ant-design-pro-plus/commits/master)

</div>

<!-- ![GudmSe.png](https://s1.ax1x.com/2020/03/30/GudmSe.png) -->
<img alt="Snapshot" src="./static/snapshot.svg" width="100%" />

## ✨ 基于路由的页面标签化展示

**兼容性：`^umi@2.0.0 | ^umi@3.3.8`**

- 支持页面的嵌套路由渲染
- 两种标签页模式可选
  - 基于路由，每个路由只渲染一个标签页
  - 基于路由参数，计算出每个路由的所有参数的哈希值，不同的哈希值渲染不同的标签页
- 可固定标签栏
- [快捷操作](/src/typings.d.ts#L35)
  - 刷新标签页 - `window.tabsAction.reloadTab()`
  - 关闭标签页 - `window.tabsAction.closeTab()`
  - 返回之前标签页 - `window.tabsAction.goBackTab()`
  - 关闭并返回之前标签页 - `window.tabsAction.closeAndGoBackTab()`
  - 获取 location 对应的 tabKey，如果没有入参，返回当前激活的 tabKey - `window.tabsAction.getTabKey()`
  - 监听 activeKey 变化事件 - `window.tabsAction.listenActiveChange()`
- `reloadable`，支持在头部操作栏刷新当前标签页
- `follow`，路由定义中新增配置，默认打开方式是添加到所有标签页最后面，可通过配置该属性，使得一个标签页在 `follow` 指定的标签页后面打开（可参考查询页 Demo）
- `persistent`，支持页面刷新之后恢复上次的标签页状态

注意：

- 返回默认只会返回上次的路由，所以如果上次的路由没有关闭，会在两个路由之前反复横跳，当删除上次打开的标签页之后再调用该返回方法时只会打印警告
- 如需固定标签页头部且渲染 Footer 时，请使用 SwitchTabsLayout 的 footerRender 配置，而不是 ProLayout 提供的 footerRender，以保证组件能正常固定标签页头部

### 代码结构

```
├── config
│   └── defaultSettings.ts    # 系统风格配置，新增关于 SwitchTabs 的配置
├── src
│   └── layouts
│       └── SwitchTabsLayout  # 路由加载
│   └── pages
│       └── SwitchTabsDemo    # 标签页功能展示
```

🎉🎉🎉

已发包 [use-switch-tabs](https://github.com/yunsii/use-switch-tabs)，同时通过 use-switch-tabs 进行了重构。 —— 2021.06.19

## 分支说明

### [`v4-legacy`](https://github.com/yunsii/ant-design-pro-plus/tree/v4-legacy)

基于 `ant design pro` V4 版本的功能分支。

### [`v2-legacy`](https://github.com/yunsii/ant-design-pro-plus/tree/v2-legacy)

原仓库名称 `ant design pro v2 plus` ，代码移到此分支。重命名为 `ant design pro plus` 后，在 `master` 分支跟进 `ant design pro` 中的更新。

### [`umi/v2.x`](https://github.com/yunsii/ant-design-pro-plus/tree/umi/v2.x)

基于 umi@&#8203;2.x 的功能实现。

## Q & A

### 标签页功能从 ant design pro V4 迁移到 V5

Pro V5 在架构上有了较大的重构，通过 Umi 的插件机制屏蔽了更多的实现细节。不过得益于此前已将标签页核心功能发包 [use-switch-tabs](https://github.com/yunsii/use-switch-tabs)，故需要做得工作并不多。但是值得注意的一点是需要 `@umijs/plugin-layout` 的版本不能低于 `0.18.0`，详见[此讨论](https://github.com/umijs/plugins/issues/744)，因此 `@umijs/preset-react` 版本不能低于 `1.8.28`，详见[此更新](https://github.com/umijs/plugins/compare/@umijs/preset-react@1.8.27...@umijs/preset-react@1.8.28)。

最后，实现入口改到了 [app.ts](./src/app.tsx)，通过此入口可查看具体实现，相关 UI 组件较于 V4 基本没有改动。

---

补充说明：由于 V5 开始使用了扁平化的路由，以及当前 `use-switch-tabs` 做了 redirect 的适配，所以在使用页面标签化的功能的时候注意 `originalRoutes` 需要处理得当，避免 `isSwitchTab` 判断异常。

### 基于 `children` 的标签页功能实现从 umi@&#8203;2.x 升级到 umi@&#8203;3.x 的问题

相关讨论和分析参考 [umijs/umi#4425](https://github.com/umijs/umi/issues/4425)，最终分析得出了导致暂时无法升级的[根本原因](https://github.com/umijs/umi/issues/4425#issuecomment-770360267)，PR [umijs/umi#6101](https://github.com/umijs/umi/pull/6101) 修复了该问题，但需要使用 umi@&#8203;3.3.8 以上版本。

### 性能问题

可使用 [`withSwitchTab`](/src/pages/SwitchTabsDemos/Query/index.tsx#L6) 函数包装页面组件，避免页面反复渲染。值得注意的是，如果在页面中使用了一些特殊的状态，如 `useLocation` 这样的 hook，会导致无法优化。如果一定要用的话，可自行使用 `useMemo` 优化。

### 标签闪烁的问题

在切换的时候标签会出现闪烁的情况 [#5](https://github.com/yunsii/ant-design-pro-plus/issues/5)，刚开始还没在意，后来发现了原因，参考 [ant-design/ant-design#25343](https://github.com/ant-design/ant-design/issues/25343)。

### 预览页面不能使用动态路由

由于是部署到 Github Pages，配置了 [`exportStatic`](https://v2.umijs.org/zh/config/#exportstatic)，故无法使用形如 `/result/:id` 的动态路由。又通过 `isProductionEnv` 变量避免登录逻辑等问题，如果有接口报错可忽略，重点是功能实现 \_(:з」∠)\_
