const Dotenv = require('dotenv-webpack');

const networkVars = {
	fantom: {
		NETWORK_NAME: 'Fantom',
		NETWORK_KEY: 'UUKDHMGTYBXWXMWEDV7YEE5K4RCB8DBUIJ',
		CHAIN_ID: 250,
		NETWORK_API_URL: 'https://api.ftmscan.com/api',
		MULTICALL2_ADDRESS: '0x557fD25F9169247000F9D866704b4Bc12680CE5f',
		// Contracts
		RARITY_ADDR: '0x3b32294Bc575b5C4C1E86a04B67d33B3F100fC4C',
		RARITY_ATTR_ADDR: '0x7e5E4eB92aE9e5E47a04e832d029a2E4186DD750',
		RARITY_GOLD_ADDR: '0x4471AdDcEa066c6C57101e686e8faD34a881F206',
		RARITY_SKILLS_ADDR: '0x23B036e2c0E79aA83339Ff8abb37D68054b3E357',
		RARITY_FEATS_ADDR: '0x74B5978d58fAd6A92372E6867596097B8F209bc6',	
		RARITY_CRAFTING_ADDR: '0x2D096Adf257Dc95Fb46D2d49753708547975172E',
		RARITY_LIBRARY_ADDR: '0x7a1a511f0faBB7BAc46185B612A250f108d4d103',
		RARITY_NAMES_ADDR: '0x74D16a57149bCbB4AeC84965426F66E258879012',
		
		GOVERNANCE_TOKEN_ADDR: '0x2fC49294398486f50302b7F1cDdd1eFdC7F9785C',
		WRAPPED_GOLD: '0xE00CBc6dEabdE185ED8d9C43856F89A6C7B280da',

		// Launch Party
		LAUNCH_MANAGER_ADDR: '0x5D8985f82632029dB4731E2b6efE67A26788dDfD',
		LAUNCH_TICKET_ADDR: '0xcBe3CA2583db2ea2B13737E115A7C94D10D77891',
		LAUNCH_ADVENTURERS_ADDR: '0xcDd13d641e61fe628F8aBEEabd31A17E04Ee4F98',
		LAUNCH_SUMMONERS_ADDR: '0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb',

		// Dungeon
		DUNGEON_THE_CELLAR_ADDR: '0x2617fb7eCE256b105151Eee2a573b024AB37A147',
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
