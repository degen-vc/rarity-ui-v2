import	{useState}				     from	'react';
import	Image							     from	'next/image';
import	useUI							     from	'contexts/useUI';
import	Box								     from	'components/Box';
import	Typer							     from	'components/Typer';

const TransferHeader = () => {
	const	{theme} = useUI();
	const	[textIndex, setTextIndex] = useState(0);
	
	return (
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
				<h1 className={'text-xs md:text-xs leading-normal md:leading-8'}>
					<Typer onDone={() => setTextIndex(i => i + 1)} shouldStart={textIndex === 0}>
						{'Easily transfer SGOLD and Craft (I) Materials between your Adventurers so you can optimise your crafting success.'}
					</Typer>&nbsp;
				</h1>
			</Box>
		</div>
	);
};

export default TransferHeader;
