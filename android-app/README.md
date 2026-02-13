# Candidate ATS Android App

This folder contains a native Android wrapper for the ATS web UI in this repository.

## What it does
- Launches a `WebView`-based Android app.
- Loads the ATS login page from bundled assets.
- Preserves local storage so login/candidate data remains on device.

## Run
1. Open `android-app` in Android Studio (Hedgehog or newer recommended).
2. Let Gradle sync complete.
3. Run the `app` configuration on an emulator or Android device.

## Notes
- The web files in `app/src/main/assets/` are copied from the root web app.
- Update those assets when you change the web UI.
