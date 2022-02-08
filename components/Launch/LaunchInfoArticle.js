import BoxWithTitle from 'components/BoxWithTitle';

const LaunchInfoArticle = ({skinBalance = '0', currentAdventurer = ''}) => (
	<BoxWithTitle title={'DRESS YOUR ADVENTURER FOR THE PARTY'} className={'mt-12'}>
		<article className={'text-sm opacity-80 mt-10 sm:mt-0'}>
			<p className={'pb-4'}>{'The costumes are generated at random as one of the 11 Adventurer classes.'}</p>
			<p className={'pb-4'}>{'As an example, if you own a Paladin and mint one costume, you may not receive a Paladin costume.'}</p>
			<p className={'pb-4'}>{'If you have the matching Adventurer, you can immediately connect the costume.'}</p>
			<p className={'pb-4'}>{'You have two options if you don\'t have a matching costume.'}</p>
			<p className={'pb-4'}>{'You could sell that costume on open-sea.'}</p>
			<p className={'pb-4'}>{'You could mint an Adventurer to go along with that costume.'}</p>
			{(currentAdventurer && (!skinBalance || Number(skinBalance) === 0)) &&
				<div className={'py-2 text-center w-full text-tag-withdraw'}>{'You have no costumes yet...'}</div>
			}
			<div className={'text-center mt-6 opacity-60 hover:opacity-100'}>
				<a href={'https://scarcity.gold'} target={'_blank'} rel={'noopener noreferrer'}>
					{'Learn More  >'}
				</a>
			</div>
		</article>
	</BoxWithTitle>
);

export default LaunchInfoArticle;
