/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				Footer.js
******************************************************************************/

import	React			from	'react';
import	useUI			from	'contexts/useUI';

function	Footer() {
	const	{theme, switchTheme} = useUI();
	return (
		<div className={'absolute bottom-3 text-center text-xxs left-0 right-0 flex flex-col justify-center items-center'}>
			
			<div onClick={switchTheme} className={'py-2 hover:underline cursor-pointer'}>
				{`Switch to ${theme === 'light' || theme === 'light-initial' ? 'dark' : 'light'} mode`}
			</div>
			<div>
				<a href={'https://github.com/degen-vc/scarcity/tree/v2'} target={'_blank'} rel={'noopener noreferrer'}>{'Github'} </a> { ' | '}
				<a href={'https://twitter.com/scarcitygverse'} target={'_blank'} rel={'noopener noreferrer'}>{'Twitter'} </a> { ' | '}
				<a href={'https://discord.gg/S584hZNTUJ'} target={'_blank'} rel={'noopener noreferrer'}>{'Discord'} </a> { ' | '}
				<a href={'https://github.com/Rarity-Extended/RarityExtended'} target={'_blank'} rel={'noopener noreferrer'}>{'Original Code'} </a> { ' | '}
				<a href={'https://degen-vc.gitbook.io/scarcity/'} target={'_blank'} rel={'noopener noreferrer'}>{'Docs'} </a> { ' | '}
				<a href={'https://scarcity.gold/'} target={'_blank'} rel={'noopener noreferrer'}>{'Guide'} </a> { ' | '}
				<a href={'https://opensea.io/collection/scarcity-adventurers'} target={'_blank'} rel={'noopener noreferrer'}>{'OpenSea'} </a> 
			</div>
		</div>
	);
}
export default Footer;
