import	{useState, useEffect, useContext, createContext}	from	'react';
import	useWeb3													from	'contexts/useWeb3';
import	{ethers}												from	'ethers';
import	{Contract}									from	'ethcall';
import	useSWR													from	'swr';
import	ModalCurrentAdventurer									from	'components/ModalCurrentAdventurer';
import	{chunk, fetcher, toAddress, newEthCallProvider}					from	'utils';
import	ITEMS																from	'utils/codex/items';
import	RARITY_ABI													from	'utils/abi/rarity.abi';
import	RARITY_ATTR_ABI											from	'utils/abi/rarityAttr.abi';
import	RARITY_GOLD_ABI											from	'utils/abi/rarityGold.abi';
import 	RARITY_NAMES_ABI  from 'utils/abi/rarityNames.abi';
import	RARITY_SKILLS_ABI										from	'utils/abi/raritySkills.abi';
import	RARITY_LIBRARY_ABI									from	'utils/abi/rarityLibrary.abi';
import	THE_CELLAR_ABI											from	'utils/abi/dungeonTheCellar.abi';
import  GOVERNANCE_TOKEN_ABI from 'utils/abi/governanceToken.abi';
import  RARITY_FEATS_ABI from 'utils/abi/rarityFeats.abi';
import	MANIFEST_GOODS											from	'utils/codex/items_manifest_goods.json';
import	MANIFEST_ARMORS											from	'utils/codex/items_manifest_armors.json';
import	MANIFEST_WEAPONS										from	'utils/codex/items_manifest_weapons.json';
import {dungeonTypes, isDungeonAvailable, numberOfDungeonsAvailable} from 'utils/scarcity-functions';

// HELPERS
const	getRaritiesRequestURI = (address) => `
	${process.env.NETWORK_API_URL}
	?module=account
	&action=tokennfttx
	&contractaddress=${process.env.RARITY_ADDR}
	&address=${address}
	&apikey=${process.env.NETWORK_KEY}
`;

const sharedCalls = async (provider, address) => {
	const ethcallProvider = await newEthCallProvider(provider);
	const	rarityLibrary = new Contract(process.env.RARITY_LIBRARY_ADDR, RARITY_LIBRARY_ABI);
	const callResult = await ethcallProvider.all([rarityLibrary.items1(address)]);
	return (callResult);
};

const	prepareAdventurer = (tokenID) => {
	const	rarity = new Contract(process.env.RARITY_ADDR, RARITY_ABI);
	const	rarityAttr = new Contract(process.env.RARITY_ATTR_ADDR, RARITY_ATTR_ABI);
	const	rarityGold = new Contract(process.env.RARITY_GOLD_ADDR, RARITY_GOLD_ABI);
	const	raritySkills = new Contract(process.env.RARITY_SKILLS_ADDR, RARITY_SKILLS_ABI);
	const	rarityDungeonCellar = new Contract(process.env.DUNGEON_THE_CELLAR_ADDR, THE_CELLAR_ABI);
	const rarityNames = new Contract(process.env.RARITY_NAMES_ADDR, RARITY_NAMES_ABI);
	const	rarityFeats = new Contract(process.env.RARITY_FEATS_ADDR, RARITY_FEATS_ABI);
	return [
		rarity.ownerOf(tokenID),
		rarity.summoner(tokenID),
		rarityAttr.character_created(tokenID),
		rarityAttr.ability_scores(tokenID),
		rarityGold.balanceOf(tokenID),
		raritySkills.get_skills(tokenID),
		rarityNames.summoner_name(tokenID),
		rarityFeats.get_feats_by_id(tokenID),
		isDungeonAvailable(dungeonTypes.CELLAR) && rarityDungeonCellar.adventurers_log(tokenID),
	].filter(x => Boolean(x));
};

const prepareAdventurerExtra = (provider, tokenID) => {
	const	rarityGold = new ethers.Contract(process.env.RARITY_GOLD_ADDR, RARITY_GOLD_ABI, provider).connect(provider.getSigner());
	return rarityGold.claimable(tokenID);
};

const prepareAdventurerInventory = (tokenID) => {
	return ITEMS.map(item => item.fetch(tokenID));
};

// TODO: check if it works
const	prepareSharedInventory = (result, callback) => {
	const getValuesByType = (type) => type === 1 ? MANIFEST_GOODS : type === 2 ? MANIFEST_ARMORS : MANIFEST_WEAPONS;
	result.forEach((item) => callback((prev) => ({...prev, [item.crafted]: {
		crafter: item.crafter.toString(),
		...Object.values(getValuesByType(item.base_type)).find(e => e.id === item.item_type),
	}})));
};

const createItem = (tokenID, owner, adventurer, name, balanceOfGold, claimableGold, initialAttributes, abilityScores, skills, feats = [], dungeons, inventoryCallResult, isRar) => {
	return ({
		tokenID: tokenID,
		owner: owner,
		xp: ethers.utils.formatEther(adventurer['_xp']),
		class: Number(adventurer['_class']),
		level: Number(adventurer['_level']),
		log: Number(adventurer['_log']),
		name,
		gold: {
			balance: ethers.utils.formatEther(balanceOfGold),
			claimable: claimableGold ? ethers.utils.formatEther(claimableGold) : '0'
		},
		attributes: {
			isInit: initialAttributes,
			remainingPoints: initialAttributes ? -1 : 32,
			strength: initialAttributes ? abilityScores['strength'] : 8,
			dexterity: initialAttributes ? abilityScores['dexterity'] : 8,
			constitution: initialAttributes ? abilityScores['constitution'] : 8,
			intelligence: initialAttributes ? abilityScores['intelligence'] : 8,
			wisdom: initialAttributes ? abilityScores['wisdom'] : 8,
			charisma: initialAttributes ? abilityScores['charisma'] : 8,
		},
		skills: skills,
		feats:  feats.map(f => Number(f)),
		dungeons,
		inventory: inventoryCallResult
	});
};

// FETCHERS
const fetchRarity = async (address, callback) => {
	const {result} = await fetcher(`${process.env.NETWORK_API_URL}
		?module=account
		&action=tokennfttx
		&contractaddress=${process.env.RARITY_ADDR}
		&address=${address}
		&apikey=${process.env.NETWORK_KEY}`);
	await callback(result);
};

const fetchAdventurer = async (provider, calls) => {
	const	ethcallProvider = await newEthCallProvider(provider);
	const	callResult = await ethcallProvider.all(calls);
	return (callResult);
};

const fetchAdventurerInventory = async (provider, calls) => {
	const	ethcallProvider = await newEthCallProvider(provider);
	const	callResult = await ethcallProvider.all(calls);
	return (callResult);
};

const fetchAdventurerExtra = async (calls) => {
	const	results = await Promise.all(calls.map(p => p?.catch(() => ethers.BigNumber.from(0))));
	return results.map(result => (result instanceof Error) ? undefined : result);
};

const fetchGovernanceToken = async (provider, address, callback) => {
	const	ethcallProvider = await newEthCallProvider(provider);
	const tokenContract = new Contract(process.env.GOVERNANCE_TOKEN_ADDR, GOVERNANCE_TOKEN_ABI);
	const calls = [
		tokenContract.balanceOf(address),
		tokenContract.allowance(address, process.env.RARITY_NAMES_ADDR),
	];
	const [balance = 0, nameAllowance = 0] = await ethcallProvider.all(calls);
	return callback({balance: ethers.utils.formatEther(balance), nameAllowance: `${nameAllowance}`});
};

// CONTEXT COMPONENT
const	RarityContext = createContext();
let	isUpdatingRarities = false;

export const RarityContextApp = ({children}) => {
	const	{active, address, chainID, provider} = useWeb3();
	const	{data} = useSWR(active && address ? getRaritiesRequestURI(address) : null, fetcher);

	const [governanceToken, setGovernanceToken] = useState(0);
	const	[currentAdventurer, set_currentAdventurer] = useState(null);
	const	[rarities, set_rarities] = useState({});
	const	[inventory, set_inventory] = useState({});
	const	[rNonce, set_rNonce] = useState(0);
	const	[loaded, set_loaded] = useState(false);
	const	[isModalOpen, set_isModalOpen] = useState(false);

	const setRarity = async (tokenID, multicallResult = [], callResult, inventoryCallResult) => {
		const	[owner, adventurer, initialAttributes, abilityScores, balanceOfGold, skills, name, feats] = await multicallResult.slice(0, 9);
		const	[claimableGold] = await callResult;

		// Sets up dungeons based on available ones (the order that dungeons are checked here is important!)
		const dungeonResults = multicallResult.slice(9);
		const dungeons = {};
		if (isDungeonAvailable(dungeonTypes.CELLAR)) {
			const cellarLog = dungeonResults.shift();
			dungeons.cellar = Number(cellarLog);
		}
		if (isDungeonAvailable(dungeonTypes.FOREST)) {
			const forestResearch = dungeonResults.shift();
			dungeons.forest = {
				initBlockTs: forestResearch.initBlockTs,
				endBlockTs: forestResearch.endBlockTs,
				canAdventure: forestResearch?.discovered === true || Number(forestResearch?.timeInDays) === 0
			};
		}
		if (toAddress(owner) !== toAddress(address)) return;

		if (!currentAdventurer || (currentAdventurer && tokenID === currentAdventurer.tokenID)) {
			set_currentAdventurer(p => (!p || (p && tokenID === p.tokenID))
				? createItem(tokenID, owner, adventurer, name, balanceOfGold, claimableGold, initialAttributes, abilityScores, skills, feats, dungeons, inventoryCallResult)
				: p);
		}
		set_rarities((prev) => {
			return ({
				...prev,
				[tokenID]: createItem(tokenID, owner, adventurer, name, balanceOfGold, claimableGold, initialAttributes, abilityScores, skills, feats, dungeons, inventoryCallResult, '++++')
			});
		});
		set_rNonce(prev => prev + 1);
	};

	const updateRarities = async (elements) => {
		if (isUpdatingRarities) return;

		isUpdatingRarities = true;
		const	preparedCalls = [];
		const	preparedExtraCalls = [];
		const	preparedInventoryCalls = [];
		const	tokensIDs = [];

		let		uniqueElements = [];
		for (let i = 0; i < elements.length; i++) {
			const	element = elements[i];
			if (toAddress(element.to) !== toAddress(address)) {
				uniqueElements = uniqueElements.filter(e => e.tokenID !== element.tokenID);
			} else {
				uniqueElements.push(element);
			}
		}
		try {
			uniqueElements?.forEach((token) => {
				preparedCalls.push(...prepareAdventurer(token.tokenID));
				preparedExtraCalls.push(prepareAdventurerExtra(provider, token.tokenID));
				preparedInventoryCalls.push(...prepareAdventurerInventory(token.tokenID));
				tokensIDs.push(token.tokenID);
			});
		} catch(e) {
			console.error(elements);
		}

		const	callResults = await fetchAdventurer(provider, preparedCalls);
		const	chunkedCallResult = chunk(callResults, 9);
		const	extraCallResults = await fetchAdventurerExtra(preparedExtraCalls);
		const	chunkedExtraCallResult = chunk(extraCallResults, 1);
		const	inventoryCallResult = await fetchAdventurerInventory(provider, preparedInventoryCalls);
		const	chunkedinventoryCallResult = chunk(inventoryCallResult, ITEMS.length);
		tokensIDs?.forEach((tokenID, i) => {
			setRarity(tokenID, chunkedCallResult[i], chunkedExtraCallResult[i], chunkedinventoryCallResult[i]);
		});
		sharedCalls(provider, address).then(result => prepareSharedInventory(result[0], set_inventory));
		set_loaded(true);
		isUpdatingRarities = false;
	};

	const updateRarity = async (tokenID) => {
		const	callResults = await fetchAdventurer(provider, prepareAdventurer(tokenID));
		const	chunkedCallResult = chunk(callResults, 8 + numberOfDungeonsAvailable);
		const	extraCallResults = await fetchAdventurerExtra(prepareAdventurerExtra(provider, tokenID));
		const	chunkedExtraCallResult = chunk(extraCallResults, 1);
		const	inventoryCallResult = await fetchAdventurerInventory(provider, prepareAdventurerInventory(tokenID));
		const	chunkedinventoryCallResult = chunk(inventoryCallResult, ITEMS.length);
		setRarity(tokenID, chunkedCallResult[0], chunkedExtraCallResult[0], chunkedinventoryCallResult[0]);
	};

	useEffect(() => {
		set_rarities({});
		set_currentAdventurer(null);
		set_rNonce(n => n + 1);
		if (active && provider && address) {
			set_loaded(false);
			fetchRarity(address, updateRarities);
			fetchGovernanceToken(provider, address, setGovernanceToken);
		}
	}, [active, address, chainID, provider]);

	useEffect(() => {
		if (data?.result && provider) {
			if (data?.status === 0) return setTimeout(() => fetchRarity(address, updateRarities), 100);
			updateRarities(data?.result);
		}
	}, [data, provider]);

	useEffect(() => {
		if (loaded === false)
			setTimeout(() => !active ? set_loaded(true) : null, 10000); //10s before unlock
	}, [loaded]);

	return (
		<RarityContext.Provider
			value={{
				isLoaded: loaded,
				rarities,
				inventory,
				currentAdventurer,
				set_currentAdventurer,
				updateRarity,
				fetchRarity,
				rNonce,
				openCurrentAventurerModal: () => set_isModalOpen(true),
				governanceToken
			}}>
			{children}
			<ModalCurrentAdventurer isOpen={isModalOpen} closeModal={() => set_isModalOpen(false)} />
		</RarityContext.Provider>
	);
};

export const useRarity = () => useContext(RarityContext);
export default useRarity;
