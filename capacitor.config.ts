
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.voidboost.optimizer',
  appName: 'VOID BOOST',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    },
    AdMob: {
      // Required for Android Manifest injection via plugin
    }
  }
};

export default config;
