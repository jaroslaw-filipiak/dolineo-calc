const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.output.filename = 'js/[name].min.js';
      config.output.chunkFilename = 'js/[name].min.js';
    } else {
      config.output.filename = 'js/[name].js';
      config.output.chunkFilename = 'js/[name].js';
    }
  },
  css: {
    extract: {
      filename: 'my-assets/css/[name].css',
      chunkFilename: 'my-assets/css/[id].css',
    },
  },
});
