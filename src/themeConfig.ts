import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    fontFamily: 'var(--font-montserrat)',

    colorPrimaryBg: ' #ccf5f7',
    colorPrimaryBgHover: '#99ebef',
    colorPrimaryBorder: '#66e0e7',
    colorPrimaryBorderHover: '#33d6df',
    colorPrimaryHover: '#00cbd7',
    colorPrimary: '#00ADB5',
    colorPrimaryActive: '#008a91',
    colorPrimaryTextHover: '#00cbd7',
    colorPrimaryText: '#00ADB5',
    colorPrimaryTextActive: '#008a91',

    colorLink: '#00ADB5',
    colorLinkHover: '#008F99',
    colorLinkActive: '#005961',

    colorTextBase: '#222831',
  },

  components: {
    Button: {
      borderRadius: 28,
      algorithm: true,
    },
  },
};

export default theme;
