import {useEffect, useState} from 'react';
import Image	from	'next/image';
import useWeb3 from	'contexts/useWeb3';
import Button	from 'components/Button';
import ListBox from	'components/ListBox';
import BoxWithTitle from 'components/BoxWithTitle';
import {getTicketInfo, assignTicket} from 'utils/actions';
import {transformArrToOptions} from 'utils/rarity-functions';
import LAUNCH_TICKET_ABI from 'utils/abi/launchTicket.abi';

const typeOptions = [
	{name: 'Adventurer', value: process.env.RARITY_ADDR},
	{name: 'Summoner', value: process.env.LAUNCH_SUMMONERS_ADDR}
];

const Ticket = ({index, adventurers, summoners, isLoading}) => {
	const	{address, provider} = useWeb3();

	const [ticketInfo, setTicketInfo] = useState({});
	const [selectedType, setSelectedType] = useState([]);
	const [selectedId, setSelectedId] = useState();

	const adventurersAvailable = [{name: 'Adventurer ID', value: ''}, ...transformArrToOptions(adventurers)];
	const summonersAvailable = [{name: 'Summoner ID', value: ''}, ...transformArrToOptions(summoners)];

	const onAssignTicket = () => {
		if (!selectedType?.value) return;
		const address = selectedType?.value === process.env.RARITY_ADDR ? process.env.RARITY_ADDR : process.env.LAUNCH_SUMMONERS_ADDR;
		assignTicket(provider, ticketInfo?.ticketId, selectedId?.value, address);
	};

	useEffect(() => {
		if (!provider &&  !address && isLoading) return;
		getTicketInfo(provider, address, process.env.LAUNCH_TICKET_ADDR, LAUNCH_TICKET_ABI, index.toString(), setTicketInfo);
		setSelectedType(adventurers?.length ? typeOptions[0] : typeOptions[1]);
	}, [provider, address, index, adventurers?.length, isLoading]);

	useEffect(() => {
		setSelectedId(selectedType?.name === 'Adventurer' ? adventurersAvailable[0] : summonersAvailable[0]);
	}, [selectedType]);

	if (!ticketInfo?.ticketId) return null;
	
	return (
		<section className={'mt-8 flex justify-center w-full md:w-1/2 lg:w-1/3'}>
			<div style={{width: 320, minWidth: 320, minHeight: 150}}>
				<BoxWithTitle
					title={ticketInfo?.skinJson?.name || ''}
					className={'h-full flex flex-col items-center px-2 py-6 relative'}
				>
					{ticketInfo?.ticketImg &&
						<Image src={ticketInfo?.ticketImg} quality={100} width={'100%'} height={'100%'} />
					}
					{ticketInfo?.assignation?.id === '0'
						? (<>
							<div className={'flex items-end mt-2 mb-4'}>
								{adventurers?.length && summoners?.length ?
									<div style={{minWidth: 130, width: 130}}>
										<p className={'text-megaxs ml-2 opacity-60'}>{'You are:'}</p>
										<ListBox
											options={typeOptions}
											className={'w-full mr-2'}
											set_selected={setSelectedType}
											selected={selectedType} /> </div> : null}
								<div style={{maxWidth: 180, width: 180}}>
									<p className={'text-megaxs ml-2 opacity-60'}>{`select ${selectedType?.name}`}</p>
									<ListBox
										options={selectedType?.name === 'Adventurer' ? adventurersAvailable : summonersAvailable}
										className={'w-full'}
										set_selected={setSelectedId}
										selected={selectedId} />
								</div>
							</div>
							<Button
								className={'inline-block cursor-pointer hover:bg-white focus:bg-white dark:hover:bg-dark-600 dark:focus:bg-dark-600 bg-gray-principal dark:bg-dark-400 text-center'}
								backgroundColor={'bg-gray-principal dark:bg-dark-400'}
								onClick={onAssignTicket} >
								{'ASSIGN TICKET'}
							</Button>
						</>) : (
							<div className={'mt-6'}>
								<p className={'text-xs text-center text-tag-new mb-2'}>{'assigned to:'}</p>
								<p className={'text-center opacity-80'}>{`${ticketInfo?.assignation?.type} ID ${ticketInfo?.assignation?.id}`}</p>
							</div>
						)
					}
				</BoxWithTitle>
			</div>
		</section>
	);
};

export default Ticket;
