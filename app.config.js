const { version } = require('./package.json');

export default ({ config }) => ({
  ...config,
  name: 'Kim Haklı?',
  slug: 'kim-hakli',
  scheme: 'kim-hakli',
  version,
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  ios: {
    supportsTablet: false,
    googleServicesFile: process.env.GOOGLE_SERVICES_PLIST ?? './GoogleService-Info.plist',
    bundleIdentifier: 'com.oakkoca.kimhakli',
    usesAppleSignIn: true,
    buildNumber: '40',
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
    associatedDomains: ['applinks:kimhakli.tr'],
  },
  android: {
    versionCode: 40,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#1C1F30',
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: 'com.oakkoca.kimhakli',
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? './google-services.json',
    intentFilters: [
      {
        action: 'VIEW',
        autoVerify: true,
        data: [
          {
            scheme: 'https',
            host: 'kimhakli.tr',
            pathPrefix: '/story',
          },
          {
            scheme: 'https',
            host: 'kimhakli.tr',
            pathPrefix: '/invite',
          },
        ],
        category: ['BROWSABLE', 'DEFAULT'],
      },
    ],
    permissions: ['android.permission.INTERNET', 'com.google.android.gms.permission.AD_ID'],
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [
    'expo-router',
    'expo-apple-authentication',
    'expo-notifications',
    '@bacons/apple-targets',
    [
      '@react-native-google-signin/google-signin',
      {
        iosUrlScheme: 'com.googleusercontent.apps.945226356568-armhhtcjn5abjs3kna2bg4285ohva0jc',
      },
    ],
    'expo-localization',
    [
      'expo-font',
      {
        android: {
          fonts: [
            {
              fontFamily: 'Inter',
              fontDefinitions: [
                { path: './assets/fonts/inter/Inter-Regular.ttf', weight: 400 },
                { path: './assets/fonts/inter/Inter-Medium.ttf', weight: 500 },
                { path: './assets/fonts/inter/Inter-SemiBold.ttf', weight: 600 },
                { path: './assets/fonts/inter/Inter-Bold.ttf', weight: 700 },
                { path: './assets/fonts/inter/Inter-ExtraBold.ttf', weight: 800 },
                { path: './assets/fonts/inter/Inter-Black.ttf', weight: 900 },
              ],
            },
            {
              fontFamily: 'PlayfairDisplay',
              fontDefinitions: [
                {
                  path: './assets/fonts/playfair-display/PlayfairDisplay-Regular.ttf',
                  weight: 400,
                },
                { path: './assets/fonts/playfair-display/PlayfairDisplay-Medium.ttf', weight: 500 },
                {
                  path: './assets/fonts/playfair-display/PlayfairDisplay-SemiBold.ttf',
                  weight: 600,
                },
                { path: './assets/fonts/playfair-display/PlayfairDisplay-Bold.ttf', weight: 700 },
                {
                  path: './assets/fonts/playfair-display/PlayfairDisplay-ExtraBold.ttf',
                  weight: 800,
                },
                { path: './assets/fonts/playfair-display/PlayfairDisplay-Black.ttf', weight: 900 },
              ],
            },
          ],
        },
        ios: {
          fonts: [
            './assets/fonts/inter/Inter-Regular.ttf',
            './assets/fonts/inter/Inter-Medium.ttf',
            './assets/fonts/inter/Inter-SemiBold.ttf',
            './assets/fonts/inter/Inter-Bold.ttf',
            './assets/fonts/inter/Inter-ExtraBold.ttf',
            './assets/fonts/inter/Inter-Black.ttf',
            './assets/fonts/playfair-display/PlayfairDisplay-Regular.ttf',
            './assets/fonts/playfair-display/PlayfairDisplay-Medium.ttf',
            './assets/fonts/playfair-display/PlayfairDisplay-SemiBold.ttf',
            './assets/fonts/playfair-display/PlayfairDisplay-Bold.ttf',
            './assets/fonts/playfair-display/PlayfairDisplay-ExtraBold.ttf',
            './assets/fonts/playfair-display/PlayfairDisplay-Black.ttf',
          ],
        },
      },
    ],
    [
      'expo-navigation-bar',
      {
        enforceContrast: true,
      },
    ],
    './plugins/withUnityAdsMediation',
    [
      'expo-build-properties',
      {
        android: {
          enableMinifyInReleaseBuilds: true,
          enableShrinkResourcesInReleaseBuilds: true,
        },
        ios: {
          useFrameworks: 'static',
          extraPods: [
            {
              name: 'GoogleUtilities',
              modular_headers: true,
            },
            {
              name: 'RecaptchaInterop',
              modular_headers: true,
            },
            {
              name: 'GoogleMobileAdsMediationUnity',
              version: '4.17.0.0',
            },
          ],
        },
      },
    ],
    [
      'expo-image-picker',
      {
        photosPermission: 'Profil fotoğraf seçimi için izniniz gerekmektedir.',
        colors: {
          cropToolbarColor: '#000000',
        },
        dark: {
          colors: {
            cropToolbarColor: '#000000',
          },
        },
      },
    ],
    [
      'react-native-google-mobile-ads',
      {
        androidAppId: 'ca-app-pub-7102780910526722~6398986416',
        iosAppId: 'ca-app-pub-7102780910526722~9471872311',
      },
    ],
    [
      'expo-splash-screen',
      {
        backgroundColor: '#1C1F30',
        image: './assets/splash/android-splash.png',
        imageWidth: 200,
        resizeMode: 'contain',
        ios: {
          image: './assets/splash/ios-splash.png',
        },
        android: {
          image: './assets/splash/android-splash.png',
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: 'e6c9f5b0-ed68-493f-b7a8-19991091719e',
    },
  },
});
