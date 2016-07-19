var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var srcDir = path.resolve(process.cwd(), 'src');
var srcOut = path.resolve(process.cwd(), 'dist');


function getEntry() {
	var jsPath = path.resolve(srcDir, 'js');
	var dirs = fs.readdirSync(jsPath);
	var matchs = [], files = {};
	dirs.forEach(function (item) {
		matchs = item.match(/(.+)\.js$/);
		console.log(matchs);
		if (matchs) {
			files[matchs[1]] = path.resolve(srcDir, 'js', item);
		}
	});
	console.log(JSON.stringify(files));
	return files;
}

module.exports = {
	entry: getEntry(),
	// devtool : 'source-map',
	output: {
		path: path.resolve(srcOut, 'js'),
		publicPath: '', //代码分割出来的位置
		filename: "[name].js",
		chunkFilename: "[chunkhash].js",
		library: "[name]",
		libraryTarget: "var", //打包格式
	},
	devtool: false,
	module : {
		loaders : [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader : "babel"
			}, //支持ES6
		]
	},
	babel: {
		presets: ['es2015']
	},
	publicPath: './dist/',
	// 将jQuery全局变量变为模块可引
	externals: { jquery: "jQuery" },
	plugins: [
		new webpack.optimize.CommonsChunkPlugin("common.js"),
		// 提供全局的变量，在模块中使用无需用require引入
		new webpack.ProvidePlugin({
			jQuery: "jquery",
			$: "jquery",
			"window.jQuery": "jquery"
		}),
	],
	// watch : true
};
