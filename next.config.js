/******************************************************************************
**	@Author:				The Ape Community
**	@Twitter:				@ape_tax
**	@Date:					Wednesday August 11th 2021
**	@Filename:				next.config.js
******************************************************************************/

const Dotenv = require('dotenv-webpack');

const networkVars = {
	polygon: {
		NETWORK_NAME: 'Polygon',
		NETWORK_KEY: 'DTV5YPK2WGU2HNC9P3XEKFF6ZYQZPVPRAP', //process.env.POLYGON_KEY,
		CHAIN_ID: 137,
		NETWORK_API_URL: 'https://api.polygonscan.com/api',
		MULTICALL2_ADDRESS: '0x557fD25F9169247000F9D866704b4Bc12680CE5f',

		ADD_ETH_CHAIN_PARAM: JSON.stringify({
			'chainId': '0x89',
			'blockExplorerUrls': ['https://polygonscan.com/'],
			'chainName': 'Polygon',
			'rpcUrls': ['https://rpc-mainnet.matic.network/'],
			'nativeCurrency': {
				'name': 'Polygon',
				'symbol': 'MATIC',
				'decimals': 18
			}
		}),

		// Contracts
		RARITY_ADDR: '0x2a8ac1b2fCB475C7646f93b6E69930d1eB67c053',
		RARITY_ATTR_ADDR: '0x4Cd9F4a466356201EF815014C16fd0E001594D91',
		RARITY_GOLD_ADDR: '0xEf08998190aAeC378AE1972b7A6d90B7F1Ce6b95',
		SXGV_TOKEN: '0x38a8bB1d15a3c6108035DffAbd02346c64dBF872',
		RARITY_SKILLS_ADDR: '0x0Cb0F5bcdBe1D90C5AEC0b0A4a6a004455Ee0D71',
		
		RARITY_CRAFTING_ADDR: '0xf919BAbE92EE19af2922F2EdE9185Ff32562D9D3',
		RARITY_LIBRARY_ADDR: '0x569AfD875DB7542A019E0c96eB04f9090C8dC527',	// Polygon only

		RARITY_NAMES_ADDR: '0x181746D67F9a459181910F262739802b89071f06',
		USDC_ADDR: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
		USDC_PROXY_ADDR: '0xDD9185DB084f5C4fFf3b4f70E7bA62123b812226',
		WRAPPED_GOLD: '0xAfeDb81EE72EDe29c08AE350c5a7AF60D4Eb7162',
		SCARCITY_GOLD: '0x49Cc4B94DDA8F3b0C9904944199C6eA8A134B3bd',



		// Dungeon
		DUNGEON_THE_CELLAR_ADDR: '0xE3662B67cfbc7aE238e50480C9fA61cB9A28aD96',
	},
};

module.exports = ({
	eslint: {
		ignoreDuringBuilds: true,
	},
	plugins: [
		new Dotenv()
	],
	env: {
		...networkVars['polygon'],

		NETWORK: 'polygon',
		WEBSITE_URI: process.env.WEBSITE_URI || 'https://adventure.major.tax/',
		
		RARITY_CRAFTING_ID: '1758709',

		ZAP_VAULT_ADDR: '0xfCE6CbeF3867102da383465cc237B49fF4B9d48F',
		FTM_VAULT_ADDR: '0x0dec85e74a92c52b7f708c4b10207d9560cefaf0',

		DAI_VAULT_ADDR: '0x637eC617c86D24E421328e6CAEa1d92114892439',
		DAI_TOKEN_ADDR: '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E',
		WFTM_TOKEN_ADDR: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83'
	},
	optimization: {
		minimize: true,
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: 25,
			minSize: 20000
		}
	},
	webpack: (config, {webpack}) => {
		config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
		return config;
	},
	webpackDevMiddleware: (config) => {
		// Perform customizations to webpack dev middleware config
		// Important: return the modified config
		return config;
	},
});
