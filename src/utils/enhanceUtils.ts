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

export function transferMenuData(publicPath: string, menuLoading: boolean, menuData: MenuItem[]) {
  if (menuLoading || !menuData.length) {
    return [];
  }
  if (menuData.length && menuData[0].path.startsWith(publicPath)) {
    return [];
  }
  return menuData;
}
