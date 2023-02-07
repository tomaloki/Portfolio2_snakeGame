module.exports = {
    mode: 'development',
    entry: './src/frontend/index.ts',
    output: {
        path: __dirname + '/assets',
        filename: 'frontend.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    configFile: 'tsconfig.frontend.json',
                },
            },
        ],
    },
};
