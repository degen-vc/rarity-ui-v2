/******************************************************************************
**	@Author:				The Ape Community
**	@Twitter:				@ape_tax
**	@Date:					Wednesday August 11th 2021
**	@Filename:				next.config.js
******************************************************************************/

const Dotenv = require('dotenv-webpack');

const networkVars = {
	ftm: {
		NETWORK_NAME: 'Fantom',
		NETWORK_KEY: process.env.FMT_KEY,
		CHAIN_ID: 250,
		NETWORK_API_URL: 'https://api.ftmscan.com/api',
		MULTICALL_ADDRESS: '0xc04d660976c923ddba750341fe5923e47900cf24',
		ADD_ETH_CHAIN_PARAM: JSON.stringify({
			'chainId': '0xFA',
			'blockExplorerUrls': ['https://ftmscan.com'],
			'chainName': 'Fantom Opera',
			'rpcUrls': ['https://rpc.ftm.tools'],
			'nativeCurrency': {
				'name': 'Fantom',
				'symbol': 'FTM',
				'decimals': 18
			}
		}),

		// Contracts
		RARITY_ADDR: '0x44c37Eef72F5C141fa95896030BC6c0A0c16325B',
		RARITY_ATTR_ADDR: '0x9e2f4677b48ebE83F70Cf9EfD32bAE98CAa9faf5',
		RARITY_GOLD_ADDR: '0x49Cc4B94DDA8F3b0C9904944199C6eA8A134B3bd',
		RARITY_SKILLS_ADDR: '0x639bc6637e4b861C8DED7955b1c715A509Cef99c',
		
		RARITY_CRAFTING_ADDR: '0x4DC7c7E689b52d217Ce4D5664aD14C5089A9EfBb',
		RARITY_CRAFTING_HELPER_ADDR: '0xf3a69301d1492493eB50c330aEE58402C4bcfA1D',	// FTM Only

		RARITY_XP_PROXY: '0x640bdeff13ae5527424acd868F65357270b05eB8',
		RARITY_NAMES_ADDR: '0x181746D67F9a459181910F262739802b89071f06',

		USDC_ADDR: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
		USDC_PROXY_ADDR: '0xDD9185DB084f5C4fFf3b4f70E7bA62123b812226',


		// Dungeon
		DUNGEON_THE_CELLAR_ADDR: '0x2A0F1cB17680161cF255348dDFDeE94ea8Ca196A',
		DUNGEON_THE_FOREST_ADDR: '0x48e6F88F1Ab05677675dE9d14a705f8A137ea2bC',
		DUNGEON_THE_FOREST_V1_ADDR: '0xb37d3d79ea86B0334d9322c695339D577A3D57be',
	},
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
			'rpcUrls': ['https://rpc-mainnet.matic.network'],
			'nativeCurrency': {
				'name': 'Polygon',
				'symbol': 'MATIC',
				'decimals': 18
			}
		}),

		// Contracts
		RARITY_ADDR: '0x44c37Eef72F5C141fa95896030BC6c0A0c16325B',
		RARITY_ATTR_ADDR: '0x9e2f4677b48ebE83F70Cf9EfD32bAE98CAa9faf5',
		RARITY_GOLD_ADDR: '0x49Cc4B94DDA8F3b0C9904944199C6eA8A134B3bd',
		RARITY_SKILLS_ADDR: '0x639bc6637e4b861C8DED7955b1c715A509Cef99c',
		
		RARITY_CRAFTING_ADDR: '0x4DC7c7E689b52d217Ce4D5664aD14C5089A9EfBb',
		RARITY_LIBRARY_ADDR: '0x9B43AAD058967aB21ff6E0427E6f430aaE08bf8e',	// Polygon only

		RARITY_NAMES_ADDR: '0xb498A24029E10369d464006e511E3062A29Fa197',
		USDC_ADDR: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
		USDC_PROXY_ADDR: '0xDD9185DB084f5C4fFf3b4f70E7bA62123b812226',



		// Dungeon
		DUNGEON_THE_CELLAR_ADDR: '0xE3662B67cfbc7aE238e50480C9fA61cB9A28aD96',
	},
};

module.exports = ({
	plugins: [
		new Dotenv()
	],
	env: {
		...networkVars[process.env.NETWORK],

		NETWORK: process.env.NETWORK,
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
