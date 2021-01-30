const resolve = require('path').resolve
module.exports = {
	target: 'node',
	entry: './src/main.ts',
    output: {
		filename: 'main.js',
		path: resolve(__dirname,"out"),
    },
    resolve: {
		// 先尝试以ts为后缀的TypeScript源码文件
		extensions: ['.ts', '.js']
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/, 
				loader: 'awesome-typescript-loader'
			}
		]
	},
	devtool: 'source-map',
	optimization: {
		minimize: true,
	},
	mode: "production",
};
