// tailwind.config.js
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // adjust according to your paths
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require("tailwindcss-animate"), // must be here
    ],
};
