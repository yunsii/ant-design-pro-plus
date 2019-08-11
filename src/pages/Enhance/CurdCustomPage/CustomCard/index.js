import React from 'react';
import { Card, Avatar } from 'antd';
import Ellipsis from '@/components/Ellipsis';
import styles from './index.less';

export default function({ record, actions, recordSelection, checkable }) {
  const { selectedRowKeys, onSelectChange } = recordSelection;
  return (
    <Card
      hoverable
      className={styles.card}
      actions={actions}
      cover={
        <div
          className={styles.cardCover}
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)`,
          }}
        />
      }
      onClick={() => {
        if (!checkable) return;
        if (selectedRowKeys.includes(record.id)) {
          onSelectChange(selectedRowKeys.filter(item => item !== record.id));
        } else {
          onSelectChange([...selectedRowKeys, record.id]);
        }
      }}
    >
      <Card.Meta
        avatar={<Avatar className={styles.avatar} src={record.avatar} />}
        title={<a>{record.name}</a>}
        description={
          <Ellipsis lines={2}>
            昵称：{record.nickname}， 生日: {record.birthday}。<br />
            特长：{record.speciality}， 爱好：{record.habit}。
          </Ellipsis>
        }
      />
    </Card>
  );
}
