const path = require('path');
const webpack = require('webpack');


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
                use: [
                    'style-loader',
                    'css-loader?url=false',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')('last 2 versions')]
                        }
                    },
                    'stylus-loader'
                ]
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],

    devServer: {
        inline: true,
        contentBase: './public',
        port: 7070,
        host: 'localhost',
    },

    devtool: 'cheap-eval-source-map',

    resolve: {
        extensions: ['.js', '.json', '*']
    }
};