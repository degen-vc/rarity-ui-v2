import {useEffect, useState} from 'react';
import FarmingInfoBox from 'components/Launch/FarmingInfoBox';
import AdvFarmingInfoBox from 'components/Launch/AdvFarmingInfoBox';
import {getGTokenBalance, getManagerTicketsInfo} from 'utils/actions';
import {GTOKEN} from 'utils/constants';
import useRarity from '../../contexts/useRarity';

const amountToTokens = (amount, currency = GTOKEN) => {
	if (!amount) return '-';
	return `${Math.round(parseInt((amount / 1e16).toString()))/100} ${currency}`;
};

const FarmingSection = ({provider, address, currentAdventurer, summoners, adventurers}) => {
	const {governanceToken} = useRarity();
	const [gTokenlBalance, setGTokenlBalance] = useState();
	const [managerTicketInfo, setManagerTicketInfo] = useState(null);

	useEffect(() => {
		if (!provider && !address) return;
		getGTokenBalance(provider, process.env.LAUNCH_MANAGER_ADDR, setGTokenlBalance);
	}, [provider, address, currentAdventurer]);

	useEffect(() => {
		if (!provider && !address && !currentAdventurer) return;
		getManagerTicketsInfo(provider, address, Number(currentAdventurer?.tokenID), setManagerTicketInfo);
	}, [provider, address, currentAdventurer]);

	return (
		<section className={'m:flex mt-12'}>
			<FarmingInfoBox
				provider={provider}
				gTokenlBalance={gTokenlBalance ? `${Number(gTokenlBalance).toFixed(2)} ${GTOKEN}` : '-'}
				advGTokenBalance={governanceToken?.balance ? `${Number(governanceToken?.balance).toFixed(2)} ${GTOKEN}` : '-'}
				myAdventurersYieldPerDay={amountToTokens(managerTicketInfo?.myAdventurersYieldPerDay[0])}
				mySummonersYieldPerDay={amountToTokens(managerTicketInfo?.mySummonersYieldPerDay[0])}
				availableForClaimAll={amountToTokens(managerTicketInfo?.availableForClaimAll)}
				hasSummoners={summoners?.length} />
			<AdvFarmingInfoBox
				provider={provider}
				name={currentAdventurer?.name || `adventurer ${currentAdventurer?.tokenID || ''}`}
				ticketId={`${managerTicketInfo?.adventurerTicketId}` || `${managerTicketInfo?.summonerTicketId}` || '0'}
				adventurerTokensAvailable={amountToTokens(managerTicketInfo?.adventurerTokensAvailable)}
				hasSummoners={summoners?.length}
				hasAdventurers={adventurers?.length} />
		</section>
	);
};

export default FarmingSection;