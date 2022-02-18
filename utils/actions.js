import	{ethers}			from	'ethers';
import	{Contract}			from	'ethcall';
import	toast				from	'react-hot-toast';
import	CLASSES				from	'utils/codex/classes';
import  {newEthCallProvider, bigNumber} from 'utils';
import  {parsePlots, parseSkinBase64} from 'utils/scarcity-functions';
import {GTOKEN} from 'utils/constants';

import	RARITY_CRAFTING_ABI	from	'utils/abi/rarityCrafting.abi';
import  SGV_TOKEN_ABI from 'utils/abi/sgvToken.abi';
import  LAUNCH_MANAGER_ABI from 'utils/abi/launchManager.abi';
import  LAUNCH_TICKET_ABI from 'utils/abi/launchTicket.abi';
import 	WRAPPED_GOLD_ABI from 'utils/abi/wrappedGold.abi';
import RARITY_FEATS_ABI from 'utils/abi/rarityFeats.abi';
import RARITY_NAMES_ABI from 'utils/abi/rarityNames.abi';
import RARITY_GOLD_ABI from	'utils/abi/rarityGold.abi';
import	RARITY_ATTR_ABI											from	'utils/abi/rarityAttr.abi';
import  GOVERNANCE_TOKEN_ABI from 'utils/abi/governanceToken.abi';

export const onSuccessToast = (_toast, msg) => {
	toast.dismiss(_toast);
	toast.success(msg);
};

export const onErrorToast = (_toast, msg = 'Something went wrong, please try again later') => {
	toast.dismiss(_toast);
	toast.error(msg);
};

async function	_adventure(loader, {provider, contractAddress, tokenID}, callback) {
	const	_toast = toast.loading(loader);
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		contractAddress,
		['function adventure(uint256 _summoner) public'],
		signer
	);

	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarity.callStatic.adventure(tokenID);
	} catch (error) {
		toast.dismiss(_toast);
		toast.error('Impossible to submit transaction');
		callback({error, data: undefined});
		return;
	}

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarity.adventure(tokenID);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			callback({error: false, data: tokenID});
			toast.dismiss(_toast);
			toast.success('Transaction successful');
		} else {
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
			callback({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
	}
}

export async function	goAdventure({loader, provider, contractAddress, tokenID}, callback) {
	_adventure(loader || 'Going on an adventure...', {provider, contractAddress, tokenID}, callback);
}
export async function	lootDungeonTheCellar({provider, contractAddress, tokenID}, callback) {
	_adventure('Looting the Big Ugly Rat...', {provider, contractAddress, tokenID}, callback);
}

export async function	levelUp({provider, contractAddress, tokenID}, callback) {
	const	_toast = toast.loading(`Level-up ${tokenID}...`);
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		contractAddress,
		['function level_up(uint256 _summoner) public'],
		signer
	);

	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarity.callStatic.level_up(tokenID);
	} catch (error) {
		toast.dismiss(_toast);
		toast.error('Impossible to submit transaction');
		callback({error, data: undefined});
		return;
	}

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarity.level_up(tokenID);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			callback({error: false, data: tokenID});
			toast.dismiss(_toast);
			toast.success('Transaction successful');
		} else {
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
			callback({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
	}
}

export const claimName = async (name, id, provider) => {
	const	_toast = toast.loading(`Claiming name ${name}...`);
	const signer = provider.getSigner();
	const nameContract = new ethers.Contract(
		process.env.RARITY_NAMES_ADDR, 
		RARITY_NAMES_ABI,
		signer
	);
	try {
		const	transaction = await nameContract.claim(name, id);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status == 1) {
			toast.dismiss(_toast);
			toast.success('Transaction successful');
		} else {
			console.log(transactionResult.status);
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
	}
};

export const checkGoldAllowance = async (provider, id, callback) => {
	const	ethcallProvider = await newEthCallProvider(provider);
	const goldContract = new Contract(process.env.RARITY_GOLD_ADDR, RARITY_GOLD_ABI);
	const goldAllowanceCall = goldContract.allowance(id, 238);
	const goldAllowance = await ethcallProvider.all([goldAllowanceCall]);
	return callback(+`${goldAllowance}`);
};

export const getGOLDapprove = async (provider, id) => {
	const	_toast = toast.loading('Allow Gold to be wrapped to $WRGGOLD');
	const signer = provider.getSigner();
	const approveGold = new ethers.Contract(
		process.env.RARITY_GOLD_ADDR, 
		RARITY_GOLD_ABI,
		signer
	);
	try {
		const	transaction = await approveGold.approve(id, 238, 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status == 1) {
			toast.dismiss(_toast);
			toast.success('Transaction successful');
		} else {
			console.log(transactionResult.status);
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
	}
};

export const allowGTokens = async (provider) => {
	let _toast = toast.loading(`Approving ${GTOKEN}...`);
	const signer = provider.getSigner();
	const managerContract = new ethers.Contract(process.env.GOVERNANCE_TOKEN_ADDR, GOVERNANCE_TOKEN_ABI, signer); 
	try {
		const transaction = await managerContract.approve(process.env.RARITY_NAMES_ADDR, 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			onSuccessToast(_toast, `${GTOKEN} successfully approved`);
			return;
		}
	} catch (e) {
		console.log(e);
		onErrorToast(_toast);
		return;
	}
};

export async function	learnSkills({provider, contractAddress, tokenID, skills}, callback) {
	const	_toast = toast.loading('Learning new skills...');
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		contractAddress,
		['function set_skills(uint256 _summoner, uint8[36] _skills) public'],
		signer
	);

	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarity.callStatic.set_skills(tokenID, skills);
	} catch (error) {
		toast.dismiss(_toast);
		toast.error('Impossible to submit transaction');
		callback({error, data: undefined});
		return;
	}

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarity.set_skills(tokenID, skills);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			callback({error: false, data: tokenID});
			toast.dismiss(_toast);
			toast.success('Transaction successful');
		} else {
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
			callback({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
	}
}

export async function	recruitAdventurer({provider, contractAddress, classID}, callback) {
	const	_toast = toast.loading(`Recruiting a ${CLASSES[classID].name}...`);
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		contractAddress,
		['function summon(uint256 _class) public'],
		signer
	);

	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarity.callStatic.summon(classID);
	} catch (error) {
		toast.dismiss(_toast);
		toast.error('Impossible to submit transaction');
		callback({error, data: undefined});
		return;
	}

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarity.summon(classID);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			callback({error: false, data: classID});
			toast.dismiss(_toast);
			toast.success('Transaction successful');
		} else {
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
			callback({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
	}
}

export async function	setAttributes({provider, contractAddress, _summoner, _str, _dex, _const, _int, _wis, _cha}, callback) {
	const	_toast = toast.loading(`Setting attributes for ${_summoner}...`);
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		contractAddress,
		RARITY_ATTR_ABI,
		signer
	);

	// /**********************************************************************
	// **	In order to avoid dumb error, let's first check if the TX would
	// **	be successful with a static call
	// **********************************************************************/
	// try {
	// 	await rarity.callStatic.point_buy(_summoner, _str, _dex, _const, _int, _wis, _cha);
	// } catch (error) {
	// 	toast.dismiss(_toast);
	// 	toast.error('Impossible to submit transaction');
	// 	// callback({error, data: undefined});
	// 	return;
	// }

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarity.point_buy(_summoner, _str, _dex, _const, _int, _wis, _cha);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			callback({error: false, data: {_summoner, _str, _dex, _const, _int, _wis, _cha}});
			toast.dismiss(_toast);
			toast.success('Transaction successful');
		} else {
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
			// callback({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		// callback({error, data: undefined});
	}
}

export async function	claimGold({provider, contractAddress, tokenID}, callback) {
	const	_toast = toast.loading(`Claiming gold for ${tokenID}...`);
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		contractAddress,
		['function claim(uint256 _summoner) public'],
		signer
	);

	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarity.callStatic.claim(tokenID);
	} catch (error) {
		console.log(error);
		toast.dismiss(_toast);
		toast.error('Impossible to submit transaction');
		callback({error, data: undefined});
		return;
	}

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarity.claim(tokenID);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			callback({error: false, data: tokenID});
			toast.dismiss(_toast);
			toast.success('Transaction successful');
		} else {
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
			callback({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
	}
}

export async function	apeInVault({provider, contractAddress, amount}, callback) {
	const	_toast = toast.loading('Processing deposit...');
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		contractAddress,
		['function deposit() public payable'],
		signer
	);

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarity.deposit({value: amount});
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			callback({error: false, data: undefined});
			toast.dismiss(_toast);
			toast.success('Transaction successful');
		} else {
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
			callback({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
	}
}
export async function	apeOutVault({provider, address, zapAddress, contractAddress, amount, wantTokenName}, callback) {
	let		_toast = toast.loading(`1/2 - Approving token yv${wantTokenName}...`);
	const	signer = provider.getSigner();
	const	vault = new ethers.Contract(
		contractAddress, [
			'function allowance(address, address) external view returns (uint256)',
			'function approve(address to, uint256 amount) external'
		],
		signer
	);
	const	zap = new ethers.Contract(
		zapAddress,
		['function withdraw(uint256) public'],
		signer
	);

	/**********************************************************************
	**	First, we need to approve this TX
	**********************************************************************/
	try {
		const	approvedAmount = await vault.allowance(address, zapAddress);
		if (ethers.BigNumber.from(approvedAmount).gte(amount)) {
			toast.dismiss(_toast);
		} else {
			const	transaction = await vault.approve(zapAddress, amount);
			const	transactionResult = await transaction.wait();
			if (transactionResult.status === 1) {
				toast.dismiss(_toast);
			} else {
				toast.dismiss(_toast);
				toast.error('Approve reverted');
				callback({error: true, data: undefined});
				return;
			}
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
		return;
	}

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await zap.withdraw(amount);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			callback({error: false, data: undefined});
			toast.dismiss(_toast);
			toast.success('Transaction successful');
		} else {
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
			callback({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
	}
}
export async function	depositInVault({provider, address, contractAddress, amount, wantTokenAddress, wantTokenName}, callback) {
	let		_toast = toast.loading(`1/2 - Approving token ${wantTokenName}...`);
	const	signer = provider.getSigner();
	const	vault = new ethers.Contract(
		contractAddress,
		['function deposit(uint256) public'],
		signer
	);

	/**********************************************************************
	**	First, we need to approve this TX
	**********************************************************************/
	try {
		const	wantContract = new ethers.Contract(
			wantTokenAddress, [
				'function allowance(address, address) external view returns (uint256)',
				'function approve(address to, uint256 amount) external'
			],
			signer
		);
		const	approvedAmount = await wantContract.allowance(address, contractAddress);
			
		if (ethers.BigNumber.from(approvedAmount).gte(amount)) {
			toast.dismiss(_toast);
		} else {
			const	transaction = await wantContract.approve(contractAddress, amount);
			const	transactionResult = await transaction.wait();
			if (transactionResult.status === 1) {
				toast.dismiss(_toast);
			} else {
				toast.dismiss(_toast);
				toast.error('Approve reverted');
				callback({error: true, data: undefined});
				return;
			}
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
		return;
	}

	_toast = toast.loading(`2/2 - Deposit ${wantTokenName}...`);
	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await vault.callStatic.deposit(amount);
	} catch (error) {
		toast.dismiss(_toast);
		toast.error('Impossible to deposit tokens');
		callback({error, data: undefined});
		return;
	}
	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await vault.deposit(amount);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			callback({error: false, data: undefined});
			toast.dismiss(_toast);
			toast.success('Transaction successful');
		} else {
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
			callback({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
	}
}
export async function	withdrawFromVault({provider, contractAddress, amount, wantTokenName}, callback) {
	const	_toast = toast.loading(`Withdrawing yv${wantTokenName}...`);
	const	signer = provider.getSigner();
	const	vault = new ethers.Contract(
		contractAddress, [
			'function withdraw(uint256) public',
			'function allowance(address, address) external view returns (uint256)',
			'function approve(address to, uint256 amount) external'
		],
		signer
	);

	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await vault.callStatic.withdraw(amount);
	} catch (error) {
		toast.dismiss(_toast);
		toast.error('Impossible to withdraw tokens');
		callback({error, data: undefined});
		return;
	}
	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await vault.withdraw(amount);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			callback({error: false, data: undefined});
			toast.dismiss(_toast);
			toast.success('Transaction successful');
		} else {
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
			callback({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
	}
}

export async function	exploreTheForest({provider, contractAddress, tokenID, timeInDays}, callback) {
	const	_toast = toast.loading('Heading to the Forest...');
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		contractAddress,
		['function startResearch(uint256 _summoner, uint256 timeInDays) public'],
		signer
	);

	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarity.callStatic.startResearch(tokenID, timeInDays, {gasLimit: 200_000});
	} catch (error) {
		toast.dismiss(_toast);
		toast.error('Impossible to explore The Forest');
		callback({error, data: undefined});
		return;
	}

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarity.startResearch(tokenID, timeInDays, {gasLimit: 200_000});
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			callback({error: false, data: tokenID});
			toast.dismiss(_toast);
			toast.success('Transaction successful');
		} else {
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
			callback({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
	}
}

export async function	discoverTreasureTheForest({provider, contractAddress, tokenID}, callback) {
	const	_toast = toast.loading('Digging in the Forest...');
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		contractAddress,
		['function discover(uint256 _summoner) public'],
		signer
	);

	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarity.callStatic.discover(tokenID, {gasLimit: 300_000});
	} catch (error) {
		toast.dismiss(_toast);
		toast.error('Your shovel broke ... Try another one');
		callback({error, data: undefined});
		return;
	}

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarity.discover(tokenID, {gasLimit: 300_000});
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			callback({error: false, data: tokenID});
			toast.dismiss(_toast);
			toast.success('Transaction successful');
		} else {
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
			callback({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Your shovel broke ... Try another one');
		callback({error, data: undefined});
	}
}

export async function	levelUpTreasureTheForestOld({provider, contractAddress, tokenID, adventurerID, treasureName}, callback) {
	let		_toast = toast.loading(`1/2 - Approving adventurer ${adventurerID}...`);
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		contractAddress,
		['function levelUp(uint256 tokenId) public'],
		signer
	);

	/**********************************************************************
	**	First, we need to approve this TX
	**********************************************************************/
	try {
		const	raritySource = new ethers.Contract(
			process.env.RARITY_ADDR, [
				'function getApproved(uint256 tokenId) external view returns (address operator)',
				'function approve(address to, uint256 tokenId) external'
			],
			signer
		);
		const	approvedAddr = await raritySource.getApproved(adventurerID);
		if (approvedAddr === process.env.RARITY_XP_PROXY) {
			toast.dismiss(_toast);
		} else {
			const	transaction = await raritySource.approve(process.env.RARITY_XP_PROXY, adventurerID);
			const	transactionResult = await transaction.wait();
			if (transactionResult.status === 1) {
				toast.dismiss(_toast);
			} else {
				toast.dismiss(_toast);
				toast.error('Approve reverted');
				callback({error: true, data: undefined});
				return;
			}
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
		return;
	}

	_toast = toast.loading(`2/2 - Level-up treasure ${treasureName}...`);
	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarity.callStatic.levelUp(tokenID, {gasLimit: 200_000});
	} catch (error) {
		toast.dismiss(_toast);
		toast.error('Impossible to submit transaction');
		callback({error, data: undefined});
		return;
	}

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarity.levelUp(tokenID, {gasLimit: 200_000});
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			callback({error: false, data: tokenID});
			toast.dismiss(_toast);
			toast.success('Transaction successful');
		} else {
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
			callback({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
	}
}

export async function	levelUpTreasureTheForest({provider, contractAddress, tokenID, adventurerID, treasureName, xpRequired}, callback) {
	let		_toast = toast.loading(`1/3 - Approving Proxy Spender ${adventurerID}...`);
	const	signer = provider.getSigner();
	const	address = await signer.getAddress();
	const	rarity = new ethers.Contract(
		contractAddress,
		['function levelUp(uint256 tokenId) public'],
		signer
	);

	/**********************************************************************
	**	First, we need to approve this TX
	**********************************************************************/
	try {
		const	raritySource = new ethers.Contract(
			process.env.RARITY_ADDR, [
				'function setApprovalForAll(address operator, bool approved) external',
				'function isApprovedForAll(address owner, address operator) external view returns (bool)',
			],
			signer
		);
		const	isApprovedForAll = await raritySource.isApprovedForAll(address, process.env.RARITY_XP_PROXY);
		if (isApprovedForAll) {
			//
		} else {
			const	transaction = await raritySource.setApprovalForAll(process.env.RARITY_XP_PROXY, true);
			const	transactionResult = await transaction.wait();
			if (transactionResult.status === 1) {
				toast.dismiss(_toast);
			} else {
				toast.dismiss(_toast);
				toast.error('Approve reverted');
				callback({error: true, data: undefined});
				return;
			}
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
		return;
	}

	/**********************************************************************
	**	Then we need to allow the spender to spend amount XP
	**********************************************************************/
	try {
		_toast = toast.loading(`2/3 - Approving ${ethers.utils.formatEther(xpRequired)} XP to be used...`);
		const	rarityXpProxy = new ethers.Contract(
			process.env.RARITY_XP_PROXY, [
				'function allowance(address _owner, uint _adventurer, address _operator) external view returns (uint256)',
				'function approve(uint _adventurer, address _operator, uint _amount) external returns (bool)',
			],
			signer
		);
		const	hasAllowance = await rarityXpProxy.allowance(address, adventurerID, contractAddress);
		if (hasAllowance.gte(xpRequired)) {
			toast.dismiss(_toast);
		} else {
			const	transaction = await rarityXpProxy.approve(adventurerID, contractAddress, xpRequired);
			const	transactionResult = await transaction.wait();
			if (transactionResult.status === 1) {
				toast.dismiss(_toast);
			} else {
				toast.dismiss(_toast);
				toast.error('Approve reverted');
				callback({error: true, data: undefined});
				return;
			}
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
		return;
	}


	_toast = toast.loading(`3/3 - Level-up treasure ${treasureName}...`);
	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarity.callStatic.levelUp(tokenID, {gasLimit: 200_000});
	} catch (error) {
		toast.dismiss(_toast);
		toast.error('Impossible to submit transaction');
		callback({error, data: undefined});
		return;
	}

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarity.levelUp(tokenID, {gasLimit: 200_000});
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			callback({error: false, data: tokenID});
			toast.dismiss(_toast);
			toast.success('Transaction successful');
		} else {
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
			callback({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
	}
}


export async function	restoreTreasureTheForest({provider, contractAddress, tokenID, treasureName, adventurerID}, callback) {
	let		_toast = toast.loading(`1/2 - Approving treasure ${treasureName}...`);
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		contractAddress,
		['function restoreTreasure(uint256 tokenId, uint256 receiver) public'],
		signer
	);

	/**********************************************************************
	**	First, we need to approve this TX
	**********************************************************************/
	try {
		const	raritySource = new ethers.Contract(
			process.env.DUNGEON_THE_FOREST_V1_ADDR, [
				'function getApproved(uint256 tokenId) external view returns (address operator)',
				'function approve(address to, uint256 tokenId) external'
			],
			signer
		);
		const	approvedAddr = await raritySource.getApproved(tokenID);
		if (approvedAddr === contractAddress) {
			toast.dismiss(_toast);
		} else {
			const	transaction = await raritySource.approve(contractAddress, tokenID);
			const	transactionResult = await transaction.wait();
			if (transactionResult.status === 1) {
				toast.dismiss(_toast);
			} else {
				toast.dismiss(_toast);
				toast.error('Approve reverted');
				callback({error: true, data: undefined});
				return;
			}
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
		return;
	}

	_toast = toast.loading(`2/2 - Restoring treasure ${treasureName}...`);
	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarity.callStatic.restoreTreasure(tokenID, adventurerID, {gasLimit: 300_000});
	} catch (error) {
		toast.dismiss(_toast);
		toast.error('Impossible to submit transaction');
		callback({error, data: undefined});
		return;
	}

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarity.restoreTreasure(tokenID, adventurerID, {gasLimit: 300_000});
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			callback({error: false, data: tokenID});
			toast.dismiss(_toast);
			toast.success('Transaction successful');
		} else {
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
			callback({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
	}
}

export async function	craft({
	provider,
	contractAddress,
	tokenID,
	itemName,
	baseType,
	itemType,
	craftingMaterials,
	forced = false
}, callback) {
	let		hadApprove = false;
	let		_toast;
	const	signer = provider.getSigner();
	const	rarityCraft = new ethers.Contract(
		contractAddress,
		RARITY_CRAFTING_ABI,
		signer
	);

	/**********************************************************************
	**	First, we need to approve this TX
	**********************************************************************/
	try {
		const	raritySource = new ethers.Contract(
			process.env.RARITY_ADDR, [
				'function getApproved(uint256 tokenId) external view returns (address operator)',
				'function approve(address to, uint256 tokenId) external'
			],
			signer
		);
		const	approvedAddr = await raritySource.getApproved(tokenID);
		if (approvedAddr !== contractAddress) {
			hadApprove = true;
			_toast = toast.loading('1/2 - Approving craft ...');
			const	transaction = await raritySource.approve(contractAddress, tokenID);
			const	transactionResult = await transaction.wait();
			if (transactionResult.status === 1) {
				toast.dismiss(_toast);
			} else {
				toast.dismiss(_toast);
				toast.error('Approve reverted');
				callback({error: true, data: undefined});
				return;
			}
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
		return;
	}
	
	/**********************************************************************
	**	Then, we need to simulate the crafting to avoid absolute errors
	**********************************************************************/
	if (!forced) {
		const	simulation = await rarityCraft.simulate(
			tokenID,
			baseType,
			itemType,
			craftingMaterials
		);
		if (!simulation.crafted) {
			callback({error: 'SIMULATION_FAILED', data: tokenID});
			toast.error('IT\'S A BAD IDEA TO CRAFT THAT RIGHT NOW. TRY AGAIN LATER');
			return;
		}
	}

	if (hadApprove) {
		_toast = toast.loading(`2/2 Trying to craft ${itemName}...`);
	} else {
		_toast = toast.loading(`Trying to craft ${itemName}...`);
	}
	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarityCraft.callStatic.craft(
			tokenID,
			baseType,
			itemType,
			craftingMaterials
		);
	} catch (error) {
		toast.dismiss(_toast);
		toast.error('You have a bad feeling about this. You should retry later.');
		callback({error, data: undefined});
		return;
	}

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarityCraft.craft(
			tokenID,
			baseType,
			itemType,
			craftingMaterials,
			{gasLimit: 400_000}
		);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			if (transactionResult.logs.length === 0) {
				callback({error: 'CRAFT_FAILED', data: tokenID});
				toast.dismiss(_toast);
				toast.error('YOU FAILED YOUR CRAFT ATTEMPT');	
				return;
			}
			callback({error: false, data: tokenID});
			toast.dismiss(_toast);
			toast.success('Transaction successful');
		} else {
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
			callback({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
	}
}

export async function	approveERC721({provider, contractAddress, spender, tokenID, name}, callback) {
	let		_toast = toast.loading(`Approving ${name}...`);
	const	signer = provider.getSigner();

	/**********************************************************************
	**	First, we need to approve this TX
	**********************************************************************/
	try {
		const	contract = new ethers.Contract(
			contractAddress, [
				'function approve(address spender, uint256 tokenID) external'
			],
			signer
		);
		const	transaction = await contract.approve(spender, tokenID);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			toast.dismiss(_toast);
			callback({error: false, data: undefined});
			return;
		} else {
			toast.dismiss(_toast);
			toast.error('Approve reverted');
			callback({error: true, data: undefined});
			return;
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
		return;
	}
}
export async function	approveERC20({provider, contractAddress, adventurerID, spender, amount, name}, callback) {
	let		_toast = toast.loading(`Approving ${name}...`);
	const	signer = provider.getSigner();

	/**********************************************************************
	**	First, we need to approve this TX
	**********************************************************************/
	try {
		const	contract = new ethers.Contract(
			contractAddress, [
				'function approve(uint256 from, uint256 spender, uint256 amount) external'
			],
			signer
		);
		const	transaction = await contract.approve(adventurerID, spender, amount);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			toast.dismiss(_toast);
			callback({error: false, data: undefined});
			return;
		} else {
			toast.dismiss(_toast);
			toast.error('Approve reverted');
			callback({error: true, data: undefined});
			return;
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
		return;
	}
}

/**********************************************************************
**	LANDS GAME Actions
**********************************************************************/
export const getLandsGameInfo = async (provider, contractAddress, abi, address, callback) => {
	const ethcallProvider = await newEthCallProvider(provider);
	const game = new Contract(contractAddress, abi);

	const maxStakeCall = game.MAX_STAKE();
	const [maxStake] = await ethcallProvider.all([maxStakeCall]);

	const pointsBalanceCall = game.earned(address);
	const [pointsBalance] = await ethcallProvider.all([pointsBalanceCall]);

	const needCall = await game.rewardNeeded();
	const [rewardNeeded] = await ethcallProvider.all([needCall]);

	const stakedCall = await game.balanceOf(address);
	const [staked] = await ethcallProvider.all([stakedCall]);

	const plotsCall = await game.getPlots();
	const [plots] = await ethcallProvider.all([plotsCall]);

	const mapXSizeCall = await game.mapXSize();
	const [mapXSize] = await ethcallProvider.all([mapXSizeCall]);

	const mapYSizeCall = await game.mapYSize();
	const [mapYSize] = await ethcallProvider.all([mapYSizeCall]);

	callback({
		plots: parsePlots(plots, address),
		balance: ethers.utils.formatEther(pointsBalance),
		staked: ethers.utils.formatEther(staked),
		rewardNeeded: ethers.utils.formatEther(rewardNeeded),
		maxStake: ethers.utils.formatEther(maxStake),
		canBuy: pointsBalance > 0 && bigNumber.from(pointsBalance).gte(rewardNeeded),
		mapXSize: Number(`${mapXSize}`),
		mapYSize: Number(`${mapYSize}`),
	});
};

export const buyPlot = async (provider, contractAddress, abi, x, y) => {
	let _toast = toast.loading(`Buy ${x}:${y} chords plot`);
	const signer = provider.getSigner();
	const gameContract = new ethers.Contract(contractAddress, abi, signer);

	try {
		const transaction = await gameContract.redeem(x, y);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			onSuccessToast(_toast, `You've successfully bought ${x}:${y} chords plot`);
			return;
		}
	} catch (e) {
		onErrorToast(_toast);
		return;
	}
};


/**********************************************************************
**	TOKEN Actions
**********************************************************************/
export const getGTokenBalance = async (provider, address, callback) => {
	const ethcallProvider = await newEthCallProvider(provider);
	const tokenContract = new Contract(process.env.GOVERNANCE_TOKEN_ADDR, GOVERNANCE_TOKEN_ABI);
	const tokenBalanceCall = tokenContract.balanceOf(address); 
	const [tokenBalance] = await ethcallProvider.all([tokenBalanceCall]);
	
	callback(ethers.utils.formatEther(tokenBalance));
};

export const getSGVBalance = async (provider, address, callback) => {
	const contractAddress = process.env.SGV_TOKEN_ADDR;
	const ethcallProvider = await newEthCallProvider(provider);
	const sgvContract = new Contract(contractAddress, SGV_TOKEN_ABI);
	const sgvBalanceCall = sgvContract.balanceOf(address); 
	const [sgvBalance] = await ethcallProvider.all([sgvBalanceCall]);
	
	callback(ethers.utils.formatEther(sgvBalance));
};

export const stakeSgvTokens = async (provider, mapContractAddress, mapAbi, value, maxValue) => {
	let _toast = toast.loading(`1/2 - Approving ${value} ${GTOKEN} staking...`);
	const sgvContractAddress = process.env.SGV_TOKEN_ADDR;
	const signer = provider.getSigner();
	const valueToStake = ethers.utils.parseEther(value);
	const maxStake = ethers.utils.parseEther(maxValue);

	const sgvContract = new ethers.Contract(sgvContractAddress, SGV_TOKEN_ABI, signer);
	const gameContract = new ethers.Contract(mapContractAddress, mapAbi, signer);

	// TODO(???): add same logic for approve as for gold
	try {
		if (bigNumber.from(valueToStake).gte(maxStake)) {
			onErrorToast(_toast, `You can't stake more than ${maxValue} ${GTOKEN}`);
			return;
		}
		const transaction = await sgvContract.approve(mapContractAddress, valueToStake);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			onSuccessToast(_toast, 'Approve successfull');
		}
	} catch (e) {
		onErrorToast(_toast);
		return;
	}

	try {
		_toast = toast.loading('2/2 - Staking tokens...');
		const transaction = await gameContract.stake(valueToStake);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			onSuccessToast(_toast, `${value} ${GTOKEN} Tokens staked!`);
			return;
		}
	} catch (e) {
		onErrorToast(_toast);
		return;
	}
};

export const unstakeSgvTokens = async (provider, contractAddress, abi, stakedValue) => {
	const _toast = toast.loading(`Unstake ${GTOKEN} Tokens`);
	const signer = provider.getSigner();
	const gameContract = new ethers.Contract(contractAddress, abi, signer);
	if (stakedValue === 0) {
		onErrorToast(_toast, 'You don\' have tokens to unstake');
		return;
	}
	try {
		const transaction = await gameContract.exit();
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			onSuccessToast(_toast, 'Tokens successfully unstaked');
			return;
		}
	} catch (e) {
		onErrorToast(_toast);
		return;
	}
};

/**********************************************************************
**	TRANSFER
**********************************************************************/
export const transfer = async (provider, contractAddress, contractABI, sender, recepient, amount, isGold) => {
	let	_toast = toast.loading(`Transfer ${amount} ${isGold ? 'Gold' : 'Craft Materials'} from Adventurer ${sender} to Adventurer ${recepient}`);
	const	signer = provider.getSigner();
	const amountToTransfer = isGold ?  ethers.utils.parseEther(amount) : amount;

	try {
		const	contract = new ethers.Contract(
			contractAddress,
			contractABI,
			signer
		);
		const	transaction = await contract.transfer(sender, recepient, amountToTransfer);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			toast.dismiss(_toast);
			toast.success('Transfer successful');
			return;
		} else {
			toast.dismiss(_toast);
			toast.error('Transfer reverted');
			return;
		}
	} catch (e) {
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		return;
	}
};

export async function	learnFeat({provider, tokenID, feat}, callback) {
	const	_toast = toast.loading('Learning new feat...');
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		process.env.RARITY_FEATS_ADDR,
		RARITY_FEATS_ABI,
		signer
	);

	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarity.callStatic.select_feat(tokenID, feat);
	} catch (error) {
		toast.dismiss(_toast);
		toast.error('Impossible to submit transaction');
		callback({error, data: undefined});
		return;
	}

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarity.select_feat(tokenID, feat);
		const	transactionResult = await transaction.wait(2);
		if (transactionResult.status === 1) {
			callback({error: false, data: tokenID});
			toast.dismiss(_toast);
			toast.success('Your knowledge increased');
		} else {
			toast.dismiss(_toast);
			toast.error('You failed to learn a new feat');
			callback({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
	}
}

/**********************************************************************
	**	WRAPPED GOLD ACTIONS
**********************************************************************/
export const getWGoldBalance = async (provider, address, allowanceAddress, callback) => {
	const ethcallProvider = await newEthCallProvider(provider);
	const contract = new Contract(process.env.WRAPPED_GOLD, WRAPPED_GOLD_ABI);
	const calls = [
		contract.balanceOf(address),
		contract.allowance(address, allowanceAddress)
	];
	const [wGold = 0, allowance = 0]  = await ethcallProvider.all(calls);
	return callback({balance: ethers.utils.formatEther(`${wGold}`), allowance: Number(allowance)});
};

export const approveWGold = async (provider, callback) => {
	let _toast = toast.loading('Approving $WRGGOLD');
	const signer = provider.getSigner();
	const contract = new ethers.Contract(process.env.WRAPPED_GOLD, WRAPPED_GOLD_ABI, signer);
	try {
		const transaction = await contract.approve(process.env.LAUNCH_TICKET_ADDR, 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			callback();
			onSuccessToast(_toast, '$WRGGOLD successfully approved');
		}
	} catch (e) {
		onErrorToast(_toast);
		return;
	}
};

export const mintRandomCostume = async (provider, amount) => {
	let _toast = toast.loading(`Minting ${amount} costumes...`);
	const signer = provider.getSigner();
	const contract = new ethers.Contract(process.env.LAUNCH_TICKET_ADDR, LAUNCH_TICKET_ABI, signer);
	try {
		const transaction = await contract.mint(amount, {value: '0'});
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			onSuccessToast(_toast, `${amount} costumes successfully minted`);
			return;
		}
	} catch (e) {
		console.log(e);
		onErrorToast(_toast);
		return;
	}
};

/**********************************************************************
	**	LAUNCH PARTY ACTIONS
**********************************************************************/
export const getManagerTicketsInfo = async (provider, address, tokenID, callback) => {
	const ethcallProvider = await newEthCallProvider(provider);
	const managerContract = new Contract(process.env.LAUNCH_MANAGER_ADDR, LAUNCH_MANAGER_ABI);
	const calls = [
		managerContract.myAdventurersYieldPerDay(address),
		managerContract.mySummonersYieldPerDay(address),
		managerContract.availableForClaimAll(address),
		managerContract.summonerKey([process.env.LAUNCH_ADVENTURERS_ADDR, tokenID]),
		managerContract.summonerKey([process.env.LAUNCH_SUMMONERS_ADDR, tokenID])
	];
	// console.log(managerContract);
	const [myAdventurersYieldPerDay, mySummonersYieldPerDay, availableForClaimAll, adventurerKey, summonerKey] = await ethcallProvider.all(calls);
	try {
		if (!summonerKey || !adventurerKey) return;
		const ticketsCalls = [
			managerContract.ticketOf(adventurerKey),
			managerContract.ticketOf(summonerKey),
		];
		const [adventurerTicketId, summonerTicketId] = await ethcallProvider.all(ticketsCalls);
		try {
			if (!adventurerTicketId || !summonerTicketId) return;
			const availableTokensCalls = [
				managerContract.availableForClaim(+`${adventurerTicketId}`),
				managerContract.availableForClaim(+`${summonerTicketId}`)
			];
			const [adventurerTokensAvailable, summonerTokensAvailable] = await ethcallProvider.all(availableTokensCalls);
			return callback({
				myAdventurersYieldPerDay,
				mySummonersYieldPerDay,
				adventurerTokensAvailable,
				summonerTokensAvailable,
				availableForClaimAll,
				adventurerTicketId: +`${adventurerTicketId}`,
				summonerTicketId: +`${summonerTicketId}`,
			});
		} catch (e) {
			console.log(e);
		}
	} catch (e) {
		console.log(e);
	}
};

export const getCommonTicketsInfo = async (provider, address, callback) => {
	const ethcallProvider = await newEthCallProvider(provider);
	const contract = new Contract(process.env.LAUNCH_TICKET_ADDR, LAUNCH_TICKET_ABI);
	const calls = [
		contract.balanceOf(address),
		contract.price()
	];
	const [balance = 0, price = 0] = await ethcallProvider.all(calls);
	return callback({balance: `${balance}`, price: `${ethers.utils.formatEther(price)}`});
};

export const getManagerTiketInfo = async (provider, ticketId) => {
	const ethcallProvider = await newEthCallProvider(provider);
	const managerContract = new Contract(process.env.LAUNCH_MANAGER_ADDR, LAUNCH_MANAGER_ABI);
	try {
		const assignationCall = managerContract.summonerOf(ticketId);
		const assignation = await ethcallProvider.all([assignationCall]);
		return {assignation};
	} catch (e) {
		console.log(e);
	}
};


export const getTicketInfo = async (provider, address, ticketContractAddr, abi, index, callback) => {
	const ethcallProvider = await newEthCallProvider(provider);
	const contract = new Contract(ticketContractAddr, abi);
	const ticketIdCall = contract.tokenOfOwnerByIndex(address, index);
	const ticketId = await ethcallProvider.all([ticketIdCall]);
	try {
		if (!ticketId) return;
		// TODO: fix this
		// const ticketCalls = [
		// 	contract.tokenURI(ticketId.toString()),
		// ];
		// const	[ticketBase64 = {}, ticketClass = 0] = await ethcallProvider.all(ticketCalls);
		const {assignation} = await getManagerTiketInfo(provider, ticketId.toString());
		// const {ticketJson, ticketImgUri} = parseSkinBase64(skinBase64);
		const assignInfo = {
			type: assignation?.toString().split(',')[0] === process.env.LAUNCH_ADVENTURERS_ADDR ? 'Adventurer' : 'Summoner',
			id: assignation?.toString().split(',')[1]
		};
		return callback({ticketId: ticketId?.toString(), assignation: assignInfo});
	} catch (e) {
		console.log(e);
	}
};

export const assignTicket = async (provider, ticketId, summonerId, address) => {
	const isSummoner = address === process.env.LAUNCH_SUMMONERS_ADDR ? 'Summoner': 'Adventurer';
	let _toast = toast.loading(`Assign ticket to ${isSummoner} ID ${summonerId} ...`);
	const signer = provider.getSigner();
	const managerContract = new ethers.Contract(process.env.LAUNCH_MANAGER_ADDR, LAUNCH_MANAGER_ABI, signer);
	
	try {
		const transaction = await managerContract.assignTicketToSummoner(ticketId, [address, summonerId]);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			onSuccessToast(_toast, 'Ticket is successfully assigned');
			return;
		}
	} catch (e) {
		onErrorToast(_toast);
		return;
	}
};

export const claimAllGTokens = async (provider) => {
	let _toast = toast.loading(`Claiming ${GTOKEN}...`);
	const signer = provider.getSigner();
	const managerContract = new ethers.Contract(process.env.LAUNCH_MANAGER_ADDR, LAUNCH_MANAGER_ABI, signer); 
	try {
		const transaction = await managerContract.claimAll();
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			onSuccessToast(_toast, `${GTOKEN} successfully claimed`);
			return;
		}
	} catch (e) {
		onErrorToast(_toast);
		return;
	}
};

export const claimGTokens = async (provider, ticketId) => {
	let _toast = toast.loading(`Claiming ${GTOKEN}...`);
	const signer = provider.getSigner();
	const managerContract = new ethers.Contract(process.env.LAUNCH_MANAGER_ADDR, LAUNCH_MANAGER_ABI, signer); 
	try {
		const transaction = await managerContract.claim(ticketId);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			onSuccessToast(_toast, `${GTOKEN} successfully claimed`);
			return;
		}
	} catch (e) {
		onErrorToast(_toast);
		return;
	}
};
