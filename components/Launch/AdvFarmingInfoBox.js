import BoxWithTitle from 'components/BoxWithTitle';
import InfoRow from 'components/InfoRow';
import Button	from 'components/Button';
import {claimGTokens} from 'utils/actions';

const AdvFarmingInfoBox = ({name, adventurerTokensAvailable, ticketId, hasSummoners, provider}) => (
	<BoxWithTitle title={name} className={'mt-12 m:mt-0 m:w-1/3 m:ml-6'}>
		<div className={'flex flex-col h-full items-center justify-between'}>
			<div className={'w-full'}>
				<InfoRow name={'YIELD PER DAY'} value={'62.05 $RGV'} />
				<InfoRow name={'CLAIMABLE'} value={adventurerTokensAvailable} />
				{hasSummoners && <p className={'mt-6 text-xs text-center opacity-60'}>{'summoners yield 20% per day'}</p>}
			</div>
			<Button
				className={'mt-4 inline-block cursor-pointer hover:bg-white focus:bg-white dark:hover:bg-dark-600 dark:focus:bg-dark-600 bg-gray-principal dark:bg-dark-400 text-center'}
				backgroundColor={'bg-gray-principal dark:bg-dark-400'}
				onClick={() => claimGTokens(provider, ticketId)} >
				{'CLAIM'}
			</Button>
		</div>
	</BoxWithTitle>
);

export default AdvFarmingInfoBox;
