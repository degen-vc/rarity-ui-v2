import BoxWithTitle from 'components/BoxWithTitle';
import InfoBlock from 'components/InfoBlock';
import Button	from 'components/Button';

const FarmingInfoBox = ({sgvTotal, sgvBalance, sgvYield, sgvRogueYield, sgvAvailable, clamSGV}) => {
	return (
		<BoxWithTitle title={'MY FARMING DATA'} className={'md:w-2/3 md:mr-6 text-center'}>
			<div className={'xs:flex'}>
				<InfoBlock className={'flex-1 mb-4 px-2'} name={'TOTAL TOKENS AVAILABLE'} value={sgvTotal} />
				<InfoBlock className={'flex-1 text-center'} name={'YOUR BALANCE'} value={sgvBalance} />
			</div>
			<div className={'xs:flex my-4 xs:my-0 xs:mt-4'}>
				<InfoBlock className={'flex-1 mb-4 px-2'} name={'ADVENTURERS YIELD $SGV/PER DAY'} value={sgvYield}  />
				<InfoBlock className={'flex-1 text-center'} name={'APPROX. ROUGES YIELD (20%)'} value={sgvRogueYield}  />
			</div>
			<div className={'xs:flex xs:mt-4'}>
				<InfoBlock className={'flex-1 px-2'} name={'CLAIMABLE'} value={sgvAvailable} />
				<div className={'flex-1 mt-4 xs:mt-2'}>
					<Button
						className={'inline-block cursor-pointer hover:bg-white focus:bg-white dark:hover:bg-dark-400 dark:focus:bg-dark-400 bg-gray-principal dark:bg-dark-400 text-center'}
						backgroundColor={'bg-gray-principal dark:bg-dark-400'}
						onClick={() => clamSGV} >
						{'CLAIM'}
					</Button>
				</div>
			</div>
		</BoxWithTitle>
	);
};

export default FarmingInfoBox;
