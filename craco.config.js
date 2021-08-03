const path = require("path");

module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  webpack: {
    alias: {
      Icons: path.resolve(__dirname, "src/components/Icons"),
      components: path.resolve(__dirname, "src/components"),
      hooks: path.resolve(__dirname, "src/hooks"),
      settings: path.resolve(__dirname, "src/settings"),
      utils: path.resolve(__dirname, "src/utils"),
    },
  },
};
