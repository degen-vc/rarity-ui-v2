import	useUI			from	'contexts/useUI';

function	Footer() {
	const	{theme, switchTheme} = useUI();
	return (
		<div className={'absolute bottom-3 text-center text-xxs left-0 right-0 flex flex-col justify-center items-center'}>
			
			<div onClick={switchTheme} className={'py-2 hover:underline cursor-pointer'}>
				{`Switch to ${theme === 'light' || theme === 'light-initial' ? 'dark' : 'light'} mode`}
			</div>
			<div>
				<a href={'https://github.com/degen-vc/rarity-v2'} target={'_blank'} rel={'noopener noreferrer'}>{'Github'} </a> { ' | '}
				<a href={'https://twitter.com/rarity2game'} target={'_blank'} rel={'noopener noreferrer'}>{'Twitter'} </a> { ' | '}
				<a href={'https://discord.gg/S584hZNTUJ'} target={'_blank'} rel={'noopener noreferrer'}>{'Discord'} </a> { ' | '}
				<a href={'https://github.com/Rarity-Extended/RarityExtended'} target={'_blank'} rel={'noopener noreferrer'}>{'Original Code'} </a> { ' | '}
				<a href={'https://degen-vc.gitbook.io/rartiy2+scarcity/'} target={'_blank'} rel={'noopener noreferrer'}>{'Docs'} </a> { ' | '}
				<a href={'http://rarity.gold/'} target={'_blank'} rel={'noopener noreferrer'}>{'Guide'} </a> { ' | '}
				<a href={'https://medium.com/scarcity-gameverse'} target={'_blank'} rel={'noopener noreferrer'}>{'Medium'} </a> { ' | '}
				<a href={'https://t.me/rarity2_scarcity'} target={'_blank'} rel={'noopener noreferrer'}>{'Telegram'} </a> { ' | '}
				<a href={'https://paintswap.finance/marketplace/collections/0x3b32294bc575b5c4c1e86a04b67d33b3f100fc4c?cache=no'} target={'_blank'} rel={'noopener noreferrer'}>{'Paintswap'} </a> 
			</div>
		</div>
	);
}
export default Footer;
