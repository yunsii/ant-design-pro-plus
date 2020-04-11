import { useEffect } from 'react';
import _partial from 'lodash/partial';

import { logger } from '@/utils/utils';

const Logger = _partial(logger, 'useConsole');

export const useConsole = (name: string) => {
  Logger(`render ${name}`);
  useEffect(() => {
    Logger(`mounted ${name}`);
    return () => {
      Logger(`will unmount ${name}`);
    };
  }, []);
};
