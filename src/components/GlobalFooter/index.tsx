import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout';
import { GithubOutlined } from '@ant-design/icons';

import { isAntDesignPro } from '@/utils/utils';

const defaultFooterDom = (
  <DefaultFooter
    copyright='2019 蚂蚁金服体验技术部出品'
    links={[
      {
        key: 'Ant Design Pro',
        title: 'Ant Design Pro',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/ant-design/ant-design-pro',
        blankTarget: true,
      },
      {
        key: 'Ant Design',
        title: 'Ant Design',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ]}
  />
);

export interface FooterProps {
  content?: JSX.Element;
}

export default function GlobalFooter(props: FooterProps) {
  const { content } = props;

  if (!isAntDesignPro()) {
    return (
      <>
        {content}
        {defaultFooterDom}
      </>
    );
  }

  return (
    <>
      {content}
      {defaultFooterDom}
      <div
        style={{
          padding: '0px 24px 24px',
          textAlign: 'center',
        }}
      >
        <a href='https://www.netlify.com' target='_blank' rel='noopener noreferrer'>
          <img
            src='https://www.netlify.com/img/global/badges/netlify-color-bg.svg'
            width='82px'
            alt='netlify logo'
          />
        </a>
      </div>
    </>
  );
}
