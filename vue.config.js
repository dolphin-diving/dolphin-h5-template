const webpack = require('webpack')
module.exports = {
    /* 生产环境的source map */
    productionSourceMap: false,
    publicPath: './',
    devServer: {
        port: 8084, // 端口号
        host: '0.0.0.0',
        open: false, //配置自动启动浏览器
    },
    chainWebpack:config=>{/*vue-cli3必须加上，否则路由懒加载会失效*/
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
    },
	configureWebpack: {
		// plugins: [
		// 	new webpack.ProvidePlugin({
		// 		$:'jquery',
		// 		jQuery:'jquery',
		// 		'windows.jQuery':'jquery'
		// 	})
		// ],
		externals:{
			mdSmartios: 'mdSmartios',
			'windows.mdSmartios':'mdSmartios'
		}
	}
}
