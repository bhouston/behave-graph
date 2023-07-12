export default {
  content: [
    './public/index.html',
    './src/**/*.{js,ts,jsx,tsx,css}',
    '../../packages/flow/dist/**/*.{js,ts,jsx,tsx,css}'
  ],
  theme: {
    extend: {}
  },
  plugins: [
    {
      tailwindcss: {}
    },
    {
      autoprefixer: {}
    }
  ]
};
