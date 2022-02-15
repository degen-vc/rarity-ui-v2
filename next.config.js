const Dotenv = require('dotenv-webpack');

const networkVars = {
	fantom: {
		NETWORK_NAME: 'Fantom',
		NETWORK_KEY: 'UUKDHMGTYBXWXMWEDV7YEE5K4RCB8DBUIJ',
		CHAIN_ID: 250,
		NETWORK_API_URL: 'https://api.ftmscan.com/api',
		MULTICALL2_ADDRESS: '0x557fD25F9169247000F9D866704b4Bc12680CE5f',
		// Contracts
		RARITY_ADDR: '0xcDd13d641e61fe628F8aBEEabd31A17E04Ee4F98',
		// RARITY_ABI: require('./utils/abi/rarity.abi.js'),
		
		RARITY_ATTR_ADDR: '0xF46756807c2DF32D9daa6C007C5081B9Ff4541f5',
		// RARITY_ATTR_ABI: require('./utils/abi/rarityAttr.abi.js'),

		RARITY_GOLD_ADDR: '0xFE7FAE6182C2E93f45D867D5De63aF15802E994a',
		// RARITY_GOLD_ABI: require('./utils/abi/rarityGold.abi.js'),

		RARITY_SKILLS_ADDR: '0x71FC6e16C23De00A3097DCF63319341733C05c85',
		// RARITY_SKILLS_ABI: require('./utils/abi/Skills.abi.js'),

		RARITY_FEATS_ADDR: '0xA42D6081DA80ae2725E99427A7765c8833c4203B',
		// RARITY_FEATS_ABI: require('./utils/abi/rarityFeats.abi.json'),
		
		RARITY_CRAFTING_ADDR: '0xC0100a03DB246c55BfE639Aa15e534Cc4576E815',
		// RARITY_CRAFTING_ABI: require('./utils/abi/rarityCrafting.abi.js'),

		RARITY_LIBRARY_ADDR: '0x6055890534024312edd95c2B1b6D52c245E536a3',
		// RARITY_LIBRARY_ABI: require('./utils/abi/rarityLibrary.abi.js'),

		RARITY_NAMES_ADDR: '0x83Ee793BC3FC02305E32c846285C4dE1BC42933f',
		// RARITY_NAMES_ABI: require('./utils/abi/rarityNames.abi.js'),
		
		// Dungeon
		DUNGEON_THE_CELLAR_ADDR: '0xeC274c17d400bFE704751251683f804EDe91183b',
		// DUNGEON_THE_CELLAR_ABI: require('./utils/abi/dungeonTheCellar.abi.js'),

		// Transfer (TODO: remove this)
		TRANSFER_GOLD_ADDR: '0xFE7FAE6182C2E93f45D867D5De63aF15802E994a',
		// TRANSFER_GOLD_ABI: require('./utils/abi/rarityGold.abi.js'),
		TRANSFER_MATERIALS_ADDR: '0xeC274c17d400bFE704751251683f804EDe91183b',
		// TRANSFER_MATERIALS_ABI: require('./utils/abi/dungeonTheCellar.abi.js'),

		// WTF(??)
		USDC_ADDR: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // ????
		SXGV_TOKEN: '0xa6e91fe4fcbdb2747628d6d6972b0374382896a3', // ????
		USDC_PROXY_ADDR: '0xDD9185DB084f5C4fFf3b4f70E7bA62123b812226', // ????
		WRAPPED_GOLD: '0x0f51d4841F9A8C85583bC644C0b809d455C71199', // ????
		SCARCITY_GOLD: '0x49Cc4B94DDA8F3b0C9904944199C6eA8A134B3bd', // ????
		SGV_TOKEN_ADDR: '0xa6E91Fe4FcbDB2747628d6D6972B0374382896a3', // ????

		// Lands
		// LANDS_GAME_ADDR: '0xFf602571Dd73B7557a180b4917d334773A5c94e9',
		// Launch
		// MANAGER_SKIN_ADDR: '0x781394c4878e217A02CD66248df86dc4dC427738',
		// COMMON_SKIN_ADDR: '0x2AF8F4B4F82051e3Ae985422AC71f591c428decC'
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
		...networkVars['fantom'],

		NETWORK: 'fantom',
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
		return config;
	},
});
