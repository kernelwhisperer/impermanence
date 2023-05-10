module.exports = {
  makers: [
    {
      config: {},
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
