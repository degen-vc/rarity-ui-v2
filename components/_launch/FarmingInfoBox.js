import BoxWithTitle from 'components/BoxWithTitle';
import InfoRow from 'components/InfoRow';
import Button	from 'components/Button';

const FarmingInfoBox = ({sgvTotal, sgvBalance, sgvYield, sgvRogueYield, sgvAvailable, clamSGV}) => {
	return (
		<BoxWithTitle title={'MY FARMING DATA'} className={'m:w-2/3 m:mr-6 text-center'}>
			<InfoRow name={'TOTAL TOKENS AVAILABLE'} value={sgvTotal} />
			<InfoRow name={'YOUR BALANCE'} value={sgvBalance} />
			<InfoRow name={'ADVENTURERS YIELD PER DAY'} value={sgvYield}  />
			<InfoRow name={'APPROX. ROUGES YIELD (20%)'} value={sgvRogueYield}  />
			<InfoRow name={'CLAIMABLE'} value={sgvAvailable} />
			<Button
				className={'mt-4 inline-block cursor-pointer hover:bg-white focus:bg-white dark:hover:bg-dark-400 dark:focus:bg-dark-400 bg-gray-principal dark:bg-dark-400 text-center'}
				backgroundColor={'bg-gray-principal dark:bg-dark-400'}
				onClick={() => clamSGV} >
				{'CLAIM'}
			</Button>
		</BoxWithTitle>
	);
};

export default FarmingInfoBox;
