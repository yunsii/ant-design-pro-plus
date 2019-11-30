import React from 'react';
import { withRoutePage } from '@/utils/enhanceUtils';

export default withRoutePage(({ match }) => {
  const { params } = match;
  return (
    <>
      <h1>id: {params.id || '-'}</h1>
      <h1>name: {params.name || '-'}</h1>
    </>
  );
});
