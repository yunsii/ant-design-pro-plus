import defaultDarkTheme from 'antd/dist/dark-theme';

export default {
  theme: [
    {
      key: 'dark',
      fileName: 'dark.css',
      theme: 'dark',
    },
    {
      key: 'dust',
      fileName: 'dust.css',
      modifyVars: {
        '@primary-color': '#F5222D',
      },
    },
    {
      key: 'volcano',
      fileName: 'volcano.css',
      modifyVars: {
        '@primary-color': '#FA541C',
      },
    },
    {
      key: 'sunset',
      fileName: 'sunset.css',
      modifyVars: {
        '@primary-color': '#FAAD14',
      },
    },
    {
      key: 'cyan',
      fileName: 'cyan.css',
      modifyVars: {
        '@primary-color': '#13C2C2',
      },
    },
    {
      key: 'green',
      fileName: 'green.css',
      modifyVars: {
        '@primary-color': '#52C41A',
      },
    },
    {
      key: 'geekblue',
      fileName: 'geekblue.css',
      modifyVars: {
        '@primary-color': '#2F54EB',
      },
    },
    {
      key: 'purple',
      fileName: 'purple.css',
      modifyVars: {
        '@primary-color': '#722ED1',
      },
    },

    {
      key: 'dust',
      theme: 'dark',
      fileName: 'dark-dust.css',
      modifyVars: {
        ...defaultDarkTheme,
        '@primary-color': '#F5222D',
        // '@drawer-bg': '@component-background',
      },
      disableExtendsDark: true,
    },
    {
      key: 'volcano',
      theme: 'dark',
      fileName: 'dark-volcano.css',
      modifyVars: {
        ...defaultDarkTheme,
        '@primary-color': '#FA541C',
        // '@drawer-bg': '@component-background',
      },
      disableExtendsDark: true,
    },
    {
      key: 'sunset',
      theme: 'dark',
      fileName: 'dark-sunset.css',
      modifyVars: {
        ...defaultDarkTheme,
        '@primary-color': '#FAAD14',
        // '@drawer-bg': '@component-background',
      },
      disableExtendsDark: true,
    },
    {
      key: 'cyan',
      theme: 'dark',
      fileName: 'dark-cyan.css',
      modifyVars: {
        ...defaultDarkTheme,
        '@primary-color': '#13C2C2',
        // '@drawer-bg': '@component-background',
      },
      disableExtendsDark: true,
    },
    {
      key: 'green',
      theme: 'dark',
      fileName: 'dark-green.css',
      modifyVars: {
        ...defaultDarkTheme,
        '@primary-color': '#52C41A',
        // '@drawer-bg': '@component-background',
      },
      disableExtendsDark: true,
    },
    {
      key: 'geekblue',
      theme: 'dark',
      fileName: 'dark-geekblue.css',
      modifyVars: {
        ...defaultDarkTheme,
        '@primary-color': '#2F54EB',
        // '@drawer-bg': '@component-background',
      },
      disableExtendsDark: true,
    },
    {
      key: 'purple',
      theme: 'dark',
      fileName: 'dark-purple.css',
      modifyVars: {
        ...defaultDarkTheme,
        '@primary-color': '#722ED1',
        // '@drawer-bg': '@component-background',
      },
      disableExtendsDark: true,
    },
  ],
};
