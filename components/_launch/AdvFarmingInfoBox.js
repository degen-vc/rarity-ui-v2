import BoxWithTitle from 'components/BoxWithTitle';
import InfoRow from 'components/InfoRow';
import Button	from 'components/Button';

const AdvFarmingInfoBox = ({name, sgvYield, sgvAvailable}) => {
	return (
		<BoxWithTitle title={name} className={'mt-12 m:mt-0 m:w-1/3'}>
			<div className={'flex flex-col h-full items-center justify-between'}>
				<div className={'w-full'}>
					<InfoRow name={'YIELD PER DAY ($SGV)'} value={sgvYield} />
					<InfoRow name={'CLAIMABLE ($SGV)'} value={sgvAvailable} />
				</div>
				<Button
					className={'mt-4 inline-block cursor-pointer hover:bg-white focus:bg-white dark:hover:bg-dark-600 dark:focus:bg-dark-600 bg-gray-principal dark:bg-dark-400 text-center'}
					backgroundColor={'bg-gray-principal dark:bg-dark-400'}
					onClick={() => {}} >
					{'CLAIM'}
				</Button>
			</div>
		</BoxWithTitle>
	);
};

export default AdvFarmingInfoBox;
