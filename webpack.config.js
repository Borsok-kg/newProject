const path = require('path');

module.exports = {
    entry: ["./src/js/index.js"],
    output: {
        filename: 'bungle.js',
        path: path.resolve(__dirname, './dist')
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["env", "react"]
                    },
                },
                exclude: /node_modules/,
            }
        ]
    }
};
