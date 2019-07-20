import React from 'react';
import { Card } from 'antd';
import styles from './index.less';

export default function(record) {
  return (
    <Card
      hoverable
      className={styles.card}
      // actions={setLessonActions(item)}
      cover={
        <div
          className={styles.CardCover}
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)`,
          }}
        />
      }
    >
      <Card.Meta title={<a>{record.name}</a>} />
    </Card>
  );
}
