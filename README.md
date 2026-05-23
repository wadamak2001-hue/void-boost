
# VOID BOOST | Native Android Edition

This project is configured as a **Capacitor-Ready Native Android App** with an automated Cloud Build pipeline via GitHub Actions.

## Cloud APK Build Instructions (No PC Required)

Since you are working from a mobile device or tablet, we have optimized the build process to run entirely in the cloud.

### 1. Configure GitHub
- Create a new repository named `void-boost` on your GitHub account (`wadamak2001-hue`).
- Generate a **Personal Access Token (classic)** with `repo` scope permissions.

### 2. Trigger the Build from the App
- Open the **VOID BOOST** app in your workspace preview.
- Scroll down to the **CLOUD APK BUILDER** section on the main dashboard.
- Paste your **GitHub Token**.
- Ensure the repository path is `wadamak2001-hue/void-boost`.
- Click **START CLOUD APK BUILD**.

### 3. Download the APK
- Go to the **Actions** tab in your GitHub repository.
- You will see a workflow named "Build VOID BOOST APK" running.
- Once it finishes (approx. 5 minutes), click on the run.
- Scroll to the **Artifacts** section and download the `VOID-BOOST-Debug-APK`.

## Native Features Integrated
- **AdMob**: Real banner and interstitial ads using IDs:
  - App ID: `ca-app-pub-9369472846382804~2223210364`
  - Unit ID: `ca-app-pub-9369472846382804/6274136018`
- **Capacitor**: Native bridge for Android system intents and hardware monitoring.
- **RTL Support**: Optimized for Arabic and English layouts.
