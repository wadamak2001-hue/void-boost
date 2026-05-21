
# VOID BOOST | Native Android Edition

This project is now configured as a **Capacitor-Ready Native Android App** with a built-in Cloud Build pipeline.

## How to Get Your APK (No PC Required)

Since you don't have a PC or Android Studio, we have set up a **GitHub Actions Pipeline** to build the APK for you in the cloud.

### 1. Push to GitHub
Upload this code to a new repository on your GitHub account.

### 2. Trigger the Build
- Go to the **Actions** tab in your GitHub repository.
- You will see a workflow named "Build VOID BOOST APK".
- It will trigger automatically on every push, or you can run it manually.

### 3. Download the APK
- Once the build finish (usually takes 3-5 minutes), click on the completed run.
- Scroll down to the **Artifacts** section.
- Download the `VOID-BOOST-Debug-APK` zip file, extract it, and install the `.apk` on your phone.

## Key Native Features
- **Android Intent Support**: Direct launching of installed games via package name.
- **RTL Optimization**: Fully localized for Arabic users.
- **Hardware Telemetry**: Real-time performance monitoring via native-simulated bridges.
- **Cloud Build Ready**: Automated APK generation via GitHub Actions.
