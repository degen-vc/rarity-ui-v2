import {GTOKEN, GAME, BLOCKCHAIN} from 'utils/constants';

const TAVERN_NEWS = [
	{
		headline: 'Launch Party Announced!',
		text: `Bazifra the Innkeeper daughter has invited all the Adenturers in our World to a Lauch Party. But they most create and wear special costumes magically and randomly created for the event. A deal has been done with the costumed Rogues for 20% tax on all farmed ${GTOKEN}`
	},
	{
		headline: 'Roadmap revealed',
		text: `Follow the links in this site's footer to read ${GAME}'s new Docs which focus on the different tokens, tokenomics and other game mechanics.`
	},
	{
		headline: 'Information site updated',
		text: `${GAME}.gold information site is now completely up to date with game expansions information and every howto Adventurer could hope for.`
	},
	{
		headline: 'Dune dashboard',
		text: 'A dune dashboard will soon allow players to learn directly from the game smart contract\'s data how the World is developing and how players are behaving.'
	},
	{
		headline: 'Marketplace for Items under contruction',
		text: `A gold-only marketplace for Items will create a complimentary economy in ${GAME}'s in game currency $RG where goods, armor and weapons can be traded.`
	},
	{
		headline: `${GAME} is live on ${BLOCKCHAIN}`,
		text: `Let the games begin! By the way, all the metadata for ${GAME}'s NFTs (Adventurers and Items) are fully interoperable with Open Sea, the leading NFT marketplace.`
	},
	{
		headline: `${GAME} v2 conceived`,
		text: 'After a month of work on Rarity contracts, the team has decided on community governed algorithmic gold supply, gold can only be claimed by named Adventurers and there will be a fee for naming Adventurers, and code will make it easy for game developers to exclude purchased Adventurers and Items if they want only authentic non pay to play players to take part.'
	},
	{
		headline: 'Rarity forked',
		text: `Just hours after Rarity was deployed on the Fantom network, ${GAME} was created on ${BLOCKCHAIN}. But then we got to thinking, could we improve gold as a scarce in-game currency?`
	}
];

export default TAVERN_NEWS;

