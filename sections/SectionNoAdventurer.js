import {useState}				from	'react';
import	Image							from	'next/image';
import	useWeb3							from	'contexts/useWeb3';
import	useUI							from	'contexts/useUI';
import	useRarity						from	'contexts/useRarity';
import	Typer							from	'components/Typer';
import	SectionRecruit					from	'sections/SectionRecruit';
import {GAME_NAME} from 'utils/constants';

function	FacuHeadline() {
	const	[facuTextIndex, set_facuTextIndex] = useState(0);
	
	const	renderFacuText = () => {
		return (
			<>
				<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 0}>
					{`WELCOME TO ${GAME_NAME}. I AM`}
				</Typer>&nbsp;
				<span className={'text-tag-info'}><Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 1}>
					{'VIGO'}
				</Typer></span>
				<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 2}>
					{', THE INNKEEPER'}
				</Typer>&nbsp;
				<div />
				<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 3}>
					{'THE JOURNEY YOU ARE ABOUT TO TAKE REQUIRE GOLD, GOODS, WEAPONS AND ARMOR. '}
				</Typer>&nbsp;
				<div className={'my-2'}/>
				<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 4}>
					{' YOUR SKILLS WILL BE TESTED TO THE LIMITS. BUT FIRST THINGS FIRST. WHAT KIND OF ADVENTURER ARE YOU ?'}
				</Typer>
			</>
		);
	};
	return (
		<h1 className={'text-sm md:text-lg leading-normal md:leading-10'}>
			{renderFacuText()}
		</h1>
	);
}

function	SectionNoAdventurer() {
	const	{theme} = useUI();
	const	{provider} = useWeb3();
	const	{fetchRarity} = useRarity();

	return (
		<section className={'max-w-full'}>
			<div className={'max-w-screen-lg w-full mx-auto'}>
				<div className={'flex flex-col md:flex-row items-center md:items-center mb-8 md:mb-16'}>
					<div className={'w-auto md:w-64 mr-0 md:mr-16'} style={{minWidth: 256}}>
						<Image
							src={theme === 'light' ? '/avatar/facu.png' : '/avatar/facu.png'}
							loading={'eager'}
							quality={100}
							width={256}
							height={256} />
					</div>
					<FacuHeadline />
				</div>
				<SectionRecruit shouldDisplay={true} provider={provider} fetchRarity={fetchRarity} />
			</div>
		</section>
	);		
}

export default SectionNoAdventurer;
