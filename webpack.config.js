var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var plugins = [
    // new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.ProvidePlugin({
        'Promise': 'imports?this=>global!exports?global.Promise!es6-promise', // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
        'fetch': 'imports?this=>global!exports?global.fetch!fetch'
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./dist/vendor-manifest.json')
    })
];
if (process.env.NODE_ENV === 'production') {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    )
    // plugins.unshift(
    //     new webpack.optimize.CommonsChunkPlugin('vendor', 'build_vendor.bundle.js')
    // )
    // plugins.unshift(
    //     new webpack.IgnorePlugin(/react|react-dom|react-redux|react-router|react-router-redux|redux|es6-promise|rc-animate|redux-actions/)
    // )
}

module.exports = {
    debug: process.env.NODE_ENV !== 'production',
    context: path.join(__dirname, './src'),
    entry: {
        jsx: './index.js',
        html: ['./index.html', './dist.html'],
        // vendor: [
        //     'react',
        //     'react-dom',
        //     'react-redux',
        //     'react-router',
        //     'react-router-redux',
        //     'redux',
        //     'redux-actions'
        // ]
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js',
    },
    module: {
        // noParse: [
        //     path.resolve(__dirname, './node_modules/react/dist/react.min.js')
        // ],
        loaders: [{
            test: /\.html$/,
            loader: 'file?name=[name].[ext]'
        }, {
            test: /\.css$/,
            include: /src|node_modules/,
            loader: 'style!css!autoprefixer'
        }, {
            test: /\.less$/,
            include: /src/,
            loader: 'style!css!autoprefixer!less'
        }, , {
            test: /\.lessm$/,
            include: /src/,
            loader: 'style!css?modules!autoprefixer!less'
        }, {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loaders: [
                'react-hot',
                'babel-loader?cacheDirectory'
            ]
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url-loader?limit=8192'
        }, {
            test: /\.(woff|woff2|eot|ttf)$/,
            loader: 'url-loader'
        }],
    },
    resolve: {
        // fallback: path.join(__dirname, "node_modules"),
        extensions: ['', '.js', '.jsx'],
        // externals:{
        //     "react": "React",
        //     'react-dom': '',
        //     'react-redux': '',
        //     'react-router': '',
        //     'react-router-redux': '',
        //     'redux':''
        // }
        // alias:{
        //     'react$': path.resolve(__dirname, './node_modules/react/dist/react.min.js')
        // }
    },
    resolveLoader: {
        // fallback: path.join(__dirname, "node_modules")
    },
    plugins: plugins,
    devServer: {
        contentBase: './src',
        hot: true,
        proxy: {
            '/usercollect/*': {
                target: 'http://www.8zcloud.com:88',
                host: 'www.8zcloud.com'
            },
            '/api/*': {
                target: 'http://www.8zcloud.com:88',
                host: 'www.8zcloud.com'
            },
            '/user/*': {
                target: 'http://www.8zcloud.com:88',
                host: 'www.8zcloud.com'
            },
            '/auth/*': {
                target: 'http://www.8zcloud.com:88',
                host: 'www.8zcloud.com'
            },
            '/temp/*': {
                target: 'http://www.8zcloud.com:88',
                host: 'www.8zcloud.com'
            },
            '/content/*': {
                target: 'http://www.8zcloud.com:88',
                host: 'www.8zcloud.com'
            },
            '/userwords/*': {
                target: 'http://www.8zcloud.com:88',
                host: 'www.8zcloud.com'
            },
            '/it/*': {
                target: 'http://www.8zcloud.com:88',
                host: 'www.8zcloud.com'
            },
            '/upload/*': {
                target: 'http://imgs.i8za.com',
                host: 'imgs.i8za.com'
            },
            '/getfiles*': {
                target: 'http://imgs.i8za.com',
                host: 'imgs.i8za.com'
            },
            '/sendhistory/*': {
                target: 'http://www.8zcloud.com:88',
                host: 'www.8zcloud.com'
            },
            '/usersend/*': {
                target: 'http://www.8zcloud.com:88',
                host: 'www.8zcloud.com'
            },
            '/toutiao/*': {
                target: 'http://www.8zcloud.com:88',
                host: 'www.8zcloud.com'
            }

            // '/api/collectpager': {
            //     target: 'http://www.8zcloud.com'
            // },
            // '/api/hehheheh': {
            //     target: {
            //         ret: 0,
            //         data: {
            //             hehe: 1
            //         }
            //     }
            //     // target: 'http://www.8zcloud.com'
            // }
        }
    },
    // profile: true,
    // stats: {
    //     hash: true,
    //     version: true,
    //     timings: true,
    //     assets: true,
    //     chunks: true,
    //     modules: true,
    //     reasons: true,
    //     children: true,
    //     source: false,
    //     errors: true,
    //     errorDetails: true,
    //     warnings: true,
    //     publicPath: true
    // },
}
