/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				market.js
******************************************************************************/

import	React, {useState}				from	'react';
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
					{'Welcome to Scarcity. I´m Vigo the Innkeeper. Bazifra my daughter will soon host the launch party in our tavern. In the meantime feel free to explore the Cellar for crafting materials.'}
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
						
						{label: 'Wrap or unwrap your gold', onClick: () => router.push('/town/tavern')},
						{label: 'Buy, sell, pool or unpool wrapped gold', onClick: () => router.push('https://www.scarcity.gold/gold-and-wrapped-gold')},
						{label: 'Instructions', onClick: () => router.push('https://www.scarcity.gold/gold-and-wrapped-gold')},
					]} />
			</div>
		</section>
	);		
}

export default Index;
