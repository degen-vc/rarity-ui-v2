import {useEffect, useState} from 'react';
import {ApolloClient, InMemoryCache, useQuery, gql} from '@apollo/client';
import useWeb3 from	'contexts/useWeb3';
import DialogBox from	'components/DialogBox';
import useRarity from	'contexts/useRarity';
import {bigNumber} from 'utils';
import {getCommonTicketsInfo} from 'utils/actions';
import Ticket from 'components/Launch/Ticket';
import LaunchHeader from 'components/Launch/LaunchHeader';
import FarmingSection from 'components/Launch/FarmingSection';
import LaunchInfoArticle from 'components/Launch/LaunchInfoArticle';
import PurchaseCostumeForm from 'components/Launch/PurchaseCostumeForm';

const rarity1client = new ApolloClient({
	uri: 'https://api.thegraph.com/subgraphs/name/wslyvh/rarity',
	cache: new InMemoryCache()
});

const rarity2client = new ApolloClient({
	uri: 'https://api.thegraph.com/subgraphs/name/eirlis/rarity-2-test',
	cache: new InMemoryCache()
});

const formatAdventurersArr = (adventurers) => adventurers.map(adv => `${bigNumber.from(adv?.id)}`);

const Launch = ({router}) => {
	const	{address, provider} = useWeb3();
	const	{currentAdventurer} = useRarity();
	const [commonInfo, setCommonInfo] = useState(null);
	const gqlQuery = gql`{summoners(where: {owner:"${address.toLowerCase()}"}) {id}}`;
	const {loading: Rarity1DataLoading, data: Rarity1Data} = useQuery(gqlQuery, {client: rarity1client});
	const {loading: Rarity2DataLoading, data: Rarity2Data} = useQuery(gqlQuery, {client: rarity2client});

	useEffect(() => {
		if (!provider && !address) return;
		getCommonTicketsInfo(provider, address, setCommonInfo);
	}, [provider, address]);

	const formattedAdventurers = formatAdventurersArr(Object.values(Rarity2Data?.summoners || {}));
	const formattedSummoners = formatAdventurersArr(Object.values(Rarity1Data?.summoners || {}));

	if (Rarity1DataLoading && Rarity2DataLoading) return null;

	return (
		<section className={'max-w-full'}>
			<div className={'max-w-screen-lg w-full mx-auto'}>
				<LaunchHeader />
				{(formattedAdventurers?.length || formattedSummoners?.length)
					? <>
						<FarmingSection
							currentAdventurer={currentAdventurer}
							address={address}
							provider={provider}
							summoners={formattedSummoners}
							adventurers={formattedAdventurers} />
						<PurchaseCostumeForm
							address={address}
							provider={provider}
							currentPrice={commonInfo?.price} /> </>
					: <DialogBox options={[
						{label: 'recruit an adventurer to attend the launch party', onClick: () => router.push('/world/tavern?tab=recruit')},
						{label: 'Nevermind', onClick: () => router.push('/')}
					]} />
				}
				<LaunchInfoArticle skinBalance={commonInfo?.balance} currentAdventurer={currentAdventurer} />
				{(commonInfo?.balance || Number(commonInfo?.balance) > 0) &&
					<div className={'flex flex-wrap mt-4'}>
						{[...Array(Number(commonInfo?.balance)).keys()].map(ticket => 
							<Ticket
								key={ticket}
								index={ticket}
								adventurers={formattedAdventurers}
								summoners={formattedSummoners}
								isLoading={Rarity1DataLoading && Rarity2DataLoading} />
						)}
					</div>
				}
			</div>
		</section>
	);
};

export default Launch;
