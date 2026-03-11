import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'verkaufalles',
  webDir: 'www',
    android: {
    adjustMarginsForEdgeToEdge: false,
    backgroundColor: "#ffffffff"
  },
  plugins: {
    StatusBar: {
      overlaysWebView: false
    }
  }
};

export default config;
