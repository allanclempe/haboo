import * as webpack from "webpack";
import * as path from "path";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
const PathOverridePlugin = require("./tools/replace-path");

let envIndex = process.argv.indexOf("--env");
const env = (envIndex === -1 ? "dev" : process.argv[++envIndex]);

const config: webpack.Configuration = {
    entry: [
        "react-hot-loader/patch",
        "./src/styles/global.scss",
        "./src/index.tsx",
    ],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            "@haboo/haboo-sdk": path.resolve(__dirname, "./src/sdk")
        }
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new PathOverridePlugin(/config\/config.dev/, `config/config.${env}`),
        new HtmlWebpackPlugin({
            title: "haboo",
            chunksSortMode: "dependency",
            template: path.resolve(__dirname, "./src/index.html")
        }),
    ],

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "awesome-typescript-loader",
                        options: {
                            silent: true,
                            useCache: true,
                            useTranspileModule: true,
                            transpileOnly: true,
                            cacheDirectory: path.resolve(__dirname, ".cache", "typescript"),
                        },
                    },
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        query: {
                            sourceMap: false,
                            modules: true,
                            importLoaders: 1,
                            localIdentName: "[name]-[local]_[hash:base64:5]",
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: false,
                            includePaths: [
                                path.resolve(__dirname, "src", "styles"),
                            ],
                        },
                    }
                ],
            }
        ]
    },

    devServer: {
        hot: true,
        historyApiFallback: true
    }

};

export default config;
