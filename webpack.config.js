// webpack v4
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');


const postcss = {
    loader: 'postcss-loader',
    options: {
        plugins: () => [require('autoprefixer')({
            'browsers': ['> 1%', 'last 2 versions']
        })],
    }
};


module.exports = {
    entry: {
        main: './src/app/index.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        stats: "errors-only",
        open: true,
        publicPath: '/'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },


    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },

            {
                test: /\.scss$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader?url=false', postcss, 'sass-loader?sourceMap']
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,

                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings

                        name: 'images/[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [

        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/public/index.html',
            filename: 'index.html'
        }),
        new CopyWebpackPlugin([{
            from: './src/images',
            to: 'images'
        }]),
    ]
};