import BoxWithTitle from 'components/BoxWithTitle';

const LaunchInfoArticle = ({skinBalance = '0', currentAdventurer = ''}) => (
	<BoxWithTitle title={'RARITY 2 ADVENTURERS AND RARITY CLASSIC SUMMONERS. JOIN THE LAUNCH PARTY!'} className={'mt-12'}>
		<article className={'text-sm opacity-80 mt-12 pt-10 pb-6 sm:mt-0'}>
			<p className={'pb-4'}>{'RARITY 2 ADVENTURERS AND RARITY CLASSIC SUMMONERS CAN ATTEND THE RARITY 2 LAUNCH PARTY.'}</p>
			<p className={'pb-4'}>{'BUT THE DIFFERENCE IS THAT SUMMONERS RAID!'}</p>
			<p className={'pb-4'}>{'20% OF ALL $RGV TOKENS FARMED BY RARITY 2 ADVENTURERS ARE TAKEN BY SUMMONERS!'}</p>
			<p className={'pb-4'}>{'THE HIGHER THE SUMMONERS LEVEL THE GREATER SHARE THEY TAKE.'}</p>
			{(currentAdventurer && (!skinBalance || Number(skinBalance) === 0)) &&
				<div className={'py-2 text-center w-full text-tag-withdraw'}>{'You have no tickets yet...'}</div>
			}
			<div className={'text-center mt-6 opacity-60 hover:opacity-100'}>
				<a href={'https://medium.com/scarcity-gameverse/the-launch-party-b74f736f3f69'} target={'_blank'} rel={'noopener noreferrer'}>
					{'LEARN MORE  >'}
				</a>
			</div>
			<div className={'text-center mt-4 opacity-60 hover:opacity-100'}>
				<a href={'https://twitter.com/rarity2game'} target={'_blank'} rel={'noopener noreferrer'}>
					{'FOLLOW TWITTER FOR THE ACTION AS IT HAPPENS  >'}
				</a>
			</div>
		</article>
	</BoxWithTitle>
);

export default LaunchInfoArticle;
