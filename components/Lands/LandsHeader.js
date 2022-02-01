import {useState} from 'react';
import Image from	'next/image';

import Typer from	'components/Typer';
import Box from 'components/Box';

const LandsHeader = () => {
	const [npcTextIndex, set_npcTextIndex] = useState(0);

	return (
		<div className={'flex flex-col md:flex-row items-center mb-8 md:mb-8'}>
			<div className={'w-auto md:w-64 mr-0 md:mr-0'} style={{minWidth: 256}}>
				<Image
					src={'/avatar/facu.png'}
					loading={'eager'}
					quality={100}
					width={256}
					height={256} />
			</div>
			<Box className={'p-4'}>
				<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
					{'STAKE TO EARN POINTS.'}
				</Typer>
			</Box>
		</div>
	);
};

export default LandsHeader;
