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
		RARITY_ATTR_ADDR: '0xF46756807c2DF32D9daa6C007C5081B9Ff4541f5',
		RARITY_GOLD_ADDR: '0xFE7FAE6182C2E93f45D867D5De63aF15802E994a',
		RARITY_SKILLS_ADDR: '0x71FC6e16C23De00A3097DCF63319341733C05c85',
		RARITY_FEATS_ADDR: '0xA42D6081DA80ae2725E99427A7765c8833c4203B',	
		RARITY_CRAFTING_ADDR: '0xC0100a03DB246c55BfE639Aa15e534Cc4576E815',
		RARITY_LIBRARY_ADDR: '0x6055890534024312edd95c2B1b6D52c245E536a3',
		RARITY_NAMES_ADDR: '0x83Ee793BC3FC02305E32c846285C4dE1BC42933f',
		
		GOVERNANCE_TOKEN_ADDR: '0xaBfd0087EAFc7D9334926A11FC0857Da18A396eF',
		WRAPPED_GOLD: '0x0f51d4841F9A8C85583bC644C0b809d455C71199',

		// Launch Party
		LAUNCH_MANAGER_ADDR: '0x5D8985f82632029dB4731E2b6efE67A26788dDfD',
		LAUNCH_TICKET_ADDR: '0xcBe3CA2583db2ea2B13737E115A7C94D10D77891',
		LAUNCH_ADVENTURERS_ADDR: '0xcDd13d641e61fe628F8aBEEabd31A17E04Ee4F98',
		LAUNCH_SUMMONERS_ADDR: '0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb',

		// Dungeon
		DUNGEON_THE_CELLAR_ADDR: '0xeC274c17d400bFE704751251683f804EDe91183b',
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
		
		RARITY_CRAFTING_ID: '0',

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
