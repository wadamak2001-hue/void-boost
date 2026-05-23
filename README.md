
# VOID BOOST | Native Android Edition

This project is configured as a **Capacitor-Ready Native Android App** with an automated Cloud Build pipeline via GitHub Actions.

## 🚀 Cloud APK Build (Mobile/Tablet Instructions)

Since you are working from a mobile device, follow these exact steps to generate your APK:

### 1. Setup GitHub Repository
- Create a new repository named `void-boost` on GitHub.
- Generate a **Personal Access Token (classic)** with `repo` scope.

### 2. Push Code via IDX Terminal
Open the **Terminal** tab in your Project IDX workspace and paste these commands:
```bash
git init
git remote add origin https://<YOUR_TOKEN>@github.com/wadamak2001-hue/void-boost.git
git add .
git commit -m "Final Native Build with AdMob"
git branch -M main
git push -u origin main
```
*Replace `<YOUR_TOKEN>` with your GitHub token.*

### 3. Download the APK
- Once pushed, go to the **Actions** tab in your GitHub repository.
- You will see a workflow named "Build VOID BOOST APK" running.
- Once finished (approx. 5 minutes), click on the run.
- Scroll to **Artifacts** and download the `VOID-BOOST-Debug-APK`.

## Integrated Features
- **AdMob**: Real banner and interstitial ads integrated.
  - App ID: `ca-app-pub-9369472846382804~2223210364`
  - Unit ID: `ca-app-pub-9369472846382804/6274136018`
- **VOID SHIELD**: Neural protection startup layer.
- **Hardware Telemetry**: 60FPS real-time monitoring.
