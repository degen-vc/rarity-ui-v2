import	{useState}	from	'react';
import	Image							from	'next/image';
import	Box								from	'components/Box';
import	Typer							from	'components/Typer';
import	DialogBox					from	'components/DialogBox';

const Launch = ({router}) => {
	const	[npcTextIndex, set_npcTextIndex] = useState(0);
	return (
		<section className={'max-w-full'}>
			<div className={'max-w-screen-lg w-full mx-auto'}>
				<div className={'flex flex-col md:flex-row items-center mb-8 md:mb-8'}>
					<div className={'w-auto md:w-64 mr-0 md:mr-8'} style={{minWidth: 256}}>
						<Image
							src={'/avatar/ivanna.png'}
							loading={'eager'}
							quality={100}
							width={256}
							height={256} />
					</div>
					<Box className={'p-4'}>
						<h1 className={'text-xs md:text-xs leading-normal md:leading-8'}>
							<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
								{'THE'}
							</Typer>&nbsp;
							<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
								{'LAUNCH'}
							</Typer></span>
							<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
								{' IS NOT YET OPEN, Bazifra, will soon host the launch party in our tavern. In the meantime feel free to explore the Cellar for crafting materials.'}
							</Typer>
						</h1>
					</Box>
				</div>
				<DialogBox
					options={[
						{label: 'Go back to the tavern', onClick: () => router.push('/world/tavern')},
					]} />
			</div>
		</section>
	);
};




// import {useEffect, useState} from 'react';
// import {ApolloClient, InMemoryCache, useQuery, gql} from '@apollo/client';
// import useWeb3 from	'contexts/useWeb3';
// import DialogBox from	'components/DialogBox';
// import useRarity from	'contexts/useRarity';
// import {bigNumber} from 'utils';
// import {getCommonTicketsInfo} from 'utils/actions';
// import Ticket from 'components/Launch/Ticket';
// import LaunchHeader from 'components/Launch/LaunchHeader';
// import FarmingSection from 'components/Launch/FarmingSection';
// import LaunchInfoArticle from 'components/Launch/LaunchInfoArticle';
// import PurchaseTicketForm from 'components/Launch/PurchaseTicketForm';

// const rarity1client = new ApolloClient({
// 	uri: 'https://api.thegraph.com/subgraphs/name/wslyvh/rarity',
// 	cache: new InMemoryCache()
// });

// const rarity2client = new ApolloClient({
// 	uri: 'https://api.thegraph.com/subgraphs/name/eirlis/rarity-2-test',
// 	cache: new InMemoryCache()
// });

// const formatAdventurersArr = (adventurers) => adventurers.map(adv => `${bigNumber.from(adv?.id)}`);

// const Launch = ({router}) => {
// 	const	{address, provider} = useWeb3();
// 	const	{currentAdventurer} = useRarity();
// 	const [commonInfo, setCommonInfo] = useState(null);
// 	const gqlQuery = gql`{summoners(where: {owner:"${address.toLowerCase()}"}) {id}}`;
// 	const {loading: Rarity1DataLoading, data: Rarity1Data} = useQuery(gqlQuery, {client: rarity1client});
// 	const {loading: Rarity2DataLoading, data: Rarity2Data} = useQuery(gqlQuery, {client: rarity2client});

// 	const formattedAdventurers = formatAdventurersArr(Object.values(Rarity2Data?.summoners || {}));
// 	const formattedSummoners = formatAdventurersArr(Object.values(Rarity1Data?.summoners || {}));

// 	useEffect(() => {
// 		if (!provider && !address) return;
// 		getCommonTicketsInfo(provider, address, setCommonInfo);
// 	}, [provider, address]);

// 	if (Rarity1DataLoading && Rarity2DataLoading) return null;

// 	return (
// 		<section className={'max-w-full'}>
// 			<div className={'max-w-screen-lg w-full mx-auto'}>
// 				<LaunchHeader />
// 				{(formattedAdventurers?.length || formattedSummoners?.length)
// 					? <>
// 						<FarmingSection
// 							currentAdventurer={currentAdventurer}
// 							address={address}
// 							provider={provider}
// 							summoners={formattedSummoners}
// 							adventurers={formattedAdventurers} />
// 						<PurchaseTicketForm
// 							address={address}
// 							provider={provider}
// 							currentPrice={commonInfo?.price} /> </>
// 					: <DialogBox options={[
// 						{label: 'recruit an adventurer to attend the launch party', onClick: () => router.push('/world/tavern?tab=recruit')},
// 						{label: 'Nevermind', onClick: () => router.push('/')}
// 					]} />
// 				}
// 				<LaunchInfoArticle skinBalance={commonInfo?.balance} currentAdventurer={currentAdventurer} />
// 				{(commonInfo?.balance || Number(commonInfo?.balance) > 0) &&
// 					<div className={'flex flex-wrap mt-4'}>
// 						{[...Array(Number(commonInfo?.balance)).keys()].map(ticket => 
// 							<Ticket
// 								key={ticket}
// 								index={ticket}
// 								adventurers={formattedAdventurers}
// 								summoners={formattedSummoners}
// 								isLoading={Rarity1DataLoading && Rarity2DataLoading} />
// 						)}
// 					</div>
// 				}
// 			</div>
// 		</section>
// 	);
// };

export default Launch;
