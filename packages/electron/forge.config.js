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
    icon: "./src/app-icon", // no file extension required
  },
  rebuildConfig: {},
};
