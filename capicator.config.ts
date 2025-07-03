// capacitor.config.ts
const config = {
  appId: "com.aladin.app",
  appName: "Aladin",
  webDir: "dist",
  plugins: {
    LiveUpdates: {
      appId: "com.aladin.app",
      channel: "production",
      autoUpdateMethod: "background",
      maxVersions: 2,
      updateUrl: "https://aladinslots.com/live" // ✅ MUST BE A VALID LIVE ZIP PATH
    }
  }
};

export default config;
