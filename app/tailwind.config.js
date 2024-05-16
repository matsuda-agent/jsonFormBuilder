/** @type {import('tailwindcss').Config} */
export default {
  // note here I have had to add content key, we may have to hadd node_modules to this when we add the project to 
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}" , "../src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

