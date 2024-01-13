module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			[
				"module-resolver",
				{
					root: ["."],
					extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
					alias: {
						"@components": "./src/components",
						"@hooks": "./src/hooks",
						"@api": "./src/api",
						"@lib": "./src/lib",
						"@navigation": "./src/navigation",
						"@custom-types": "./src/types",
						"@utils": "./src/utils",
						"@screens": "./src/screens",
						"@store": "./src/store",
						"@navigators": "./src/navigators",
					},
				},
			],
		],
	};
};
