import {useState}	from 'react';
import HeroHeader from 'components/HeroHeader';
import Typer from	'components/Typer';

const LaunchHeader = () => {
	const	[textIndex, setTextIndex] = useState(0);
	
	return (
		<HeroHeader imageUrl={'/avatar/ivanna.png'}>
			<h1 className={'text-xs md:text-xs leading-normal md:leading-8'}>
				<Typer onDone={() => setTextIndex(i => i + 1)} shouldStart={textIndex === 0}>
					{'Attend the Launch Party to receive $SGV tokens. You need a costume to get into the launch party. As soon as you are dressed in a costume you are in and start farming $SGV. Rogues earn 20% of all farmed $SGV in a deal struck with the tavern keeper so that they keep the peace!'}
				</Typer>&nbsp;
			</h1>
		</HeroHeader>
	);
};

export default LaunchHeader;
