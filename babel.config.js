module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        targets: {
          esmodules: true,
        },
      },
    ],
    '@babel/preset-typescript',
  ],
};
