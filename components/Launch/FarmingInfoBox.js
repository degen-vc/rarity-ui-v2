import BoxWithTitle from 'components/BoxWithTitle';
import InfoRow from 'components/InfoRow';
import Button	from 'components/Button';
import {claimAllGTokens} from 'utils/actions';

const FarmingInfoBox = ({gTokenlBalance, advGTokenBalance, myAdventurersYieldPerDay, mySummonersYieldPerDay, availableForClaimAll, hasSummoners, provider}) => (
	<BoxWithTitle title={'MY FARMING DATA'} className={'m:w-2/3 m:mr-6 text-center'}>
		<InfoRow name={'TOTAL TOKENS AVAILABLE'} value={gTokenlBalance} />
		<InfoRow name={'YOUR BALANCE'} value={advGTokenBalance} />
		<InfoRow name={'ADVENTURERS YIELD PER DAY'} value={myAdventurersYieldPerDay}  />
		{hasSummoners ? <InfoRow name={'SUMMONERS YIELD PER DAY'} value={mySummonersYieldPerDay}  /> : null}
		<InfoRow name={'CLAIMABLE'} value={availableForClaimAll} />
		<Button
			className={'mt-4 inline-block cursor-pointer hover:bg-white focus:bg-white dark:hover:bg-dark-400 dark:focus:bg-dark-400 bg-gray-principal dark:bg-dark-400 text-center'}
			backgroundColor={'bg-gray-principal dark:bg-dark-400'}
			onClick={() => claimAllGTokens(provider)} >
			{'CLAIM ALL'}
		</Button>
	</BoxWithTitle>
);

export default FarmingInfoBox;
