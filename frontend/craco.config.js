module.exports = {
  webpack: {
    alias: {
      "react-refresh/runtime.js": require.resolve("react-refresh/runtime")
    }
  },
  reactScriptsVersion: "react-scripts",
  style: {
    css: {
      loaderOptions: () => {
        return {
          url: false,
        };
      },
    },
  },
};