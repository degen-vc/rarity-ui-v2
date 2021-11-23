/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 19th 2021
**	@Filename:				index.js
******************************************************************************/

import	React, {useState, useEffect}	from	'react';
import	toast				from	'react-hot-toast';

import	Image				from	'next/image';
import	CLASSES				from	'utils/codex/classes';
import	{levelUp}			from	'utils/actions';
import	{xpRequired}		from	'utils/libs/rarity';
import	Box					from	'components/Box';
import	Attributes			from	'sections/SectionCharacterSheet/Attributes';	
import	Balloon				from	'sections/SectionCharacterSheet/Balloon';	
import	Skills				from	'sections/SectionCharacterSheet/Skills';	
import	Inventory			from	'sections/SectionCharacterSheet/Inventory';
import	{classMappingImg}	from	'utils/constants';
import  {ethers} from	'ethers';
import	{Provider, Contract}				from	'ethcall';
import	useWeb3								from	'contexts/useWeb3';

import 	RARITY_NAMES_ABI from 'utils/abi/rarityNames.abi';
import 	USDC_ABI from 'utils/abi/USDC.abi';





async function newEthCallProvider(provider, devMode) {

	const	ethcallProvider = new Provider();
	if (devMode) {
		await	ethcallProvider.init(new ethers.providers.JsonRpcProvider('http://localhost:8545'));
		ethcallProvider.multicallAddress = process.env.MULTICALL_ADDRESS;
		ethcallProvider.multicall2Address = process.env.MULTICALL2_ADDRESS;
		return ethcallProvider;
	}
	await	ethcallProvider.init(provider);
	return	ethcallProvider;
}

async function	fetchAdventurer(calls) {
	const	{active, address, chainID, provider} = useWeb3();

	const	ethcallProvider = await newEthCallProvider(provider, Number(chainID) === 1337);
	const	callResult = await ethcallProvider.all(calls);
	return (callResult);
}

async function checkUSDCallowance(address) {


	const usdc = new Contract(process.env.USDC_ADDR, USDC_ABI);

	const [allowance] = await fetchAdventurer([usdc.allowance(address, process.env.RARITY_NAMES_ADDR)]);
	console.log(` USDC allowance - ${allowance}`);
	// return allowance;
}

async function claimName(name, id, active, address, chainID, provider, callback) {
	const	_toast = toast.loading(`Claiming name ${name}...`);

	const signer = provider.getSigner();

	const claimName = new ethers.Contract(
		process.env.RARITY_NAMES_ADDR, 
		['function claim (string memory name, uint256 summoner) external returns (uint256 name_id)'],
		signer
	);

	try {
		await claimName.callStatic.claim(name, id);
	} catch (error) {
		toast.dismiss(_toast);
		toast.error('Impossible to submit transaction');
		callback({error, data: undefined});
		return;
	}

	try {
		const	transaction = await claimName.claim(name, id);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status == 1) {
			callback({error: false, data: id});
			toast.dismiss(_toast);
			toast.success('Transaction successful');
		} else {
			console.log(transactionResult.status);
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
			callback({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: name});
	}

	// const rarityName = await claimName.claim(name, id);

	// console.log(`${rarityName}`);
}

async function getUSDCallowance(provider, callback) {
	const	_toast = toast.loading('Approving USDC use');

	const signer = provider.getSigner();

	const claimName = new ethers.Contract(
		process.env.USDC_ADDR, 
		['function approve(address spender, uint256 amount) external returns (bool)'],
		signer
	);

	try {
		await claimName.callStatic.approve(process.env.RARITY_NAMES_ADDR, 10000);
	} catch (error) {
		toast.dismiss(_toast);
		toast.error('Impossible to submit transaction');
		callback({error, data: undefined});
		return;
	}

	try {
		const	transaction = await claimName.approve(process.env.RARITY_NAMES_ADDR, 10000);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status == 1) {
			callback({error: false, data: 'id'});
			toast.dismiss(_toast);
			toast.success('Transaction successful');
		} else {
			console.log(transactionResult.status);
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
			callback({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: 'id'});
	}

	// const allowance = await claimName.approve(process.env.RARITY_NAMES_ADDR, 10000);

	// console.log(`${allowance}`,);
	// return allowance;
}




function	AdventurerTab({adventurer, updateRarity, provider}) {

	const	[selectedTab, set_selectedTab] = useState(0);
	

	// namesGet();
	return (
		<Box className={'flex flex-col w-full mt-2'}>
			<div className={'flex flex-col md:flex-row w-full space-x-0 md:-space-x-1'}>
				<div
					onClick={() => set_selectedTab(0)}
					className={`w-full cursor-pointer text-center border-solid ${selectedTab === 0 ? 'border-b-0 bg-gray-principal md:bg-white dark:bg-dark-400 md:dark:bg-dark-600' : 'border-b-0 md:border-b-4'} border-black dark:border-dark-100 text-center py-4`}>
					<p>{'Skills'}</p>
				</div>
				<div
					onClick={() => set_selectedTab(1)}
					className={`w-full cursor-pointer text-center border-solid border-l-0 md:border-l-4 ${selectedTab === 1 ? 'bg-gray-principal md:bg-white dark:bg-dark-400 md:dark:bg-dark-600 border-b-4 md:border-b-0' : 'border-b-4 md:border-b-4'} border-black dark:border-dark-100 text-center py-4`}>
					<p>{'Inventory'}</p>
				</div>
			</div>
			<div className={'w-full border-black dark:border-dark-100 py-4 md:-mt-1'}>
				{selectedTab === 0 ? <Skills adventurer={adventurer} updateRarity={updateRarity} provider={provider} /> : <Inventory adventurer={adventurer} />}
			</div>
		</Box>
	);
}

const	Info = ({adventurer, updateRarity, provider}) => {
	// const	{provider2, chainID} = useWeb3();
	const	{active, address, chainID, provider2} = useWeb3();

	checkUSDCallowance(address).then(data => setAllawance(data));;
	

	const [input, setInput] = useState('');
	const [allowance, setAllawance] = useState(0);

	// checkUSDCallowance(active, address, chainID, provider).then(data => {
	// 	setAllawance(data);
	// });
	// async function getUSDCallowanceInner() {
	// 	let allow = await checkUSDCallowance(active, address, chainID, provider).then(data => data);
	// 	return allow;
	// }

	// checkUSDCallowance(address).then(data => setAllawance(data));


	useEffect(() => {
		// let hello = '';
		
		// checkUSDCallowance(address).then(data => hello = data);
	
		// checkUSDCallowance(address).then(data => setAllawance(data));

		// console.log(hello);
	}, []);

	let handleChange = (event) => {
		setInput(event.target.value);
	};

	let handleSubmit = (event)=> {
		event.preventDefault();
		claimName(input, adventurer.tokenID, active, address, chainID, provider, ({error, data}) => {
			if (error) {
				return console.error(error);
			}
			updateRarity(adventurer.tokenID);
		}); 
	};


	let handleSubmitAllowance = (event)=> {
		event.preventDefault();
		getUSDCallowance(provider,({error, data}) => {
			if (error) {
				return console.error(error);
			}
			updateRarity(adventurer.tokenID);
		});
	};
	
	const	canLevelUp = adventurer.xp >= (xpRequired(adventurer.level));
	return (
		<Box className={'nes-container pt-6 px-4 with-title w-full md:w-2/3'}>
			<p className={'title bg-white dark:bg-dark-600 z-50 relative'} style={{paddingTop: 2}}>{adventurer.name || adventurer.tokenID}</p>
			<div className={'flex flex-row items-center w-full py-2'}>
				<div className={'opacity-80 text-xs md:text-sm w-48'}>{'ID:'}</div>
				<div className={'w-full text-right md:text-left pr-4 md:pr-0'}>
					<p>{adventurer.tokenID}</p>
				</div>
			</div>
			<div className={'flex flex-row items-center w-full py-2'}>
				<div className={'opacity-80 text-xs md:text-sm w-48'}>{'CLASS:'}</div>
				<div className={'w-full text-right md:text-left pr-4 md:pr-0'}>
					<p>{CLASSES[adventurer.class].name}</p>
				</div>
			</div>
			<div className={'flex flex-row items-center w-full py-2'}>
				<div className={'opacity-80 text-xs md:text-sm w-48'}>{'LEVEL:'}</div>
				<div className={'w-full text-right md:text-left pr-4 md:pr-0'}>
					<p>{adventurer.level}</p>
				</div>
			</div>
			<div className={'flex flex-row items-center w-full py-2'}>
				<div className={'opacity-80 text-xs md:text-sm w-48'}>{adventurer.name ? 'GOLD:' : 'GET NAME:'}</div>
				<form className={adventurer.name ? 'd-none' : ''} onSubmit={adventurer.usdcAllw >= 10000 ? handleSubmit : handleSubmitAllowance}>
					{adventurer.usdcAllw >= 10000 ? (<input className={`border border-dark`} onChange={handleChange}></input>) : (<button style={{textDecoration: 'underline'}}>Allow USDC use</button>)}
					
				</form>
				<div className={adventurer.name ? 'w-full text-right md:text-left pr-4 md:pr-0' : 'd-none' }>
					<p>{`${Number(adventurer?.gold?.balance || 0) === 0 ? '0' : adventurer.gold.balance}`}</p> 
					
					
				</div>
			</div>
			<div className={'flex flex-row items-center w-full py-2 relative'}>
				<div className={'opacity-80 text-sm w-48'}>{'XP:'}</div>
				<div className={'w-full'}>
					<div
						onClick={() => {
							if (canLevelUp) {
								levelUp({
									provider,
									contractAddress: process.env.RARITY_ADDR,
									tokenID: adventurer.tokenID,
								}, ({error, data}) => {
									if (error) {
										return console.error(error);
									}
									updateRarity(data);
								});
							}
						}}
						className={`nes-progress border-solid border-2 border-black dark:border-dark-400 w-full relative ${canLevelUp ? 'cursor-pointer' : ''}`}>
						<progress
							className={`progressbar h-full ${canLevelUp ? 'is-warning animate-pulse' : 'is-primary'} w-full absolute p-1 inset-0`}
							value={adventurer.xp}
							max={xpRequired(adventurer.level)} />
						<p className={`text-sx absolute inset-0 h-full w-full text-center flex justify-center items-center ${canLevelUp ? 'text-black' : 'text-white text-shadow'}`}>
							{canLevelUp ? 'LEVEL-UP!' : `${Number(adventurer.xp)} / ${xpRequired(adventurer.level)}`}
						</p>
					</div>
				</div>
			</div>
		</Box>
	);
}

function	Adventurer({rarity, provider, updateRarity, router, chainTime}) {
	return (
		<div className={'w-full'}>
			<div className={'flex flex-row w-full mb-6'}>
				<div className={'w-full flex flex-col-reverse md:flex-row justify-start'}>
					<div className={'w-64'} style={{minWidth: 256}}>
						<Image
							src={classMappingImg[rarity.class]}
							loading={'eager'}
							quality={100}
							width={256}
							height={256} />
					</div>
					<div>
						<section className={'message -left'}>
							<Balloon
								adventurer={rarity}
								chainTime={chainTime}
								updateRarity={updateRarity}
								provider={provider}
								router={router} />
						</section>
					</div>
				</div>
			</div>
			<div className={'flex flex-col md:flex-row w-full space-x-0 md:space-x-4 space-y-6 md:space-y-0'}>
				<Info adventurer={rarity} updateRarity={updateRarity} provider={provider} />
				<Attributes adventurer={rarity} updateRarity={updateRarity} provider={provider} />
			</div>
			<AdventurerTab adventurer={rarity} updateRarity={updateRarity} provider={provider} />
		</div>
	);
}

export default Adventurer;