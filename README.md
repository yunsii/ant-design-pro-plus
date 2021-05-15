<h1 align="center">Ant Design Pro Plus</h1>

<div align="center">

官方说明请参阅 [/master/README.zh-CN](https://github.com/ant-design/ant-design-pro/blob/master/README.zh-CN.md)

![github pages](https://github.com/theprimone/ant-design-pro-plus/workflows/github%20pages/badge.svg) [![GitHub license](https://img.shields.io/github/license/theprimone/ant-design-pro-plus.svg)](https://github.com/theprimone/ant-design-pro-plus/blob/master/LICENSE) [![GitHub stars](https://img.shields.io/github/stars/theprimone/ant-design-pro-plus.svg)](https://github.com/theprimone/ant-design-pro-plus/stargazers) [![GitHub issues](https://img.shields.io/github/issues/theprimone/ant-design-pro-plus.svg)](https://github.com/theprimone/ant-design-pro-plus/issues) [![GitHub commit activity](https://img.shields.io/github/commit-activity/m/theprimone/ant-design-pro-plus.svg)](https://github.com/theprimone/ant-design-pro-plus/commits/master)

</div>

<!-- ![GudmSe.png](https://s1.ax1x.com/2020/03/30/GudmSe.png) -->
<img alt="Snapshot" src="static/snapshot.svg" width="100%" />

## ✨ 基于路由的页面标签化展示

**兼容性：`^umi@2.0.0 | ^umi@3.3.8`**

- 支持页面的嵌套路由渲染
- 两种标签页模式可选
  - 基于路由，每个路由只渲染一个标签页
  - 基于路由参数，计算出每个路由的所有参数的哈希值，不同的哈希值渲染不同的标签页
- 可固定标签栏
- [快捷操作](/src/typings.d.ts#L35)
  - 刷新标签页 - `window.reloadTab()`
  - 关闭标签页 - `window.closeTab()`
  - 返回之前标签页 - `window.goBackTab()`
  - 关闭并返回之前标签页 - `window.closeAndGoBackTab()`
- `reloadable`，支持在头部操作栏刷新当前标签页
- `follow`，路由定义中新增配置，默认打开方式是添加到所有标签页最后面，可通过配置该属性，使得一个标签页在 `follow` 指定的标签页后面打开（可参考查询页 Demo）
- `persistent`，支持页面刷新之后恢复上次的标签页状态

注：返回默认只会返回上次的路由，所以如果上次的路由没有关闭，会在两个路由之前反复横跳，当删除上次打开的标签页之后再调用该返回方法时只会打印警告。

### 代码结构

```
├── config
│   └── defaultSettings.ts   # 系统风格配置，新增关于 RouteTabs 的配置
├── src
│   └── components
│       └── RouteTabs        # 核心组件
│   └── hooks
│       └── common           # 使用到的 hook - `useReallyPrevious`
│   └── layouts
│       └── RouteTabsLayout  # 路由加载
│   └── pages
│       └── RouteTabsDemo    # 标签页功能展示
```

## 分支说明

### [`v2-legacy`](https://github.com/theprimone/ant-design-pro-plus/tree/v2-legacy)

原仓库名称 `ant design pro v2 plus` ，代码移到此分支。重命名为 `ant design pro plus` 后，在 `master` 分支跟进 `ant design pro` 中的更新。

### [`umi/v2.x`](https://github.com/theprimone/ant-design-pro-plus/tree/umi/v2.x)

基于 umi@&#8203;2.x 的功能实现。

## Q & A

### 基于 `children` 的标签页功能实现从 umi@&#8203;2.x 升级到 umi@&#8203;3.x 的问题

相关讨论和分析参考 [umijs/umi#4425](https://github.com/umijs/umi/issues/4425)，最终分析得出了导致暂时无法升级的[根本原因](https://github.com/umijs/umi/issues/4425#issuecomment-770360267)，PR [umijs/umi#6101](https://github.com/umijs/umi/pull/6101) 修复了该问题，但需要使用 umi@&#8203;3.3.8 以上版本。

### 性能问题

可使用 [`withRouteTab`](/src/components/RouteTabs/utils.tsx#L180) 函数包装页面组件，避免页面反复渲染。值得注意的是，如果在页面中使用了一些特殊的状态，如 `useLocation` 这样的 hook，会导致无法优化。如果一定要用的话，可自行使用 `useMemo` 优化。

### 标签闪烁的问题

在切换的时候标签会出现闪烁的情况 [#5](https://github.com/theprimone/ant-design-pro-plus/issues/5)，刚开始还没在意，后来发现了原因，参考 [ant-design/ant-design#25343](https://github.com/ant-design/ant-design/issues/25343)。

### 预览页面不能使用动态路由

由于是部署到 Github Pages，配置了 [`exportStatic`](https://v2.umijs.org/zh/config/#exportstatic)，故无法使用形如 `/result/:id` 的动态路由。又通过 `isProductionEnv` 变量避免登录逻辑等问题，如果有接口报错可忽略，重点是功能实现 \_(:з」∠)\_
