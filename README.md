<h1 align="center">Ant Design Pro Plus</h1>

<div align="center">

官方说明请参阅 [/master/README.zh-CN](https://github.com/ant-design/ant-design-pro/blob/master/README.zh-CN.md)

[![GitHub license](https://img.shields.io/github/license/zpr1g/ant-design-pro-plus.svg)](https://github.com/zpr1g/ant-design-pro-plus/blob/master/LICENSE) [![GitHub stars](https://img.shields.io/github/stars/zpr1g/ant-design-pro-plus.svg)](https://github.com/zpr1g/ant-design-pro-plus/stargazers) [![GitHub issues](https://img.shields.io/github/issues/zpr1g/ant-design-pro-plus.svg)](https://github.com/zpr1g/ant-design-pro-plus/issues) [![GitHub commit activity](https://img.shields.io/github/commit-activity/m/zpr1g/ant-design-pro-plus.svg)](https://github.com/zpr1g/ant-design-pro-plus/commits/master)

</div>

![GudmSe.png](https://s1.ax1x.com/2020/03/30/GudmSe.png)

原仓库名称 `ant design pro v2 plus` ，代码移到分支 [`v2`](https://github.com/zpr1g/ant-design-pro-plus/tree/v2)。重命名为 `ant design pro plus` 后，在 `master` 分支跟进 `ant design pro` 中的更新。

注：预览由于是部署到 Github Pages ，所以使用 isProductionEnv() 方法避免登录逻辑等问题，如果有接口报错可忽略，重点是标签页功能 \_(:з」∠)\_

## ✨ 新增特性

- [基于路由实现标签页切换](#基于路由实现标签页切换)

## 基于路由实现标签页切换

* 两种标签页模式可选
  * 基于路由，每个路由只渲染一个标签页
  * 基于路由参数，计算出每个路由的所有参数的哈希值，不同的哈希值渲染不同的标签页
* 可固定标签栏
* 快捷操作
  * 刷新当前标签页 - `window.reloadCurrentTab()`
  * 返回之前标签页 - `window.goBackTab()`
  * 关闭并返回之前标签页 - `window.closeAndGoBackTab()`

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

* @umijs/hooks
* fast-deep-equal
* hash-string

### 性能问题

原以为仍然可通过之前像 `v2` 那样的高阶组件避免标签页的无用渲染，但是几经尝试，都无法在高阶函数中实现，可见 [`withRouteTab`](/src/components/RouteTabs/utils.tsx#L181) 方法。临时的解决方案是在每个页面中自行使用 `useMemo` 优化性能，参考自 [issue#15156](https://github.com/facebook/react/issues/15156#issuecomment-474590693)。
