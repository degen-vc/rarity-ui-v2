/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				gold.js
******************************************************************************/

import	{useState}				from	'react';
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

function	FacuHeadline() {
	const	[facuTextIndex, set_facuTextIndex] = useState(0);
	
	const	renderFacuText = () => {
		return (
			<>
				<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 0}>
					{'SGOLD IS THE CURRENCY OF THE SCARCITY GAMEVERSE. IT CAN ONLY BE HELD BY ADVENTURERS AND IS MAINLY USED FOR CRAFTING. YOU CAN WRAP IT FOR TRADING OR BUYING OTHER THINGS.'}
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
	const {currentAdventurer, openCurrentAdventurerModal} = useRarity();
	const {address, provider} = useWeb3();
	const [wGoldModalOpen, set_wGoldModalOpen] = useState(false);

	const {data: wGold} = useSWR([provider, address], async (userProvider, userAddress) => {
		const wrappedGoldContract = new ethers.Contract(process.env.WRAPPED_GOLD, WRAPPED_GOLD_ABI, userProvider);
		const wGoldOnAcc = await wrappedGoldContract.balanceOf(userAddress);
		return wGoldOnAcc.toString();
	}, []);

	const handleApproveGold = () => {
		approveWrappedGold(currentAdventurer.tokenID, provider, ({error}) => error && console.error(error));
	};

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
				
				<Box className={'p-4 mb-6'}>
					<div className={'mb-6'}>{`Adventurer Gold Balance: ${Number(currentAdventurer?.gold?.balance || 0).toFixed(1)}`}</div>
					<div>
						<div>{`wGold Balance: ${ethers.utils.formatUnits(wGold || 0)}`}</div>
						<div>{`Address: ${address}`}</div>
					</div>
				</Box>
				<DialogBox
					options={[
						{label: 'Approve Gold (for the selected adventurer)', onClick: handleApproveGold},
						{label: 'Wrap a defined amount of gold (field to fill in) for that adventurer', onClick: () => set_wGoldModalOpen(true)},
						{label: 'See instructions', onClick: () => {
							const win = window.open('https://www.scarcity.gold/gold-and-wrapped-gold', '_blank');
							win.focus();
						}},
						{label: 'Select a different Adventurer', onClick: openCurrentAdventurerModal},
					]} />
			</div>
			<ModalGoldWrapper isOpen={wGoldModalOpen} closeModal={() => set_wGoldModalOpen(false)} />
		</section>
	);		
}

export default Index;
