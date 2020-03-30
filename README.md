<h1 align="center">Ant Design Pro Plus</h1>

<div align="center">

官方说明请参阅 [/master/README.zh-CN](https://github.com/ant-design/ant-design-pro/blob/master/README.zh-CN.md)

[![GitHub license](https://img.shields.io/github/license/zpr1g/ant-design-pro-plus.svg)](https://github.com/zpr1g/ant-design-pro-plus/blob/master/LICENSE) [![GitHub stars](https://img.shields.io/github/stars/zpr1g/ant-design-pro-plus.svg)](https://github.com/zpr1g/ant-design-pro-plus/stargazers) [![GitHub issues](https://img.shields.io/github/issues/zpr1g/ant-design-pro-plus.svg)](https://github.com/zpr1g/ant-design-pro-plus/issues) [![GitHub commit activity](https://img.shields.io/github/commit-activity/m/zpr1g/ant-design-pro-plus.svg)](https://github.com/zpr1g/ant-design-pro-plus/commits/master)

</div>

原仓库名称 `ant design pro v2 plus` ，代码移到分支 [`v2`](https://github.com/zpr1g/ant-design-pro-plus/tree/v2)。重命名为 `ant design pro plus` 后，在 `master` 分支跟进 `ant design pro` 中的更新。

## ✨ 新增特性

- [基于路由实现标签页切换](#基于路由实现标签页切换)

## 基于路由实现标签页切换

* 两种标签页模式可选
  * 基于路由，每个路由只渲染一个标签页
  * 基于路由参数，计算出每个路由的所有参数的哈希值，不同的哈希值渲染不同的标签页
* 固定标签栏

代码结构：

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

新增依赖

* @umijs/hooks
* fast-deep-equal
* hash-string
