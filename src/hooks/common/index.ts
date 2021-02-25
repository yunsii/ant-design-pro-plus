import { useRef } from 'react';
import { usePrevious } from 'ahooks';
import deepEqual from 'fast-deep-equal';

/**
 * 使用经过完全比较的上次的状态值
 *
 * 不会因为 UI 的反复刷新使得上次的状态值和当前的状态值相同
 *
 * @param state
 */
export function useReallyPrevious<T>(state: T) {
  return usePrevious(state, (prev, next) => !deepEqual(prev, next));
}

/**
 * 状态值更新回调 hook
 *
 * @param state
 * @param onUpdate 状态变化时的回调函数
 */
export function useUpdateState<T>(state: T, onUpdate: (prev: T | undefined, cur: T) => void) {
  const prevRef = useRef<T>();

  const needUpdate = !deepEqual(prevRef.current, state);

  if (needUpdate) {
    onUpdate(prevRef.current, state);
    prevRef.current = state;
  }
}
