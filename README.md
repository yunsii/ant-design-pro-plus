<h1 align="center">Ant Design Pro V2 Plus</h1>

<div align="center">

官方说明请参阅 [/v2/README.zh-CN](https://github.com/ant-design/ant-design-pro/blob/v2/README.zh-CN.md)

</div>

![ant-design-pro-v2-plus-screenshot.png](https://s2.ax1x.com/2019/07/21/eCpFEj.png)

[![GitHub license](https://img.shields.io/github/license/theprimone/ant-design-pro-v2-plus.svg)](https://github.com/theprimone/ant-design-pro-v2-plus/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/theprimone/ant-design-pro-v2-plus.svg)](https://github.com/theprimone/ant-design-pro-v2-plus/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/theprimone/ant-design-pro-v2-plus.svg)](https://github.com/theprimone/ant-design-pro-v2-plus/issues)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/theprimone/ant-design-pro-v2-plus.svg)](https://github.com/theprimone/ant-design-pro-v2-plus/commits/master)

预览：[https://theprimone.top/ant-design-pro-v2-plus](https://theprimone.top/ant-design-pro-v2-plus)

为了实现基于 Github Page 的在线预览的功能，将**功能示例**和 **Dashboard** 下的**分析页**数据写到了代码中，以便查看页面效果。

由于是部署到非根目录，发现配置了 `base` 后，仅在页面内部路由能正常访问，如果直接使用完整的页面路由会导致访问失败。已反馈到 umi 的 issue [项目部署到非根目录，如何配置，让url匹配上？](https://github.com/umijs/umi/issues/231)，待解决。同时，发现了官方仓库没有针对部署到非根目录情况下的登录重定向，已提交 pull request [fix: redirect with deploy on non-root path](https://github.com/ant-design/ant-design-pro/pull/4860)。

## 新增特性✨

* [ChildrenTabs 根据 children 实现标签页切换](#ChildrenTabs-根据-children-实现标签页切换)
* [PageTabs 基于路由实现标签页切换](#PageTabs-基于路由实现标签页切换)
* [StandardTable 增强](#StandardTable-增强)
* [TableList 数据列表渲染](#TableList-数据列表渲染)
* [antd-form-pro 表单功能增强](#antd-form-pro-表单功能增强)
* [DetailFormDrawer 详情抽屉](#DetailFormDrawer-详情抽屉)
* [DetailFormModal 详情模态框](#DetailFormModal-详情模态框)
* [QueryPanel 查询面板](#QueryPanel-查询面板)
* [base-models/curd 生成基础增删改查 model](#base-models/curd-生成基础增删改查-model)
* [BasePage/Curd 基础增删改查页面](#BasePage/Curd-基础增删改查页面)

## 脚本升级指南

1. 提交自己项目的所有修改
2. 在 [defaultSettings](/src/defaultSettings.js) 中添加 `pageTabs` （不配置默认为 `true` ） 和 `proRootPath` （不配置默认为 `'/'`，当把 `BasicLayout` 作为子路由时需要配置 ） 配置。已配置直接下一步
3. 安装脚本依赖 `fs-extra` ： `npm install -g fs-extra` 。已安装直接下一步
4. 在 [/scripts/features/copyConfig.js](/scripts/features/copyConfig.js) 选择需要的相关特性（不需要的直接注释），并配置好 `destinationRootPath` ，即自己项目所在的根目录（src 上一级）。
5. 运行 [/scripts/features/immigrate.js](/scripts/features/immigrate.js) ： `node immigrate.js`
6. 对比升级的变化，主要是 `BasicLayout` ，自行解决相关冲突代码。


## 功能实现概述☁️

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

### PageTabs 基于路由实现标签页切换

`router.push()` 会注入该路由的 component ，所以根据条件处理该 children component 即可。

可通过 [defaultSettings](/src/defaultSettings.js) 中的 `pageTabs` 配置是否开启标签页功能，默认开启。

关注实现的可参考[基于 ant design pro 2.3.1 页面标签化展示的研究与实现](https://theprimone.top/2019/07/06/2019-07-06-ant-design-pro-tabs-page-by-route)

### StandardTable 增强

* 默认开启 hideOnSinglePage
* 间隔行着色
* 多选功能可选，通过 `checkable` 控制

### TableList 数据列表渲染

与 StandardTable 类似，只是将容器从 [Table](https://ant.design/components/table-cn/) 替换为 [List](https://ant.design/components/list-cn/) ，并自定义组件（比如 [Card](https://ant.design/components/card-cn/) ）渲染每条记录。

### antd-form-pro 表单功能增强

可配置化实现表单功能。支持的组件与配置方式可参考 [map.js](/src/pages/Enhance/CurdPage/map.js) 。

#### 可配置类型

1. custom 自定义组件类型
2. date 日期
3. datetime 日期时间
4. datetime-range 时间范围
5. number
6. select
7. textarea
8. password
9. picture
10. switch
11. slider 滑动输入
12. file-dragger
13. string 默认类型

#### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 上述类型 | string | 'string' |
| field | 字段名 | string | - |
| formItemProps | Form.Item 支持的配置，新增 `dense` 属性配置 Form.Item `marginBottom` 为 0 | 扩展 [FormItemProps](https://ant.design/components/form-cn/#Form.Item) | - |
| fieldProps | 字段值配置  | [GetFieldDecoratorOptions](https://ant.design/components/form-cn/#getFieldDecorator(id,-options)-%E5%8F%82%E6%95%B0) | - |
| component | 自定义的组件，仅当 `type` 为 `'custom'` 时可用 | React.ElementType | - |


### DetailFormDrawer 详情抽屉

基于 antd-form-pro 实现的详情表单抽屉，参数定义可参见 [DetailFormDrawer/index.d.ts](/src/components/DetailFormDrawer/index.d.ts) 。

### DetailFormModal 详情模态框

基于 antd-form-pro 实现的详情模态框，参数定义可参见 [DetailFormModal/index.d.ts](/src/components/DetailFormModal/index.d.ts) 。

### QueryPanel 查询面板

基于 antd-form-pro 实现的查询面板组件，具体实现可参考 [QueryPanel/index.js](/src/components/QueryPanel/index.js) ，只需传入表单配置和 `onSearch` 方法即可使用。同时提供了重置表单后的 `onReset` 函数。参数定义可参见 [QueryPanel/index.d.ts](/src/components/QueryPanel/index.d.ts) 。

### base-models/curd 生成基础增删改查 model

通过 `namespace` 和 `modelConfig` 即可配置一个基础的增删改查 model ，参考 [base-models/curd.ts](/src/base-models/curd.ts) 。进阶使用参考 [Enhance/models/curdPage.ts](/src/pages/Enhance/models/curdPage.ts)

### BasePage/Curd 基础增删改查页面

![basic.png](https://s2.ax1x.com/2019/07/21/eCpFEj.png)

<p align='center'>表格型增删改查</p>

![custom.png](https://s2.ax1x.com/2019/07/21/eCpcxf.png)

<p align='center'>列表型增删改查</p>
<p align='center'>自定义 <code>renderItem</code> ，这里自定义为 <code>Card</code></p>

前置工具及组件：

* base-models/curd
* antd-form-pro
* DetailFormDrawer
* DetailFormModal
* QueryPanel
* StandardTable
* TableList

如果需要新建一个类似**基础增删改查**的页面，快速开发指南：

* 配置页面路由
* 编写接口增删改查 service
* 基于 base-models/curd 配置 model
* 根据接口实现 [src/utils/model.tsx](src/utils/model.tsx) 中的 `getData` 和 `getTableList` 方法，以便 model 能正确获取相关数据
* 配置对象表单数据映射 map.js
* 配置页面 index.js ，主要是配置查询面板和数据列模型

具体使用参考 [src/pages/Enhance/CurdPage](src/pages/Enhance/CurdPage) 的实现。

相较于之前一个个页面去复制粘贴修改代码，通过配置化的方式即实现了快速实现页面的需求，同时也提供了较为灵活的 API 去扩展特定页面的特定需求。另外，本想着用 umi 里的区块来写页面，后来意识到即使写了一个页面的区块，如果页面逻辑差不多，还是得去一遍遍的修改代码，索性将这些逻辑全都抽象出来，通过配置实现页面扩展。

#### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| namespace | model 名称空间 | string | - |
| data | StandardTable data | any | {} |
| dataContainerType | 数据容器类型 | 'table' \| 'list' | `'table'` |
| renderItem | 数据容器类型为 `'list'` 可用，用于自定义渲染组件 | ({ record, actions, recordSelection, checkable }) => React.ReactNode | - |
| columns | table [columns](https://ant.design/components/table-cn/#Column) | [ColumnProps](https://git.io/vMMXC)[] | [] |
| fetchLoading | 请求列表 loading | boolean | - |
| createLoading | 创建 model loading | boolean | - |
| detailLoading | 请求 model 详情 loading | boolean | - |
| updateLoading | 更新 model loading | boolean | - |
| deleteLoading | 删除 model loading | boolean | - |
| dipatch | dva 注入的 dispatch 函数 | Function | - |
| queryArgsConfig | 查询参数配置，参考 [map.js](/src/pages/Enhance/CurdPage/map.js) | any[] | [] |
| queryPanelProps | 查询面板配置 | [QueryPanelProps](/src/components/QueryPanel/index.d.ts) | - |
| createButtonName | 新建按钮名称 | string | - |
| tableConfig | 表格配置 | [tableConfig](#tableConfig) | - |
| setFormItemsConfig | 配置表单数据 | (detail: {}, mode: string, form) => any[] | - |
| interceptors | 拦截器 | [interceptors](#interceptors) | - |
| afterPopupNotVisible | 关闭弹窗后事件 | () => void | - |
| createTitle | 新建窗口名称 | string | - |
| detailTitle | 详情窗口名称 | string | - |
| updateTitle | 编辑窗口名称 | string | - |
| popupType | 弹窗类型 | 'modal' \| 'drawer' | - |
| popupProps | 弹窗配置，根据 `popupType` 配置 | [CustomDetailFormDrawerProps](/src/components/BasePage/Curd/CustomDetailFormDrawerProps.d.ts) \| [CustomDetailFormModalProps](/src/components/BasePage/Curd/CustomDetailFormModalProps.d.ts) | - |
| children | 紧跟新建按钮后的 children ，会被注入 `__curd__` 实例属性，可访问控制该页面组件的所有属性 | React.ReactChildren | - |

#### tableConfig

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 表格列模型配置 | [Column](https://ant.design/components/table-cn/#Column) | - |
| checkable | 是否开启多选 | boolean | `true` |
| showActionsCount | 除更多外需要展示的操作个数 | number | 3 |
| extraActions | 除 **详情（4）**，**编辑（8）**，**删除（12）** 外，可自行配置额外操作。注意，数字是操作的 `key` ，根据 `key` 不同，会按升序排列 | [ActionType](/src/components/BasePage/Curd/ActionType.d.ts) | - |
| confirmKeys | 需要弹出确认窗口的 `key` 数组 | (number \| [number, (record?: any) => string])[] | `[12]` |
| hideActions | 隐藏操作的 `key` 数组 | number[] | - |

#### interceptors

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| updateFieldsValue | 表单数据拦截处理，类似时间区间这样的数据，需要单独处理后再提交 | (fieldsValue: any, mode?: 'create' \| 'update') => any | - |
| updateFieldsValueAsync | 异步表单数据拦截处理 | (fieldsValue: any, mode?: 'create' \| 'update') => any | - |
| handleDetailClick | 详情点击事件拦截，可通过路由跳转到自定义的对象详情页面 | (record: any) => any | - |
| handleUpdateClick | 编辑点击事件拦截 | (record: any) => any | - |
| handleDeleteClick | 删除点击事件拦截 | (record: any) => any | - |
