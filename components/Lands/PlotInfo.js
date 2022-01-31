import Button	from 'components/Button';
import BoxWithTitle from 'components/BoxWithTitle';
import InfoBlock from 'components/lands/InfoBlock';

const PlotInfo = ({plot, buyPlot, staked, points, rewardNeeded, canBuy, sgvBalance}) => {
	const renderPlotActions = () => {
		if (!plot) return null;
		if (plot?.owner) {
			return <p className={'text-center w-3/4 m:w-full mx-auto'}>{plot?.isOwner ? 'You\'ve already own this plot' : 'Someone already owns this plot'}</p>;
		}
		if (canBuy) {
			return (
				<Button
					className={'inline-block cursor-pointer hover:bg-white focus:bg-white dark:hover:bg-dark-600 dark:focus:bg-dark-600 bg-gray-principal dark:bg-dark-400 text-center'}
					backgroundColor={'bg-gray-principal dark:bg-dark-400'}
					onClick={buyPlot} >
					{'BUY PLOT'}
				</Button>
			);
		}
		if (staked && points !== 0 && points < rewardNeeded) {
			return (
				<>
					<p>{'NOT ENOUGH POINTS'}</p>
					<p className={'text-blackLight text-megaxs'}>{'Be patient. Your points balance is growing'}</p>
				</>
			);
		} else if (points === 0 && sgvBalance) {
			return <p className={'text-center w-3/4 m:w-full mx-auto'}>{'Stake $SGV tokens to earn points'}</p>;
		} else if (points < rewardNeeded && !sgvBalance) {
			return <p className={'text-center w-3/4 m:w-full mx-auto'}>{'$SGV tokens are needed to buy plot'}</p>;
		}
	};

	return (
		<BoxWithTitle className={'my-12'} title={'Buy plot'}>
			<div className={'text-center m:text-left xs:flex'}>
				<div className={'m:flex flex-1'}>
					<InfoBlock
						className={'flex-1 mb-4 m:mb-0'}
						name={'Your points:'}
						value={points && Number(points).toFixed(4)} />
					<InfoBlock
						className={'flex-1 mb-4 xs:mb-0'}
						name={'Points to buy:'}
						value={rewardNeeded && Number(rewardNeeded).toFixed(4)} />
				</div>
				<div className={'flex flex-col m:flex-row flex-1 items-center justify-between m:items-end'}>
					<InfoBlock
						className={'m:flex-1'}
						name={'Coordinates:'}
						value={`X: ${plot?.x || '-'}, Y: ${plot?.y || '-'}`} />
					<div className={'m:flex-1 text-xs mt-4 xs:mt-0 m:text-right'}>{renderPlotActions()}</div>
				</div>
			</div>
		</BoxWithTitle>
	);
};

export default PlotInfo;
