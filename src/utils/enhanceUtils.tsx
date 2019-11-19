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

export function transferMenuData(menuLoading: boolean, menuData: MenuItem[]) {
  if (menuLoading) {
    return null;
  }
  return menuData;
}

export function withRoutePage(WrappedComponent: React.ComponentClass | React.FC) {
  return class extends React.Component<any> {
    shouldComponentUpdate(nextProps: any) {
      // console.log(this.props);
      const {
        computedMatch: nextComputedMatch,
        history: nextHistory,
        location: nextLocation,
        match: nextMatch,
        route: nextRoute,
        ...nextRest
      } = nextProps;
      const {
        computedMatch: thisComputedMatch,
        history: thisHistory,
        location: thisLocation,
        match: thisMatch,
        route: thisRoute,
        ...thisRest
      } = this.props;
      // 注入数据变化，刷新组件
      if (!_isEqual(nextRest, thisRest)) {
        return true;
      }

      const { pathname: nextPathname, search: nextSearch, state: nextState } = nextLocation;
      const { pathname: thisPathname, search: thisSearch, state: thisState } = thisLocation;
      const isLocationChange =
        nextPathname !== thisPathname ||
        nextSearch !== thisSearch ||
        !_isEqual(nextState, thisState);
      // 路由变化，刷新组件
      if (isLocationChange) {
        return true;
      }

      return false;
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
