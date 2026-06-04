import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.voidboost.optimizer',
  appName: 'VOID BOOST',
  webDir: 'out', // Matches Next.js static export directory
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    },
    AdMob: {
      // Configuration is handled via AndroidManifest meta-data and runtime initialization
    }
  }
};

export default config;