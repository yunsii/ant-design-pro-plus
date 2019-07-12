<h1 align="center">Ant Design Pro V2 Plus</h1>

<div align="center">

官方说明请参阅 [/v2/README.zh-CN](https://github.com/ant-design/ant-design-pro/blob/v2/README.zh-CN.md)

</div>

![ant-design-pro-v2-plus-screenshot.png](https://i.loli.net/2019/07/06/5d1ff32b16d2497023.png)

## 新增特性✨

* [基于路由实现多标签页切换](#基于路由实现多标签页切换)
* [StandardTable 增强](#StandardTable-增强)
* [antd-form-pro 表单功能增强](#antd-form-pro-表单功能增强)
* [DetailFormDrawer 详情表单抽屉组件](#DetailFormDrawer-详情抽屉组件)
* [QueryPanel 查询面板组件](#QueryPanel-查询面板组件)
* [base-models/curd 生成基础增删改查 model](#base-models/curd-基础增删改查-model)
* [BasePage/Curd 基础增删改查页面组件](#BasePage/Curd-基础增删改查页面组件)

## 功能实现概述☁️

除页面外，尽量使用 TypeScript 开发。由于对类型检验还不太熟练，所以部分类型检验直接使用 `any` 。

### 基于路由实现多标签页切换

`router.push()` 会注入该路由的 component ，所以根据条件处理该 children component 即可。

关注实现的可参考[基于 ant design pro 2.3.1 页面标签化展示的研究与实现](https://theprimone.top/2019/07/06/2019-07-06-ant-design-pro-tabs-page-by-route)

### StandardTable 增强

* 默认开启 hideOnSinglePage
* 间隔行着色
* 多选功能可选，通过 checkable 控制

### antd-form-pro 表单功能增强

新增组件 ant-form-pro ，可配置化实现表单功能。支持的组件与配置方式可参考 [map.js](/src/pages/Enhance/CurdPage/map.js) ，使用方式参考 [DetailFormDrawer 详情表单抽屉组件](#DetailFormDrawer-详情抽屉组件)。

### DetailFormDrawer 详情抽屉组件

基于 antd-form-pro 实现的详情表单抽屉，参数定义可参见 [DetailFormDrawer/index.d.ts](/src/components/DetailFormDrawer/index.d.ts) ，结合 ant-form-pro 的具体使用可参考 [DetailFormDrawer/index.js](/src/components/DetailFormDrawer/index.js) 。

### QueryPanel 查询面板组件

基于 antd-form-pro 实现的查询面板组件，具体实现可参考 [QueryPanel/index.js](/src/components/QueryPanel/index.js) ，只需传入 `onSearch` 方法即可使用。同时提供了重置表单后的 `onReset` 函数。

### base-models/curd 生成基础增删改查 model

通过 `namespace` 和 `modelConfig` 配置一个基础的增删改查 model ，参考 [base-models/curd.ts](/src/base-models/curd.ts) 。

### BasePage/Curd 基础增删改查页面组件

![base-curd.png](https://i.loli.net/2019/07/12/5d28976248c5c94749.png)

前置工具及组件：

* base-models/curd
* antd-form-pro
* DetailFormDrawer
* QueryPanel
* StandardTable

如果需要新建一个类似**基础增删改查**的页面，快速开发指南：

* 配置页面路由
* 编写接口增删改查 service
* 基于 base-models/curd 配置 model
* 配置新建和编辑的表单数据映射 map.js
* 配置页面 index.js ，主要是配置查询面板和数据列模型

具体使用参考 [src/pages/Enhance/CurdPage](src/pages/Enhance/CurdPage) 的实现。

相较于之前一个个去复制粘贴修改代码，通过配置化的方式快速实现一个页面 demo 看起来已经好了不少。另外，本想着用 umi 里的区块试试的，后来意识到即使写了一个页面的区块，还是得去修改代码，索性自己把这些逻辑全都抽出来，通过配置实现页面扩展。

#### API

##### BasePage/Curd

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| namespace | model 名称空间 | string | - |
| queryArgsConfig | 查询参数配置，参考 [map.js](/src/pages/Enhance/CurdPage/map.js) | any[] | [] |
| columns | table [columns](https://ant.design/components/table-cn/#Column) | [ColumnProps](https://git.io/vMMXC)[] | [] |
| data | StandardTable data | any | {} |
| fetchLoading | 请求列表 loading | boolean | - |
| createLoading | 创建 model loading | boolean | - |
| updateLoading | 更新 model loading | boolean | - |
| setFormItemsConfig | 配置新建和更新表单数据 | (detail: {}, mode: string) => any[] | - |
| dipatch | dva 注入的 dispatch 函数 | Function | - |
| interceptors | 拦截器 | [interceptors](#interceptors) | - |

##### interceptors

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| updateFieldsValue | 新建和更新表单处理拦截，类似时间区间这样的数据，需要单独处理后再提交 | (fieldsValue: any) => any | - |
| handleDetailClick | 详情点击事件拦截，可通过路由跳转到自定义的对象详情页面 | (record: any) => any | - |
| handleDeleteClick | 删除点击事件拦截 | (record: any) => any | - |
