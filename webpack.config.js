const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: './src/app.js',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015'],
                            plugins: [
                                ["transform-class-properties", { "spec": true }]
                            ]
                        }
                    }
                ]
            },
            {
				test: /\.styl$/,
				loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader?url=false',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: () => [ require('autoprefixer')('last 2 versions') ]
                                }
                            },
                            'stylus-loader'
                        ]
                    }   
                )
			}
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new ExtractTextPlugin({
            filename: ('styles.css')
        })
    ],

    devServer: {
        inline: true,
        contentBase: './public',
        port: 7070,
        host: '0.0.0.0',
    },

    devtool: 'cheap-eval-source-map',

    resolve: {
        extensions: ['.js', '.json', '*']
    }
};