/** @type {import('@vue/cli-service/types').ProjectOptions} */
module.exports = {
  transpileDependencies: true,
  lintOnSave: false,
  publicPath:
    process.env.NODE_ENV === 'production' ? '/awesome-web/learn-vue/' : '/',
};
