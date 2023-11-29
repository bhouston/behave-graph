export default {
  branches: ['main'], // Adapt to your branch setup
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        npmPublish: false // Lerna will handle the publishing
      }
    ],
    [
      'semantic-release-lerna',
      {
        lernaCommand: 'npx lerna'
      }
    ],
    '@semantic-release/git'
  ]
};
