/** @type {import('@vue/cli-service/types').ProjectOptions} */
module.exports = {
  transpileDependencies: true,
  lintOnSave: false,
  productionSourceMap: false,
  publicPath:
    process.env.NODE_ENV === 'production' ? '/awesome-web/learn-vue/' : '/',
};
