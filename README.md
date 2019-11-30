<h1 align="center">Ant Design Pro V2 Plus</h1>

<div align="center">

官方说明请参阅 [/v2/README.zh-CN](https://github.com/ant-design/ant-design-pro/blob/v2/README.zh-CN.md)


[![GitHub license](https://img.shields.io/github/license/theprimone/ant-design-pro-v2-plus.svg)](https://github.com/theprimone/ant-design-pro-v2-plus/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/theprimone/ant-design-pro-v2-plus.svg)](https://github.com/theprimone/ant-design-pro-v2-plus/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/theprimone/ant-design-pro-v2-plus.svg)](https://github.com/theprimone/ant-design-pro-v2-plus/issues)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/theprimone/ant-design-pro-v2-plus.svg)](https://github.com/theprimone/ant-design-pro-v2-plus/commits/master)

</div>

![v2-plus.png](https://i.loli.net/2019/11/30/uqOm4T32nADViZh.png)

预览：[https://theprimone.top/ant-design-pro-v2-plus](https://theprimone.top/ant-design-pro-v2-plus)

为了实现基于 Github Pages 的在线预览的功能，仅将**功能示例**和 **Dashboard** 下的**分析页**数据写到了代码中，以便查看页面效果。

官方仓库没有针对部署到非根目录情况下的登录重定向，已提交 pull request [fix: redirect with deploy on non-root path](https://github.com/ant-design/ant-design-pro/pull/4887)。

## ✨新增特性

* [ChildrenTabs 根据 children 实现标签页切换](#ChildrenTabs-根据-children-实现标签页切换)
* [PageTabs 基于路由实现标签页切换](#PageTabs-基于路由实现标签页切换)
* [StandardTable 增强](#StandardTable-增强)

## 📌新增依赖

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

此外，还在 [`RightContent`](./src/components/GlobalHeader/RightContent.js#L140) 中实现了刷新当前标签页的功能，默认开启。如果不需要，可在 [defaultSettings](/src/defaultSettings.js) 设置 `reloadTab` 为 `false` 即可。

### PageTabs 基于路由实现标签页切换

`router.push()` 会注入该路由的 component ，所以根据条件处理该 children component 即可。

可通过 [defaultSettings](/src/defaultSettings.js) 中的 `pageTabs` 配置是否开启标签页功能，标签页功能可选两种模式，一是**路由模式**，使用路由定义作为标签页 id ，类似 `'/path/:name'` 这样的动态路由只会打开一个标签页。也可选择**路径模式**，使用页面路径作为标签页 id，这样动态路由则会打开不同的标签页，也因此可能需要动态设置标签页标题，可通过配置 [`setPathName(pathID: string, predefinePathName: string, params: any, location: RouteData)`](/src/components/PageTabs/index.tsx#L43) 函数来处理。默认为**路由模式**。

关注标签页实现的可参考[基于 ant design pro 2.3.1 页面标签化展示的研究与实现](https://theprimone.top/2019/07/06/2019-07-06-ant-design-pro-tabs-page-by-route)。

#### 性能问题

由于是通过路由的方式实现的标签页的功能，测试发现会出现一定的性能问题，可参考 [issue #2](https://github.com/theprimone/ant-design-pro-v2-plus/issues/2) 。

之前的方案有个严重的问题，因为是通过判断一个页面有没有子路由的方式来决定是否刷新页面，这会导致动态路由，如 `/page/:name` ，无法正确刷新，还有查询参数和 `state` 等的变化都无法触发页面刷新。当然如果没有动态路由是一点影响也没有。现在能想到的最佳方法是使用高阶组件将页面组件包裹一层判断是否需要刷新，具体实现 [`withRoutePage`](/src/utils/enhanceUtils.tsx#L38) 。

这样的话只需要使用 `withRoutePage` 包装一下页面组件即可，参考 [CurdPage/index.js](/src/pages/Enhance/CurdPage/index.js) 。 另外，由于 `withRoutePage` 只是通过注入属性是否变化来判断是否刷新，当使用类似表单组件的 `Form.create()` 包装页面组件时，由于其只是注入方法，所以如果在其后使用 `withRoutePage` 包装会导致页面不会正常刷新的问题，遇到这种情况，将 `withRoutePage` 层级降低即可。

```tsx
// 页面不能正常刷新
@connect(
  // ...
)
@Form.create()
@withRoutePage
class Page extends React.Component<any, any> {
  // ...
}
```

```tsx
// 页面正常刷新
@connect(
  //...
)
@withRoutePage
@Form.create()
class Page extends React.Component<any, any> {
  // ...
}
```

#### 另一些值得注意的问题

##### 1. 关于 `umi` 注入的 `children`

其实就是 `react-router-dom` 的 `Switch` 组件。

##### 2. `window.location` 和 `withRouter` 注入的 `location` 的区别

在实现**路径模式**的时候注意到

* `window.location.pathname === '/ant-design-pro-v2-plus/enhance/curd-page'`
* `location.pathname === '/enhance/curd-page'`

由于我默认部署的不是根目录，所以发现了这一区别。

##### 3. `withRouter` 注入的 `match` 的问题

为了能使**路径模式**，能动态配置标签页标题。本来以为可以在 [`PageTabs`](/src/components/PageTabs/index.tsx#L71) 中直接使用注入 `match` 对象来获取动态路由中的参数，结果获取到的都是根路由的 `match` 对象，所以只能使用 `path-to-regexp` 的 `match` 方法了。猜测可能是由于第一个问题中提到的注入的都是 `Switch` 组件有关，当前的 `PageTabs` 组件还是在根路由的渲染之中。

### <span style="color:red">注意事项</span>

从服务器获取菜单时，我的做法是直接返回路由的结构，也就是直接修改 [`routes`](/src/models/menu.js#L113) ，由于当前实际开发的项目只保存并返回了路由的 `name` 、 `path` 、 `routes` 和 `authority` ，所以还需要遍历所有的配置式路由（简单起见，可从[面包屑映射](/src/models/menu.js#L116)中取值即可），并注入以下四个属性：

* `icon`
* `component`
* `hideInMenu`
* `hideChildrenInMenu`

以保证菜单和标签页功能的正常使用。

### StandardTable 增强

* 默认开启 hideOnSinglePage
* 间隔行着色
* 多选功能可选，通过 `checkable` 控制

### 基础增删改查页面

![K1TFO0.png](https://s2.ax1x.com/2019/10/21/K1TFO0.png)

<p align='center'>表格型增删改查</p>

![K1TEwT.png](https://s2.ax1x.com/2019/10/21/K1TEwT.png)

<p align='center'>列表型增删改查</p>
<p align='center'>自定义 <code>renderItem</code> ，这里自定义为 <code>Card</code></p>

如果需要新建一个类似[**基础增删改查**](src/pages/Enhance/CurdPage)的页面，快速开发指南：

* 配置页面路由
* 对接增删改查接口
* 基于 dva-base-models 配置，model ，见 [base-models/curd.ts](/src/base-models/curd.ts)，主要是根据接口实现 [src/utils/model.tsx](src/utils/model.tsx) 中的 `getData` 和 `getList` 、 `isResponseOk` 方法，以便 model 能正确获取并处理相关数据
* 配置对象表单数据映射 map.js （参考 [CurdPage/map.js](src/pages/Enhance/CurdPage/map.js) ），用于对象的详情，新建和编辑对象
* 如需配置表单相关全局参数，如图片上传配置，默认类型提示等，可从 `antd-curd` 中导出 `formMateConfig` 进行配置（参考 [global.js](src/global.js#L4) ），**如果配置图片上传相关参数后，选择图片后即上传**，如果不需要，可不配置相关属性，在提交表单时再做上传图片的处理。另，如果需要**单独使用 `antd-form-mate` 组件**，可全局引入 `antd-form-mate` 并配置即可， `antd-curd` 的表单配置会复用该配置。
* 配置页面 index.js （参考 [CurdPage/index.js](src/pages/Enhance/CurdPage/index.js) ），主要是配置查询面板和数据列模型

通过配置化的方式快速实现了一个增删改查页面的需求，让开发者可以尽量少的关心底层的逻辑实现。同时也提供了较为灵活的 API 去扩展特定页面的特定需求。更多参数配置，可到 [antd-curd](https://github.com/theprimone/antd-curd) 中查看。
