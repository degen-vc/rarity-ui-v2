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
				{'Made with 💙 by the 🕹 community'}
			</div>
		</div>
	);
}
export default Footer;
