import BoxWithTitle from 'components/BoxWithTitle';
import InfoBlock from 'components/InfoBlock';
import Button	from 'components/Button';

const AdvFarmingInfoBox = ({name, sgvYield, sgvAvailable}) => {
	return (
		<BoxWithTitle title={name} className={'mt-12 md:mt-0 md:w-1/3'}>
			<div className={'text-center flex flex-col justify-between items-center h-full'}>
				<div>
					<InfoBlock className={'mb-4 xs:mb-8'} name={'YIELD PER DAY'} value={sgvYield} />
					<InfoBlock className={'mb-4'} name={'CLAIMABLE'} value={sgvAvailable} />
				</div>
				<Button
					className={'inline-block cursor-pointer hover:bg-white focus:bg-white dark:hover:bg-dark-600 dark:focus:bg-dark-600 bg-gray-principal dark:bg-dark-400 text-center'}
					backgroundColor={'bg-gray-principal dark:bg-dark-400'}
					onClick={() => {}} >
					{'CLAIM'}
				</Button>
			</div>
		</BoxWithTitle>
	);
};

export default AdvFarmingInfoBox;
