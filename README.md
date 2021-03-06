# webpack4.x + vue2.x

本菜鸡主要是练习一下webpack配置前端工程化的流程，熟悉下webpack的配置，（vuecli一把梭真香）

遇到挺烦的问题就是工具版本的不兼容需要指定版本，有些在webpack-contrib上看到已经drop webpack4了似乎<br>
so update before check CHANGELOG!

大概涉及到：<br>
<li>模块化的语法：CommonJS规范，ES6的import和动态import()<br>
<br>
<li>webpack最基础的单入口模式，一些概念比如entry，ouput，loaders，plugins，modules，mode等等。
<li>webpack原生只支持js文件打包，且需要用到babel来使ES6+语法向后兼容。
<li>webpack对图片，css，stylus，jsx，vue这些文件的打包，通过在modules里配置rules，引入loaders来进行解析。最终编译到入口文件index.js中。我们在配置loaders的时候注意loaders的顺序是从右到左进行一层层解析的，比如stylus文件:use['style-loader','css-loader','stylus-loader'],style-loader的作用是对css-loader解析完成之后的css再写进html的style中，正式环境的时候应将css拎出来单独打包。
<li>vue-loader的热重载和webpack的HotModulePlugin
<li>环境变量的设置，生产环境和开发环境，这个我还做的不是很规范。windows不支持NODE_ENV=development的这样的设置方式，会报错。因此 cross-env 出现了。我们就可以使用 cross-env命令，这样我们就不必担心平台设置或使用环境变量了。在webpack.DefinePlugin对象中，process.env属性可以访问到环境变量。
