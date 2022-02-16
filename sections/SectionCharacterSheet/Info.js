import	{useState}	from	'react';
import  {ethers} from	'ethers';
import	toast				from	'react-hot-toast';
import	AutowidthInput		from	'react-autowidth-input';
import	Box					from	'components/Box';
import	useWeb3							from	'contexts/useWeb3';
import useRarity from 'contexts/useRarity';
import	CLASSES				from	'utils/codex/classes';
import	{levelUp, allowSgv}			from	'utils/actions';
import	{xpRequired}		from	'utils/libs/rarity';
import RARITY_NAMES_ABI from 'utils/abi/rarityNames.abi';

const claimName = async (name, id, provider, callback) => {
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
			return callback(id);
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

const	Info = ({adventurer, updateRarity, namePrice}) => {
	const	{provider} = useWeb3();
	const {governanceToken} = useRarity();
	const	[name, setName] = useState(adventurer.name || adventurer.tokenID);
	
	const	canLevelUp = adventurer.xp >= (xpRequired(adventurer.level));

	const handleSubmit = () => {
		if (name && (name !== (adventurer.name || adventurer.tokenID))) {
			return claimName(name, adventurer.tokenID, provider, updateRarity);
		}
	};

	const handleApproveRTY = (e) => {
		e.preventDefault();
		allowSgv(provider).then(updateRarity(adventurer.tokenID));
		
	};

	const handleLevelUp = () => {
		if (!canLevelUp) return;
		return levelUp({provider, contractAddress: process.env.RARITY_ADDR, tokenID: adventurer.tokenID}, ({error, data}) => {
			if (error) return console.error(error);
			return updateRarity(data);
		});
	};

	return (
		<Box className={'nes-container pt-6 px-4 with-title w-full md:w-2/3'}>
			<p className={'title bg-white dark:bg-dark-600 z-50 relative ' + `${governanceToken?.nameAllowance >= namePrice && !adventurer.name ? 'invisible' : ' '}`} style={{paddingTop: 2}}>{governanceToken?.nameAllowance >= namePrice ? adventurer.name : adventurer.tokenID}</p>
			<div className={'title bg-white dark:bg-dark-600 z-50 relative cursor-pointer group  ' + `${governanceToken?.nameAllowance >= namePrice && !adventurer.name ? '' : 'invisible'}`} style={{paddingTop: 20}}>
				<div className={'flex flex-row items-center'}>
					<AutowidthInput
						value={name}
						onChange={(e) => setName(e.target.value)}
						extraWidth={0}
						placeholder={adventurer.name || adventurer.tokenID}
						className={'bg-opacity-0 bg-white focus:outline-none pl-1 relative uppercase '} />
					<div
						onClick={handleSubmit}
						className={`ml-1 p-1 -m-1 transition-all opacity-0 ${name && (name !== (adventurer.name || adventurer.tokenID)) ? 'w-7 opacity-100 cursor-pointer' : 'w-0 group-hover:opacity-100 group-hover:w-7 cursor-default'}`}>
						{name && (name !== (adventurer.name || adventurer.tokenID)) ?
							<svg width={'20'} height={'20'} viewBox={'0 0 24 24'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
								<rect x={'6'} y={'16'} width={'4'} height={'4'} fill={'currentcolor'}/>
								<rect x={'2'} y={'12'} width={'4'} height={'4'} fill={'currentcolor'}/>
								<rect x={'14'} y={'8'} width={'4'} height={'4'} fill={'currentcolor'}/>
								<rect x={'18'} y={'4'} width={'4'} height={'4'} fill={'currentcolor'}/>
								<rect x={'10'} y={'12'} width={'4'} height={'4'} fill={'currentcolor'}/>
							</svg>
							:
							<svg width={'20'} height={'20'} viewBox={'0 0 24 24'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
								<path d={'M6.82861 14.6066L9.65704 17.435L5.4144 18.8492L6.82861 14.6066Z'} fill={'currentcolor'}/>
								<rect x={'13.1929'} y={'8.24255'} width={'4'} height={'7'} transform={'rotate(45 13.1929 8.24255)'} fill={'currentcolor'}/>
								<rect x={'17.4351'} y={'4'} width={'4'} height={'4'} transform={'rotate(45 17.4351 4)'} fill={'currentcolor'}/>
							</svg>
						}
					</div>
				</div>
			</div>
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
				<div className={'opacity-80 text-xs md:text-sm w-48'}>{'NAME:'}</div>
				<div className={'w-full text-right md:text-left pr-4 md:pr-0'}>
					{governanceToken?.nameAllowance >= namePrice  ? (<p>You can buy a name!</p>) : (<p>You should <a className={'cursor-pointer underline'} onClick={handleApproveRTY}>{'allow'}</a> $RTY first!</p>)}
				</div>
			</div>
			<div className={'flex flex-row items-center w-full py-2 relative'}>
				<div className={'opacity-80 text-sm w-48'}>{'XP:'}</div>
				<div className={'w-full'}>
					<div
						onClick={handleLevelUp}
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
};

export default Info;