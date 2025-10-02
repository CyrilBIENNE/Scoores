import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.scoores.mobile',
  appName: 'Scoores',
  webDir: 'out',

  server: {
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      //launchAutoHide: false,
      launchShowDuration: 1000,
      launchFadeOutDuration: 400,

      // Android
      androidScaleType: 'FIT_CENTER', // 'CENTER_CROP' ou 'FIT_CENTER' selon ton image
      backgroundColor: '#333333',
      showSpinner: true,
      spinnerColor: '#999999',
    },
  },
}

export default config
