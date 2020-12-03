<h1 align="center">Ant Design Pro Plus</h1>

<div align="center">

官方说明请参阅 [/master/README.zh-CN](https://github.com/ant-design/ant-design-pro/blob/master/README.zh-CN.md)

![github pages](https://github.com/zpr1g/ant-design-pro-plus/workflows/github%20pages/badge.svg) [![GitHub license](https://img.shields.io/github/license/zpr1g/ant-design-pro-plus.svg)](https://github.com/zpr1g/ant-design-pro-plus/blob/master/LICENSE) [![GitHub stars](https://img.shields.io/github/stars/zpr1g/ant-design-pro-plus.svg)](https://github.com/zpr1g/ant-design-pro-plus/stargazers) [![GitHub issues](https://img.shields.io/github/issues/zpr1g/ant-design-pro-plus.svg)](https://github.com/zpr1g/ant-design-pro-plus/issues) [![GitHub commit activity](https://img.shields.io/github/commit-activity/m/zpr1g/ant-design-pro-plus.svg)](https://github.com/zpr1g/ant-design-pro-plus/commits/master)

</div>

![GudmSe.png](https://s1.ax1x.com/2020/03/30/GudmSe.png)

原仓库名称 `ant design pro v2 plus` ，代码移到分支 [`v2-legacy`](https://github.com/zpr1g/ant-design-pro-plus/tree/v2-legacy)。重命名为 `ant design pro plus` 后，在 `master` 分支跟进 `ant design pro` 中的更新。

注：预览由于是部署到 Github Pages ，配置了 [`exportStatic`](https://v2.umijs.org/zh/config/#exportstatic) ，故无法使用形如 `/result/:id` 的动态路由。又通过 `isProductionEnv` 变量避免登录逻辑等问题，如果有接口报错可忽略，重点是标签页功能 \_(:з」∠)\_

## ✨ 新增特性

- [基于路由实现标签页切换](#基于路由实现标签页切换)

## 基于路由实现标签页切换

- 两种标签页模式可选
  - 基于路由，每个路由只渲染一个标签页
  - 基于路由参数，计算出每个路由的所有参数的哈希值，不同的哈希值渲染不同的标签页
- 可固定标签栏
- [快捷操作](/src/typings.d.ts#L35)
  - 刷新标签页 - `window.reloadTab()`
  - 关闭标签页 - `window.closeTab()`
  - 返回之前标签页 - `window.goBackTab()`
  - 关闭并返回之前标签页 - `window.closeAndGoBackTab()`
- `followPath`，路由定义中新增配置，默认打开方式是添加到所有标签页最后面，可通过配置该属性，使得一个标签页在 `followPath` 指定的标签页后面打开

注：返回默认只会返回上次的路由，所以如果上次的路由没有关闭，会在两个路由之前反复横跳，当删除上次打开的标签页之后再调用该返回方法时只会打印警告。

### 代码结构

```
├── config
│   └── defaultSettings.ts   # 关于 RouteTabs 的配置
├── src
│   └── components
│       └── RouteTabs        # 核心组件
│   └── hooks
│       └── common           # 使用到的 hook - `useReallyPrevious`
│   └── layouts
│       └── RouteTabsLayout  # 菜单加载
│   └── pages
│       └── RouteTabsDemo    # 标签页功能展示
```

### 新增依赖

- ahooks
- fast-deep-equal
- hash-string

## Q&A

### 性能问题

可使用 [`withRouteTab`](/src/components/RouteTabs/utils.tsx#L180) 函数包装页面组件，避免页面反复渲染。值得注意的是，如果在页面中使用了一些特殊的状态，如 `useLocation` 这样的 hook ，会导致无法优化。如果一定要用的话，只能自行使用 `useMemo` 优化了。

### 关于 umi 3.x

在分支 `feat/umi3` 中尝试升级后发现基于路由的标签页存在极大的问题。参考我在 issue [想了解一下 umi 2 与 3 对路由组件处理的异同](https://github.com/umijs/umi/issues/4425) 中的相关分析。这里说明一下：

**umi 2** 是将所有子路由通过 [`renderRoutes()`](https://github.com/umijs/umi/blob/c0a2ac5aa9/packages/umi/src/renderRoutes.js#L129) 打包进 `react-router` 中的 `Switch` 中，这就使得 `BasicLayout` 下的所有标签页都能拿到一个**完整的** `Switch` 组件。

**umi 3** 当前内部实现了一个 [`Switch`](https://github.com/umijs/umi/blob/master/packages/renderer-react/src/renderRoutes/Switch.tsx#L2) 组件，通过 `__RouterContext` 消费当前 `location` 状态，遍历所有子组件，只通过 `React.cloneElement()` 创建匹配的**唯一路由组件**，这就导致了 `BasicLayout` 下的所有标签页在切换时都会全部卸载再加载为当前路由的页面，故该方案暂时无法使用。

![IMG_0013.PNG](https://i.loli.net/2020/04/17/W3gOx26dFb8Qjsc.png)

在上述 issue 中的[最新回复](https://github.com/umijs/umi/issues/4425#issuecomment-735339723)，恍然大悟的一个骚操作，通过 `chidlren.props.children` 结合 react-router 替换到 umi 提供的 Switch 组件。

### 标签闪烁的问题

在切换的时候标签会出现闪烁的情况，感谢这个 [issue](https://github.com/zpr1g/ant-design-pro-plus/issues/5) 提出的这个问题。刚开始还没在意，后来发现了原因，参考 [Tabs 内容过大在切换时会出现内容闪烁，但是 antd@4.3.1 不会](https://github.com/ant-design/ant-design/issues/25343)。
