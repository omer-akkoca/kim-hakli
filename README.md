## Development

### /android dosyasını yeniden oluşturmak için:

```bash
npx expo prebuild --clean --platform android

npx expo prebuild --platform ios --clean
```

## Build

### Production Android AAB

Production AAB build başlatmak için:

```bash
eas build --platform android --profile production
```

### Production Apple

Apple testflight'e göndermek için:

```bash
eas build --platform ios --profile production

eas submit --platform ios
```
