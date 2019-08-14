let initialUsePromise = process.env.NODE_ENV !== 'development';

if (process.env.NODE_ENV === 'production') {
  initialUsePromise = true;
}

export const usePromise = initialUsePromise;

export const promiseTimeout = 1000;
