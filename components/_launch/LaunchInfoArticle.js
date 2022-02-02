import BoxWithTitle from 'components/BoxWithTitle';

const LaunchInfoArticle = () => {
	return (
		<BoxWithTitle title={'DRESS YOUR ADVENTURER FOR THE PARTY'} className={'mt-12'}>
			<article className={'text-sm'}>
				<p className={'pb-2'}>{'The costumes are generated at random as one of the 11 Adventurer classes.'}</p>
				<p className={'pb-2'}>{'As an example, if you own a Paladin and mint one costume, you may not receive a Paladin costume.'}</p>
				<p className={'pb-2'}>{'If you have the matching Adventurer, you can immediately connect the costume.'}</p>
				<p className={'pb-2'}>{'You have two options if you don\'t have a matching costume.'}</p>
				<p className={'pb-2'}>{'You could sell that costume on open-sea.'}</p>
				<p className={'pb-2'}>{'You could mint an Adventurer to go along with that costume.'}</p>
				<div className={'text-center mt-6 opacity-60 hover:opacity-100'}>
					<a href={'https://scarcity.gold'} target={'_blank'} rel={'noopener noreferrer'}>
						{'Learn More  >'}
					</a>
				</div>
			</article>
		</BoxWithTitle>
	);
};

export default LaunchInfoArticle;