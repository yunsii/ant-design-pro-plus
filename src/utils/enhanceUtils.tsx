import React from 'react';

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

export function withStaticPage(WrappedComponent: React.ComponentClass) {
  return class extends React.Component {
    shouldComponentUpdate() {
      return false;
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
