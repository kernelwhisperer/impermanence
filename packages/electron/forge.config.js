module.exports = {
  makers: [
    {
      config: {
        config: {
          // An URL to an ICO file to use as the application icon (displayed in Control Panel > Programs and Features).
          iconUrl: "./src/app-icon",
          // The ICO file to use as the icon for the generated Setup.exe
          setupIcon: "./src/app-icon",
        },
      },
      name: "@electron-forge/maker-squirrel",
    },
    // {
    //   name: '@electron-forge/maker-zip',
    //   platforms: ['darwin'],
    // },
    // {
    //   name: '@electron-forge/maker-deb',
    //   config: {},
    // },
    // {
    //   name: '@electron-forge/maker-rpm',
    //   config: {},
    // },
  ],
  packagerConfig: {
    appBundleId: "net.danielconstantin.impermanence",
    appCategoryType: "public.app-category.utilities",
    icon: "./src/app-icon",
    name: "Impermanence",
    win32metadata: {
      CompanyName: "hello@danielconstantin.net",
      FileDescription: "Desktop app for managing wallpapers.",
      InternalName: "Impermanence",
      OriginalFilename: "Impermanence.exe",
      ProductName: "Impermanence",
    },
  },
  rebuildConfig: {},
};
