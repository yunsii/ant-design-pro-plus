import { useParams } from 'umi';
import { Card } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

export default function Dynamic() {
  const params = useParams();

  return (
    <PageHeaderWrapper content="动态路由">
      <Card>
        match params:
        <div style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(params, null, 2)}</div>
      </Card>
    </PageHeaderWrapper>
  );
}
