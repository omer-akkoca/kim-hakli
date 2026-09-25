const { withAppBuildGradle } = require('@expo/config-plugins');

const UNITY_ADS_DEPENDENCIES = [
  'com.unity3d.ads:unity-ads:4.17.0',
  'com.google.ads.mediation:unity:4.17.0.0',
];

const withUnityAdsMediation = (config) =>
  withAppBuildGradle(config, (config) => {
    const { modResults } = config;

    for (const dependency of UNITY_ADS_DEPENDENCIES) {
      if (modResults.contents.includes(dependency)) {
        continue;
      }

      modResults.contents = modResults.contents.replace(
        /dependencies\s*{/,
        (match) => `${match}\n    implementation("${dependency}")`,
      );
    }

    return config;
  });

module.exports = withUnityAdsMediation;
