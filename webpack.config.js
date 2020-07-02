const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {
    const isProduction = options.mode === 'production';

    const config = {
        mode: isProduction ? 'production' : 'development',
        watch: !isProduction,
        entry: ['./singolo/src/style.css', './singolo/src/assets/fonts/fonts.css'],
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'main.js',
        },
        module: {
            rules: [{
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                }, {
                    test: /\.(png|svg|jpe?g|gif|eot|ttf|woff|woff2)$/i,
                    use: [{
                        loader: 'file-loader',
                    }],
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                    options: {
                        attributes: {
                            list: [{
                                tag: 'img',
                                attribute: 'src',
                                type: 'src',
                            }, ]
                        }
                    },
                }
            ],
        },

        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: 'singolo/index.html'
            }),
            new MiniCssExtractPlugin({
                filename: 'style.css'
            }),
        ],
    }

    return config;
}