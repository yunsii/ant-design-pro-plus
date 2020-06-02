import { useEffect } from 'react';
import _partial from 'lodash/partial';

import Logger from '@/utils/Logger';

const logger = new Logger('useConsole');

export const useConsole = (name: string) => {
  logger.log(`render ${name}`);
  useEffect(() => {
    logger.log(`mounted ${name}`);
    return () => {
      logger.log(`will unmount ${name}`);
    };
  }, []);
};
