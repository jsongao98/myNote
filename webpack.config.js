const path = require("path"); //nodejs 基本包，绝对路径
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HTMLPlugin = require("html-webpack-plugin");
const webpack = require("webpack"); // 引入webpack自身有的东西，插件

const isDev = process.env.NODE_ENV === "development";
//设置环境变量来让webapack判断脚本启动时候（NODE_ENV变量名在process.env可以被访问到）的NODE_ENV是pro还是dev

const config = {
  target: "web",
  entry: {
    main: path.join(__dirname, "src/index.js"),
  },
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },
  plugins: [
    new VueLoaderPlugin(), //vue-loader版本超过15需要在webpack配置中使用plugin插件
    new HTMLPlugin(), //web基础配置，需要一个html来挂载js
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: isDev ? '"development"' : '"production"',
      },
    }), //自己js代码中（框架中）可以引用到process.env来判断
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader", //loader API
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.styl/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: { sourceMap: true },
          },
          "stylus-loader",
        ],
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: "url-loader", //url-loader将图片文件写入js中减少http请求,是file-loader的封装
            options: {
              limit: 1024, //图片小于1024kb
              name: "[name].[ext]",
            }, //每个loader都可以进行配置options
          },
        ],
      },
    ],
  },
};

if (isDev) {
  config.devtool = "#cheap-module-eval-source-map";
  //在webpack2中所有关于webpack-dev-serve的配置都可以通过devServer来进行设置
  config.devServer = {
    port: 8080,
    host: "0.0.0.0",
    overlay: {
      errors: true, //网页上可以显示报错
    },
    // hot: true,vue-loader支持热重载
  };
}

module.exports = config;
