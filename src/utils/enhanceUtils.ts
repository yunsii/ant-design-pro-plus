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

export function transferMenuData(menuLoading: boolean, menuData: MenuItem[]) {
  if (menuLoading) {
    return null;
  }
  return menuData;
}
