module.exports = function (api) {
    api.cache(true)

    const presets = ['babel-preset-expo']
    const plugins = [
        [
            'module:react-native-dotenv',
            {
                moduleName: '@env',
            },
        ],
        ['nativewind/babel'],
        ['module:@preact/signals-react-transform'],
    ]

    return {
        presets,
        plugins,
    }
}
