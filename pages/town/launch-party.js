import {useEffect, useState, useRef} from 'react';
import useWeb3 from	'contexts/useWeb3';
import useRarity from	'contexts/useRarity';
import Skin from 'components/Launch/Skin';
import LaunchHeader from 'components/Launch/LaunchHeader';
import FarmingSection from 'components/Launch/FarmingSection';
import LaunchInfoArticle from 'components/Launch/LaunchInfoArticle';
import PurchaseCostumeForm from 'components/Launch/PurchaseCostumeForm';
import DialogBox from	'components/DialogBox';
import {getCommonSkinsInfo} from 'utils/actions';

const Launch = ({router}) => {
	const mountedRef = useRef(true);

	const	{address, provider} = useWeb3();
	const	{currentAdventurer} = useRarity();
	const [commonInfo, setCommonInfo] = useState(null);

	const onSetCommonInfo = (info) => {
		if (!mountedRef.current) return null;
		setCommonInfo(info);
	};

	useEffect(() => {
		if (!provider || !address || !currentAdventurer) return;
		getCommonSkinsInfo(provider, address, onSetCommonInfo);
		return () => { mountedRef.current = false; };
	}, [provider, address, currentAdventurer]);

	if (!address || !provider || !mountedRef.current) return null;

	return (
		<section className={'max-w-full'}>
			<div className={'max-w-screen-lg w-full mx-auto'}>
				<LaunchHeader />
				{currentAdventurer 
					? <>
						<FarmingSection currentAdventurer={currentAdventurer} address={address} provider={provider} />
						<PurchaseCostumeForm
							address={address}
							provider={provider}
							currentPrice={Math.round(parseInt((commonInfo?.price / 1e16).toString()))/100} /> </>
					: <DialogBox options={[
						{label: 'recruit an adventurer to attend the launch party', onClick: () => router.push('/town/tavern?tab=recruit')},
						{label: 'Nevermind', onClick: () => router.push('/')}
					]} />
				}
				<LaunchInfoArticle skinBalance={commonInfo?.balance} currentAdventurer={currentAdventurer} />
				{(commonInfo?.balance || Number(commonInfo?.balance) > 0) &&
					<div className={'flex flex-wrap mt-4'}>
						{[...Array(Number(commonInfo?.balance)).keys()].map(skin => <Skin key={skin} index={skin} />)}
					</div>
				}
			</div>
		</section>
	);
};

export default Launch;
