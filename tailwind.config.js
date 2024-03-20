const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'crg-opacity': "url('/src/assets/crg-logo-opacity.svg')",
      }
    },
    screens: {
      'xs': 'max-375px',
      'ss': '275px',
    },
  },
  plugins: [],
});