import {useState}	from 'react';
import HeroHeader from 'components/HeroHeader';
import Typer from	'components/Typer';

const LaunchHeader = () => {
	const	[textIndex, setTextIndex] = useState(0);
	
	return (
		<HeroHeader imageUrl={'/avatar/ivanna.png'}>
			<h1 className={'text-xs md:text-xs leading-normal md:leading-8'}>
				<Typer onDone={() => setTextIndex(i => i + 1)} shouldStart={textIndex === 0}>
					{'ATTEND THE LAUNCH PARTY TO FARM $RGVV TOKENS. YOU NEED A TICKET TO GET INTO THE LAUNCH PARTY. RARITY CLASSIC SUMMONERS ARE ABLE TO RAID THE LAUNCH PARTY AND EARN 20% OF ALL FARMED $RGVV.'}
				</Typer>&nbsp;
			</h1>
		</HeroHeader>
	);
};

export default LaunchHeader;
