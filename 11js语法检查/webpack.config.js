/**
 * 语法检查：ESLint
 * 安装：eslint-loader eslint
 * 注意：只检查自己写的源代码，第三方库不检查（使用exclude排除）
 * 设置检查规则：在package.json中eslintConfig中配置
 * "eslintConfig": {  // 设置之后，就会对文件经行规范判断了，即起作用
    "extends": "airbnb-base"
  }
 *
 * 推荐使用规则:airbnb
 * 安装：eslint-config-airbnb-base eslint eslint-plugin-import
 * https://www.npmjs.com/package/eslint-config-airbnb-base
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/build.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // 自动修复
          fix: true,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'development',
};
