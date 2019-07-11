const setTimeoutCall = (timeout = 0) => (func, ...values) => {
  return setTimeout(func, timeout, ...values);
};

export default setTimeoutCall;
