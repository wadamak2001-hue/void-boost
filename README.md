
# VOID BOOST | Native Android Edition

This project is now configured as a **Capacitor-Ready Native Android App**.

## How to Build the APK

To generate your own Android `.APK` file, follow these steps on your local computer:

### 1. Initial Setup
Ensure you have **Node.js** and **Android Studio** installed on your machine.

### 2. Export the Web Project
Run the following command to build the static web assets:
```bash
npm run static
```

### 3. Initialize the Android Project
If you haven't added the android platform yet, run:
```bash
npx cap add android
```

### 4. Sync Your Code
Anytime you make changes to the UI, sync them to the Android project:
```bash
npm run cap:sync
```

### 5. Build in Android Studio
Open the project in Android Studio:
```bash
npm run cap:open-android
```
Once Android Studio opens:
- Wait for Gradle to finish syncing.
- Go to `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`.
- Your `.apk` file will be located in `android/app/build/outputs/apk/debug/`.

## Key Native Features
- **Android Intent Support**: Direct launching of installed games via package name.
- **RTL RTL Optimization**: Fully localized for Arabic users.
- **Hardware Telemetry**: Real-time performance monitoring.
