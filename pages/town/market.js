/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				market.js
******************************************************************************/

import	{useState}				from	'react';
import	Image							from	'next/image';
import	useUI							from	'contexts/useUI';
import	Typer							from	'components/Typer';
import	DialogBox						from	'components/DialogBox';
import	Box								from	'components/Box';

function	FacuHeadline() {
	const	[facuTextIndex, set_facuTextIndex] = useState(0);
	
	const	renderFacuText = () => {
		return (
			<>
				<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 0}>
					{'I´M VIGO THE INNKEEPER. YES, A MARKET IS BEING BUILT FOR GOODS, ARMOR AND WEAPONS DENOMINATED IN GOLD. YOU CAN ALSO TRADE THEM ON OPENSEA - THATS AVAILABLE RIGHT NOW. GOOD TRADING TO YOU!'}
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

function	Index({router}) {
	const	{theme} = useUI();

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
				<DialogBox
					options={[
						
						{label: 'Wrap or unwrap your gold', onClick: () => {
							const win = window.open('https://polygonscan.com/address/0x07ff88589262F3f2D3090B79f7B7A00165dd4585#writeContract', '_blank');
							win.focus();
						}
						},
						{label: 'Buy, sell, pool or unpool wrapped gold', onClick: () => {
							const win = window.open('https://www.scarcity.gold/gold-and-wrapped-gold', '_blank');
							win.focus();
						}},
						{label: 'Instructions', onClick: () => {
							const win = window.open('https://www.scarcity.gold/gold-and-wrapped-gold', '_blank');
							win.focus();
						}},
					]} />
			</div>
		</section>
	);		
}

export default Index;
