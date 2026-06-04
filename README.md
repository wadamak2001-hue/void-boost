
# VOID BOOST - NATIVE APK BUILD GUIDE

This project is optimized for a static Next.js export and a native Capacitor build.

## 🚀 RESOLVE GIT CONFLICTS & PUSH (Run in IDX Terminal)
If you get a "rejected" or "fetch first" error, use this command to force sync your local code to GitHub:
```bash
git init && git remote add origin https://github.com/wadamak2001-hue/void-boost.git || git remote set-url origin https://github.com/wadamak2001-hue/void-boost.git && git add . && git commit -m "Final Production Build" && git branch -M main && git push -u origin main --force
```

## Build Instructions (Mobile/Cloud)
1. **GitHub Token**: Generate a PAT on GitHub with `repo` scope.
2. **Sync**: Enter token on the app dashboard and click **START CLOUD APK BUILD**.
3. **Download Artifact**: Go to your GitHub repository's **Actions** tab to download the final APK.

## Local Terminal Build (One Command)
If you are in the IDX workspace terminal, run:
```bash
npm run build:apk
```

## APK Output Locations
- **Cloud Build**: Downloadable from GitHub Actions.
- **Local Build**: `android/app/build/outputs/apk/debug/app-debug.apk`

## Production Configuration (Locked)
- **AdMob App ID**: ca-app-pub-9369472846382804~2223210364
- **Ad Unit ID**: ca-app-pub-9369472846382804/6274136018
