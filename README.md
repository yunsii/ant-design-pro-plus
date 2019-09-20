<h1 align="center">Ant Design Pro V2 Plus</h1>

<div align="center">

官方说明请参阅 [/v2/README.zh-CN](https://github.com/ant-design/ant-design-pro/blob/v2/README.zh-CN.md)

</div>

![ant-design-pro-v2-plus-screenshot.png](https://s2.ax1x.com/2019/07/27/eKKtG8.png)

[![GitHub license](https://img.shields.io/github/license/theprimone/ant-design-pro-v2-plus.svg)](https://github.com/theprimone/ant-design-pro-v2-plus/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/theprimone/ant-design-pro-v2-plus.svg)](https://github.com/theprimone/ant-design-pro-v2-plus/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/theprimone/ant-design-pro-v2-plus.svg)](https://github.com/theprimone/ant-design-pro-v2-plus/issues)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/theprimone/ant-design-pro-v2-plus.svg)](https://github.com/theprimone/ant-design-pro-v2-plus/commits/master)

预览：[https://theprimone.top/ant-design-pro-v2-plus](https://theprimone.top/ant-design-pro-v2-plus)

为了实现基于 Github Pages 的在线预览的功能，将**功能示例**和 **Dashboard** 下的**分析页**数据写到了代码中，以便查看页面效果。

官方仓库没有针对部署到非根目录情况下的登录重定向，已提交 pull request [fix: redirect with deploy on non-root path](https://github.com/ant-design/ant-design-pro/pull/4887)。

## ✨新增特性

* [ChildrenTabs 根据 children 实现标签页切换](#ChildrenTabs-根据-children-实现标签页切换)
* [PageTabs 基于路由实现标签页切换](#PageTabs-基于路由实现标签页切换)
* [StandardTable 增强](#StandardTable-增强)

## 📌新增依赖

* [react-amap-plugin-custom-geolocation](https://github.com/theprimone/react-amap-plugin-custom-geolocation) 自定义高德地图定位组件
* [dva-base-models](https://github.com/theprimone/dva-base-models) 基于 dva 的基础 model 配置
* [antd-form-mate](https://github.com/theprimone/antd-form-mate) 基于 ant design 的表单组件
* [antd-curd](https://github.com/theprimone/antd-curd) 基于 ant design 的增删改查页面组件

## ☁️功能实现概述

除 UI 组件外，尽量使用 TypeScript 开发。

### ChildrenTabs 根据 children 实现标签页切换

可通过配置实现 children 的标签页展示。

#### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| activeKey | 激活 tab 的唯一标识 | string | - |
| activeTitle | 激活 tab 展示的标题 | string | - |
| handleTabChange | 切换 tab 时的回调函数。设置新的的 activeKey | (keyToSwitch: string, activedTabs: any[]) => void; | - |
| handleRemoveTab | 删除 tab 时的回调函数。可直接设置新的 activeKey 为相邻的 nextTabKey | (removeKey: string, nextTabKey: string, activedTabs: any[]) => void | - |
| children | 与当前 tab 对应的 children | JSX.Element | - |
| extraTabProperties | 当前 tab 的扩展属性 | {} | {} |
| tabsConfig | 可自行配置 Tabs 属性，除 `activeKey`， `onEdit`， `onChange` 外 | TabsProps | - |

此外，还在 [`RightContent`](./src/components/GlobalHeader/RightContent.js#L140) 中实现了刷新当前页签的功能，默认开启。如果不需要，可在 [defaultSettings](/src/defaultSettings.js) 设置 `reloadTab` 为 `false` 即可。

### PageTabs 基于路由实现标签页切换

`router.push()` 会注入该路由的 component ，所以根据条件处理该 children component 即可。

可通过 [defaultSettings](/src/defaultSettings.js) 中的 `pageTabs` 配置是否开启标签页功能，默认开启。

关注实现的可参考[基于 ant design pro 2.3.1 页面标签化展示的研究与实现](https://theprimone.top/2019/07/06/2019-07-06-ant-design-pro-tabs-page-by-route)

### StandardTable 增强

* 默认开启 hideOnSinglePage
* 间隔行着色
* 多选功能可选，通过 `checkable` 控制

### 基础增删改查页面

[![eA1tzR.png](https://s2.ax1x.com/2019/07/23/eA1tzR.png)](https://imgchr.com/i/eA1tzR)

<p align='center'>表格型增删改查</p>

[![eA1UQ1.png](https://s2.ax1x.com/2019/07/23/eA1UQ1.png)](https://imgchr.com/i/eA1UQ1)

<p align='center'>列表型增删改查</p>
<p align='center'>自定义 <code>renderItem</code> ，这里自定义为 <code>Card</code></p>

前置依赖：

* [dva-base-models](#📌新增依赖)
* [antd-curd](#📌新增依赖)

如果需要新建一个类似[**基础增删改查**](src/pages/Enhance/CurdPage)的页面，快速开发指南：

* 配置页面路由
* 对接增删改查接口
* 基于 dva-base-models 配置，model ，见 [base-models/curd.ts](/src/base-models/curd.ts)，主要是根据接口实现 [src/utils/model.tsx](src/utils/model.tsx) 中的 `getData` 和 `getTableList` 、 `isResponseOk` 方法，以便 model 能正确获取并处理相关数据
* 配置对象表单数据映射 map.js （参考 [CurdPage/map.js](src/pages/Enhance/CurdPage/map.js) ），用于对象的详情，新建和编辑对象
* 如需配置表单相关全局参数，可从 `antd-curd` 中导出 `FormMateConfig` 进行配置（参考 [global.js](src/global.js#L4) ）
* 配置页面 index.js （参考 [CurdPage/index.js](src/pages/Enhance/CurdPage/index.js) ），主要是配置查询面板和数据列模型

通过配置化的方式快速实现了一个增删改查页面的需求，让开发者可以尽量少的关心底层的逻辑实现。同时也提供了较为灵活的 API 去扩展特定页面的特定需求。更多参数配置，可到 [antd-curd](https://github.com/theprimone/antd-curd) 中查看。
