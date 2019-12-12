import React from 'react';
import _isEqual from 'lodash/isEqual';

export function delay(ms: number) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve();
      }, ms);
    } catch (err) {
      reject(err);
    }
  });
}

export function injectChildren(children, properties) {
  return React.Children.map(children, child => {
    if (child) {
      const { type: childType } = child;
      if (typeof childType === 'string') {
        return child;
      }
      return React.cloneElement(child, {
        ...properties,
      });
    }
    return child;
  });
}

export function waitMenuData(menuLoading: boolean, menuData: MenuItem[]) {
  return !menuLoading && menuData;
}

export const shouldRoutePageUpdate = (nextProps, thisProps) => {
  // console.log(this.props);
  const {
    children: nextChildren,
    computedMatch: nextComputedMatch,
    history: nextHistory,
    location: nextLocation,
    match: nextMatch,
    route: nextRoute,
    staticContext: nextStaticContext,
    ...nextRest
  } = nextProps;
  const {
    children: thisChildren,
    computedMatch: thisComputedMatch,
    history: thisHistory,
    location: thisLocation,
    match: thisMatch,
    route: thisRoute,
    staticContext: thisStaticContext,
    ...thisRest
  } = thisProps;
  // 注入数据变化，刷新组件
  if (!_isEqual(nextRest, thisRest)) {
    console.log('update by 数据变化');
    // console.log(thisRest);
    // console.log(nextRest);
    return true;
  }

  const { pathname: nextPathname, search: nextSearch, state: nextState } = nextLocation || {};
  const { pathname: thisPathname, search: thisSearch, state: thisState } = thisLocation || {};
  const isLocationChange =
    nextPathname !== thisPathname || nextSearch !== thisSearch || !_isEqual(nextState, thisState);
  // 路由变化，刷新组件
  if (isLocationChange) {
    console.log('update by 路由变化');
    return true;
  }

  return false;
};

export function withRoutePage<Props = any>(
  WrappedComponent: React.ComponentClass | React.FC<Props>
): React.ComponentClass {
  class WithRoutePage extends React.Component<any> {
    static displayName: string;

    shouldComponentUpdate(nextProps: any) {
      return shouldRoutePageUpdate(nextProps, this.props);
    }

    render() {
      const { history: thisHistory, ...thisRest } = this.props;
      return <WrappedComponent {...(thisRest as any)} />;
    }
  }

  WithRoutePage.displayName = `WithRoutePage(${getDisplayName(WrappedComponent)})`;
  return WithRoutePage;
}

function getDisplayName(WrappedComponent: React.ComponentClass | React.FC) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
