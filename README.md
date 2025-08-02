

# **Odara E‑Commerce Platform — Developer Documentation**

**How to Run the React Native App (Expo CLI)**

---

## **1. Overview**

Odara is an e‑commerce platform for Africans, built with **React Native** and powered by **Expo CLI**.
This documentation guides developers, testers, and collaborators on how to set up, install dependencies, and run the Odara app locally or on a device.

---

## **2. Prerequisites**

Before running Odara, ensure you have the following installed:

### **System Requirements**

* **Operating System**: Windows, macOS, or Linux
* **Node.js**: v18 or newer
* **npm** or **yarn** (comes with Node.js)
* **Expo CLI**: Latest version
* **Expo Go App** (for testing on physical devices)

  * Android: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
  * iOS: [Apple App Store](https://apps.apple.com/app/expo-go/id982107779)

### **Recommended Tools**

* **Visual Studio Code** (or any preferred code editor)
* **Git** (for cloning the repository)

---

## **3. Getting the Source Code**

You can either **clone the repository** (if hosted on GitHub or GitLab) or download it as a `.zip` file.

```bash
# Clone repository
git clone https://github.com/<your-org>/odara.git

# Navigate into the project folder
cd odara
```

---

## **4. Installing Dependencies**

Odara uses dependencies specified in `package.json`. Install them with:

```bash
# Install dependencies
npm install
# OR using yarn
yarn install
```

This will install all required libraries such as **React Navigation**, **Axios**, **Redux Toolkit**, and other project dependencies.

---

## **5. Starting the App**

Once dependencies are installed, you can run the app:

```bash
# Start the Expo development server
npx expo start
```

You will see the **Metro Bundler** start in your terminal or browser.

---

## **6. Running on Different Devices**

You can run Odara on:

### **📱 Physical Device**

1. Install **Expo Go** app from Play Store or App Store.
2. Scan the QR code displayed in your terminal or browser.
3. The app will load directly on your phone.

### **🖥 Android Emulator**

1. Install **Android Studio** and create an emulator.
2. Ensure the emulator is running.
3. In the Metro Bundler, press:

   ```
   a
   ```

   to launch the app on the Android emulator.

### **💻 iOS Simulator** (macOS only)

1. Install Xcode and set up an iOS Simulator.
2. In the Metro Bundler, press:

   ```
   i
   ```

   to launch the app on the iOS Simulator.

---

## **7. Environment Variables (Optional)**

If Odara uses environment variables (e.g., API URLs, keys), make sure to create a `.env` file in the project root:

```env
API_BASE_URL=https://api.odara.africa
PAYMENT_GATEWAY_KEY=your_payment_key
```

Ensure that the `.env` file is not committed to version control (add it to `.gitignore`).

---

## **8. Common Commands**

| Command                  | Description                                 |
| ------------------------ | ------------------------------------------- |
| `npx expo start`         | Start development server                    |
| `npx expo start --clear` | Clear cache and start fresh                 |
| `npm run android`        | Run app on Android emulator                 |
| `npm run ios`            | Run app on iOS simulator (Mac only)         |
| `npm run web`            | Run app in browser (Web support if enabled) |

---

## **9. Troubleshooting**

* **App not loading / blank screen**
  Run:

  ```bash
  npx expo start --clear
  ```
* **Expo Go not connecting**
  Ensure your device and computer are on the **same Wi‑Fi network**.
* **Dependencies error**
  Delete `node_modules` and reinstall:

  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

---

## **10. Closing Notes**

You now have Odara running on your preferred environment.
For production builds:

```bash
npx expo build:android
npx expo build:ios
```

Or migrate to **EAS Build** for advanced app store deployments.

---

