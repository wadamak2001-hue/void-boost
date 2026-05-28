
# VOID BOOST | Native Android Edition

This project is fully configured for a **Native Android Build** using Capacitor and GitHub Actions.

## 🚀 Final Push Instructions (Terminal Commands)

To build your APK without a PC, run these commands in the **IDX Terminal** tab at the bottom of your screen:

```bash
# 1. Initialize Git
git init

# 2. Add Remote (Replace <YOUR_TOKEN> with your GitHub Classic Token)
# IMPORTANT: Keep the 'https://' and '@' in place
git remote add origin https://<YOUR_TOKEN>@github.com/wadamak2001-hue/void-boost.git

# 3. Add files and Commit
git add .
git commit -m "Final Native Build with AdMob & UI Optimization"

# 4. Push to Cloud
git branch -M main
git push -u origin main
```

## 📦 How to Download your APK
1. After pushing, go to your repository on GitHub.
2. Click the **Actions** tab.
3. Wait for the "Build VOID BOOST APK" workflow to finish (approx. 5 mins).
4. Click on the completed run, scroll down to **Artifacts**, and download `VOID-BOOST-Debug-APK`.

## Configuration
- **AdMob App ID**: `ca-app-pub-9369472846382804~2223210364`
- **Ad Unit ID**: `ca-app-pub-9369472846382804/6274136018`
- **Package Name**: `com.voidboost.optimizer`
Triggering build Thu May 28 08:57:46 PM UTC 2026
