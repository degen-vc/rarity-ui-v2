import {useEffect, useState} from 'react';
import FarmingInfoBox from 'components/Launch/FarmingInfoBox';
import AdvFarmingInfoBox from 'components/Launch/AdvFarmingInfoBox';
import {getSGVBalance, getUserManagerSkinInfo} from 'utils/actions';
import {GTOKEN} from 'utils/constants';

const amountToSgvString = (amount, currency = GTOKEN) => {
	if (!amount) return '-';
	return `${Math.round(parseInt((amount / 1e16).toString()))/100} ${currency}`;
};

const FarmingSection = ({provider, address, currentAdventurer}) => {
	const [sgvTotalBalance, setSgvTotalBalance] = useState();
	const [sgvBalance, setSgvBalance] = useState();
	const [managerSkinInfo, setManagerSkinInfo] = useState(null);

	useEffect(() => {
		if (!provider || !address || !currentAdventurer) return;
		getSGVBalance(provider, process.env.MANAGER_SKIN_ADDR, setSgvTotalBalance);
		getSGVBalance(provider, address, setSgvBalance);
	}, [provider, address, currentAdventurer]);

	useEffect(() => {
		if (!provider || !address || !currentAdventurer) return;
		getUserManagerSkinInfo(provider, address, Number(currentAdventurer?.tokenID), setManagerSkinInfo);
		const interval = setInterval(() =>
			getUserManagerSkinInfo(provider, address, Number(currentAdventurer?.tokenID), setManagerSkinInfo)
		, 10000);
		return () => {
			clearInterval(interval);
		};
	}, [provider, address, currentAdventurer]);

	return (
		<section className={'m:flex mt-12'}>
			<FarmingInfoBox
				provider={provider}
				sgvTotal={sgvTotalBalance ? `${Number(sgvTotalBalance).toFixed(2)} ${GTOKEN}` : '-'}
				sgvBalance={sgvBalance ? `${Number(sgvBalance).toFixed(2)} ${GTOKEN}` : '-'}
				sgvYield={amountToSgvString(managerSkinInfo?.sgvYield?.[0])}
				sgvRogueYield={amountToSgvString(managerSkinInfo?.sgvRogueYield?.[0])}
				sgvAvailable={amountToSgvString(managerSkinInfo?.sgvAvailable)} />
			<AdvFarmingInfoBox
				provider={provider}
				name={currentAdventurer?.name || `adventurer ${currentAdventurer?.tokenID || ''}`}
				tokenId={`${managerSkinInfo?.currentSkin?.tokenId}` || '0'}
				sgvYield={amountToSgvString(managerSkinInfo?.sgvRogueYield?.[0])}
				sgvAvailable={amountToSgvString(managerSkinInfo?.currentSgvAvailable)} />
		</section>
	);
};

export default FarmingSection;