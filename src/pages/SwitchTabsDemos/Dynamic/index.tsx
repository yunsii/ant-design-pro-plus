import React from 'react';
import { useParams } from 'umi';
import { Card } from 'antd';

export default function Dynamic() {
  const params = useParams();

  return (
    <Card>
      match params:
      <div style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(params, null, 2)}</div>
    </Card>
  );
}
