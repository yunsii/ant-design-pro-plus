import _isFunction from 'lodash/isFunction';

export const callFunctionIfFunction = (func: any) => (...args: any[]) => {
  if (_isFunction(func)) {
    func(...args);
  }
};

export const callFunctionIfValue = (func: any) => (...args: any[]) => {
  if (args[0]) {
    func(...args);
  }
};

export const callFunctionIf = (condition: boolean) => (func: any) => {
  if (condition && _isFunction(func)) {
    func();
  }
};
