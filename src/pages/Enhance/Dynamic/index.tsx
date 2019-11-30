import React from 'react';
import { withRoutePage } from '@/utils/enhanceUtils';

export default withRoutePage(({ location, match }) => {
  const { params } = match;
  return (
    <>
      <h1>id: {params.id || '-'}</h1>
      <h1>name: {location.query.name || '-'}</h1>
    </>
  );
});
