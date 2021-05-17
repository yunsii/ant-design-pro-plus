[掘金](https://juejin.cn/post/6962493943606951966) | [V2EX](https://www.v2ex.com/t/777147) | [知乎](https://zhuanlan.zhihu.com/p/372607549)

![snapshot](https://github.com/theprimone/ant-design-pro-plus/blob/master/static/snapshot.png)

# 基于 Ant Design Pro 页面标签化展示的研究与实现

[效果预览 🚀](https://theprimone.top/ant-design-pro-plus)

## 摘要

Ant Design 作为一个昔日世界第一的 UI 库，影响力自是足够深远。而由官方推出的「开箱即用的中台前端/设计解决方案」—— **Ant Design Pro** 也日趋成熟。较为遗憾的是 Ant Design Pro 官方并没有提供页面标签化展示的功能，因为当时环境的需要，我走上了这条页面标签化的不归路……

关键词：**Ant Design Pro**；**Umi**；**标签页**；**页面标签化**

## 绪论

从 19 年偶然发现了 Ant Design Pro（以下简称 Pro）以来，对我的技术发展有着不容忽视的影响，当然本文着重讨论我在页面标签化展示的研究与实现。刚接触 Pro 的时候自己还是一个工作中用 Java，业余学习 React 而转型前端的毕业一年的菜鸟。突然面对 Pro 这样一个庞杂的脚手架（当时的版本 Pro v2），而且还要做一个自己本来毫无头绪的功能时，我是拒绝的，奈何没人顶上只能自己硬着头皮搞了。

## 道路是崎岖的

一切的起点都要从一个不得不提的官方仓库关于此讨论甚多的 issue ——[能否提供 tab 切换模式](https://github.com/ant-design/ant-design-pro/issues/220)说起。感谢其中相关的仓库提供的思路。当时研究了好几个仓库的源码，主要有两个思路：

- 读取路由配置生成一个扁平的路由映射，再为其他激活页面的组件注入点击事件回调；
- 拦截 `children`，子组件缓存不同路由下的 `children`，再根据当前的 `location` 渲染对应的组件。

**第一个思路**是通过点击事件来更新标签页的渲染，对其他组件还存在一定的侵入性，实现不够优雅，更为尴尬的是不支持页面的嵌套路由渲染。

**第二个思路**就没有了对于其他组件的侵入性，只需要监听 `children` 和 `location` 的变化即可。印象中由于彼时 hooks 还未发布，通过类组件实现[颇为繁琐](https://theprimone.top/2019/07/06/2019-07-06-ant-design-pro-tabs-page-by-route/)。hooks 正式发布后又重构成了函数式组件实现。

## 前途是光明的

[![snapshot](https://github.com/theprimone/ant-design-pro-plus/blob/master/static/snapshot.png)](https://theprimone.top/ant-design-pro-plus)

近两年的时间里随着各方面的不断成熟，当前实现 **[Ant Design Pro Plus](https://github.com/theprimone/ant-design-pro-plus)** 已经支持了足够丰富的功能：

- 支持页面的嵌套路由渲染
- 两种标签页模式可选
  - 基于路由，每个路由只渲染一个标签页
  - 基于路由参数，计算出每个路由的所有参数的哈希值，不同的哈希值渲染不同的标签页
- 可固定标签栏
- 快捷操作
  - 刷新标签页 - `window.reloadTab()`
  - 关闭标签页 - `window.closeTab()`
  - 返回之前标签页 - `window.goBackTab()`
  - 关闭并返回之前标签页 - `window.closeAndGoBackTab()`
- `reloadable`，支持在头部操作栏刷新当前标签页
- `follow`，路由定义中新增配置，默认打开方式是添加到所有标签页最后面，可通过配置该属性，使得一个标签页在 `follow` 指定的标签页后面打开（可参考查询页 Demo）
- `persistent`，支持页面刷新之后恢复上次的标签页状态

得益于 hooks 功能的加持，封装了 **[`useTabs`](https://github.com/theprimone/ant-design-pro-plus/blob/master/src/components/RouteTabs/useTabs.ts#L58)** 的 hook，核心功能一目了然。如此，只需要根据状态渲染标签页即可。

## 核心逻辑

作为一个不那么简单的功能，需要注意的细节自然不少，这里重点介绍两个核心函数。

### [`getOriginalRenderRoute`](https://github.com/theprimone/ant-design-pro-plus/blob/master/src/components/RouteTabs/utils.tsx#L58)

根据 `location` 和原始的路由定义解析出待渲染的路由定义对象 `RenderRoute`，**核心是算出正确的 `renderKey`**，标签页的唯一性主要由其决定（基于路由参数的标签页还需要结合哈希值）。

```ts
const pathnameMapCache: {
  [k: string]: any;
} = {};

function getOriginalRenderRoute(location: H.Location, originalRoutes: MakeUpRoute[]): RenderRoute {
  const { pathname } = location;

  if (pathnameMapCache[pathname]) {
    return pathnameMapCache[pathname];
  }

  function getMetadata(menuData: MakeUpRoute[], parent: MakeUpRoute | null): RenderRoute {
    let result: any;

    /** 根据前缀匹配菜单项，因此，`BasicLayout` 下的 **一级路由** 只要配置了 `name` 属性，总能找到一个 `path` 和 `name` 的组合 */
    const targetRoute = _find(
      menuData,
      (item) => pathToRegexp(`${item.path}(.*)`).test(pathname) && !!item.name,
    );

    /** 如果为 **一级路由** 直接写入 `result` ，否则父级没有 `component` 时才能写入 `result` */
    if ((!parent && targetRoute) || (parent && !parent.component && targetRoute)) {
      result = {
        renderKey: targetRoute.path!,
        ...targetRoute,
      };
    }
    /** 如果父级配置了 `hideChildrenInMenu` ，子级配置了 `name` 则重写 `result` */
    if (parent?.hideChildrenInMenu && targetRoute) {
      result = {
        renderKey: parent.path!,
        ...targetRoute,
      };
    }

    /** 递归设置 `renderKey` */
    if (Array.isArray(targetRoute?.children) && targetRoute?.children.length) {
      result = getMetadata(targetRoute!.children!, targetRoute!) || result;
    }

    return result;
  }

  const result = getMetadata(originalRoutes, null);

  pathnameMapCache[pathname] = result;
  return result;
}
```

注释应该还算清晰，尽力覆盖了一些我所能考虑到的各种情况。特别的是做了一个缓存，避免反复计算 `renderKey`。

### [`withRouteTab`](https://github.com/theprimone/ant-design-pro-plus/blob/master/src/components/RouteTabs/utils.tsx#L219)

**页面性能优化高阶函数**。默认情况下，每次切换都会触发所有标签页的渲染，当打开标签页太多且页面较为复杂时，由于没有必要的渲染可能会造成操作标签页时有明显的反馈延迟，可通过此高阶函数包裹页面组件以优化渲染性能。

## 一个难题

近两年的发展并不是一帆风顺，很多问题都算是不痛不痒，一个萝卜一个坑都能解决，但是一个关于 Umi 的难题折磨了我很长的时间。

Umi 升级到 3.0 的时候也尝试升级项目的 Umi 版本，不升不知道，一升吓一跳，切换时所有标签页都会渲染成当前 `location` 对应的页面内容，当时我就震惊了，不禁陷入了哲学三问：我是谁？我在哪儿？我要干嘛？

相当长的一段时间都毫无头绪，也提了 issue —— 「[想了解一下 umi 2 与 3 对路由组件处理的异同](https://github.com/umijs/umi/issues/4425)」，没有得到反馈 \_(:3J∠)\_ 直到感觉被 Umi 抛下了好远好远，无奈再次硬着头皮研究了 Umi 两个版本之间关于路由渲染的源码，功夫不负有心人，最后终于找到了[病根](https://github.com/umijs/umi/issues/4425#issuecomment-770360267)，成功升级 Umi 的版本，这也是该功能仅支持 **`^umi@2.0.0 | ^umi@3.3.8`** 的原因。

## 总结

对比已知的其他实现要么断更，要么功能不够完善，要么二者兼备。一个功能维护了近两年，之所以开篇提到「我走上了这条页面标签化的不归路」也正是这个原因，好在现在思路越来越清晰了。

正是在输出这篇文章的时候，突然想到可以将前文提到的两种思路整合，貌似也是个不错的方案，即只监听 `location` 并移除 `children` 的依赖。不过后续的重点可能还是侧重于将此功能插件化集成到 Umi 中。

前端一出道就碰到了 Pro，应该算是一大幸事了。以此为基础，对于前端开发的技术栈有了一系列较为成熟的认识，同时培养了较好的开发习惯，也为后续的自身技术上的可持续发展提供了源源不断的动力。当然，由于自身能力所限，过程中可能会有不足之处，对于 Pro 页面标签化展示这一问题重点是抛砖引玉，如果有任何意见或建议，欢迎批评指正。

> 挖个坑，下篇文章貌似有了思路，就聊聊我的前端反向入门之路吧，哈哈。
