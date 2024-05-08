// tailwind.config.js
module.exports = {
  theme: {
      extend: {
          colors: {
              // Add custom colors
              primary: '#3490dc',
              secondary: '#ffed4a',
              danger: '#e3342f',
          },
          borderRadius: {
              // Add custom border-radius sizes
              'xl': '1rem',
          },
      },
  },
  plugins: [],
  content: [
      // Define the paths to files that will use Tailwind classes
      "./App.js",
      "./screens/**/*.{js,jsx,ts,tsx}",
      "./components/**/*.{js,jsx,ts,tsx}"
  ],
};
