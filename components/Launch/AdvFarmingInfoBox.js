import BoxWithTitle from 'components/BoxWithTitle';
import InfoRow from 'components/InfoRow';
import Button	from 'components/Button';
import {claimSgv} from 'utils/actions';

const AdvFarmingInfoBox = ({name, sgvYield, sgvAvailable, tokenId, provider}) => (
	<BoxWithTitle title={name} className={'mt-12 m:mt-0 m:w-1/3'}>
		<div className={'flex flex-col h-full items-center justify-between'}>
			<div className={'w-full'}>
				<InfoRow name={'YIELD PER DAY'} value={sgvYield} />
				<InfoRow name={'CLAIMABLE'} value={sgvAvailable} />
			</div>
			<Button
				className={'mt-4 inline-block cursor-pointer hover:bg-white focus:bg-white dark:hover:bg-dark-600 dark:focus:bg-dark-600 bg-gray-principal dark:bg-dark-400 text-center'}
				backgroundColor={'bg-gray-principal dark:bg-dark-400'}
				onClick={() => claimSgv(provider, tokenId)} >
				{'CLAIM'}
			</Button>
		</div>
	</BoxWithTitle>
);

export default AdvFarmingInfoBox;
