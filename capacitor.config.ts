
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
      // Note: Native Android projects usually require the App ID in AndroidManifest.xml
      // This config helps the plugin identify the environment.
    }
  }
};

export default config;
