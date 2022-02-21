import	{useEffect, useState}				from	'react';
import  {ethers} 						from 'ethers';
import	Image							from	'next/image';
import  useRarity 						from 	'contexts/useRarity';
import	useUI							from	'contexts/useUI';
import	useWeb3							from	'contexts/useWeb3';
import	Typer							from	'components/Typer';
import	DialogBox						from	'components/DialogBox';
import	Box								from	'components/Box';
import  ModalGoldWrapper				from	'components/ModalGoldWrapper';
import	useSWR							from	'swr';
import 	WRAPPED_GOLD_ABI 				from 	'utils/abi/wrappedGold.abi';
import 	{approveWrappedGold} 				from	'utils/gold';
import {GAME_NAME} from 'utils/constants';
import {getWGoldAllowance} from 'utils/actions';
import BoxWithTitle from 'components/BoxWithTitle';


function	FacuHeadline() {
	const	[facuTextIndex, set_facuTextIndex] = useState(0);
	
	const	renderFacuText = () => {
		return (
			<>
				<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 0}>
					{`$RG IS THE CURRENCY OF THE ${GAME_NAME}. IT CAN ONLY BE HELD BY ADVENTURERS AND IS MAINLY USED FOR CRAFTING. YOU CAN WRAP IT FOR TRADING OR BUYING OTHER THINGS.`}
				</Typer>&nbsp;
			</>
		);
	};
	return (
		<h1 className={'text-xs md:text-xs leading-normal md:leading-8'}>
			{renderFacuText()}
		</h1>
	);
}

function	Index() {
	const {theme} = useUI();
	const {currentAdventurer} = useRarity();
	const {address, provider} = useWeb3();
	const [wGoldModalOpen, set_wGoldModalOpen] = useState(false);
	const [allowance, setAllowance] = useState(null);
	const [goldName, setGoldName] = useState('$WG');

	const {data: wGold} = useSWR([provider, address], async (userProvider, userAddress) => {
		const wrappedGoldContract = new ethers.Contract(process.env.WRAPPED_GOLD, WRAPPED_GOLD_ABI, userProvider);
		const wGoldOnAcc = await wrappedGoldContract.balanceOf(userAddress);
		return wGoldOnAcc.toString();
	}, []);

	const selectGoldAction = (gold) => {
		setGoldName(gold);
		set_wGoldModalOpen(true);
	};

	useEffect(() => {
		if (!provider && !currentAdventurer) return;
		if (allowance !== null) return;
		getWGoldAllowance(provider, currentAdventurer?.tokenID, setAllowance);
	}, [currentAdventurer, allowance, provider]);

	const wGoldBalance = ethers.utils.formatUnits(wGold || 0);
	const handleApproveGold = () => {
		approveWrappedGold(currentAdventurer.tokenID, provider, ({error}) => error && console.error(error));
	};

	let options = [
		{label: 'Wrap a defined amount of gold (field to fill in) for that adventurer', onClick: () => selectGoldAction('$RG')},
		{label: 'Unwrap a defined amount of gold (field to fill in) to current adventurer', onClick: () => selectGoldAction('$WG')},
		{label: 'See instructions', onClick: () => {
			const win = window.open('https://www.scarcity.gold/gold-and-wrapped-gold', '_blank');
			win.focus();
		}},
	];

	if (!allowance || allowance === 0) {
		options.unshift({label: 'Approve Gold (for the selected adventurer)', onClick: handleApproveGold});
	}

	return (
		<section className={'max-w-full'}>
			<div className={'max-w-screen-lg w-full mx-auto'}>
				<div className={'flex flex-col md:flex-row items-center mb-8 md:mb-8'}>
					<div className={'w-auto md:w-64 mr-0 md:mr-8'} style={{minWidth: 256}}>
						<Image
							src={theme === 'light' ? '/avatar/facu.png' : '/avatar/facu.png'}
							loading={'eager'}
							quality={100}
							width={256}
							height={256} />
					</div>
					<Box className={'p-4'}>
						<FacuHeadline />
					</Box>
				</div>
				
				<BoxWithTitle title={'Gold information'} className={'mb-8'}>
					<div className={'mb-4'}>{`Adventurer Gold Balance: ${Number(currentAdventurer?.gold?.balance || 0).toFixed(2)} $RG`}</div>
					<div>
						<div className={'mb-4'}>{`Gold Balance: ${Number(wGoldBalance).toFixed(2)} $WG`}</div>
						<div>{`Address: ${address}`}</div>
					</div>
				</BoxWithTitle>
				<DialogBox
					options={options} />
			</div>
			<ModalGoldWrapper
				allowance={allowance}
				tokenId={currentAdventurer?.tokenID}
				gold={Number(wGoldBalance).toFixed(2)}
				adventurerGold={Number(currentAdventurer?.gold?.balance).toFixed(2)}
				goldName={goldName}
				isOpen={wGoldModalOpen}
				closeModal={() => set_wGoldModalOpen(false)}
			/>
		</section>
	);		
}

export default Index;
