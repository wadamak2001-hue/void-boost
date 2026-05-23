
# VOID BOOST | Native Android Edition

This project is fully configured for a **Native Android Build** using Capacitor and GitHub Actions.

## 🚀 Final Push Instructions (Terminal Commands)

To build your APK without a PC, run these commands in the **IDX Terminal** tab:

```bash
# 1. Initialize Git
git init

# 2. Add Remote (Replace <TOKEN> with your GitHub token)
git remote add origin https://<YOUR_TOKEN>@github.com/wadamak2001-hue/void-boost.git

# 3. Commit Changes
git add .
git commit -m "Final Native Build with Live AdMob"

# 4. Push to Cloud
git branch -M main
git push -u origin main
```

## 📦 How to Download your APK
1. After pushing, go to your repository on GitHub.
2. Click the **Actions** tab.
3. Wait for the "Build VOID BOOST APK" workflow to finish (approx. 5 mins).
4. Click on the completed run, scroll to **Artifacts**, and download `VOID-BOOST-Debug-APK`.

## Configuration
- **AdMob App ID**: `ca-app-pub-9369472846382804~2223210364`
- **Ad Unit ID**: `ca-app-pub-9369472846382804/6274136018`
- **Package Name**: `com.voidboost.optimizer`
