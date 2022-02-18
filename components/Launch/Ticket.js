import {useEffect, useState} from 'react';
import Image	from	'next/image';
import useWeb3 from	'contexts/useWeb3';
import Button	from 'components/Button';
import ListBox from	'components/ListBox';
import BoxWithTitle from 'components/BoxWithTitle';
import {getTicketInfo, assignTicket} from 'utils/actions';
import LAUNCH_TICKET_ABI from 'utils/abi/launchTicket.abi';

let idOptions = [{name: '', value: ''}];

const typeOptions = [
	{name: 'Adventurer', value: process.env.LAUNCH_ADVENTURERS_ADDR},
	{name: 'Summoner', value: process.env.LAUNCH_SUMMONERS_ADDR}
];

const transformArrToOptions = (array) => array.map(el => ({name: `id ${el}`, value: el}));

const Ticket = ({index, adventurers, summoners, isLoading}) => {
	const	{address, provider} = useWeb3();

	const [ticketInfo, setTicketInfo] = useState({});
	const [selectedType, setSelectedType] = useState(typeOptions[0]);
	const [selectedId, setSelectedId] = useState();

	const adventurersAvailable = transformArrToOptions(adventurers);
	const summonersAvailable = transformArrToOptions(summoners);

	const onAssignTicket = () => {
		const address = selectedType?.value !== '' ? selectedType?.value : adventurers?.length
			? process.env.LAUNCH_ADVENTURERS_ADDR : process.env.LAUNCH_SUMMONERS_ADDR;
		assignTicket(provider, ticketInfo?.ticketId, selectedId?.value, address);
	};

	useEffect(() => {
		if (!provider &&  !address && isLoading) return;
		getTicketInfo(provider, address, process.env.LAUNCH_TICKET_ADDR, LAUNCH_TICKET_ABI, index.toString(), setTicketInfo);
	}, [provider, address, index, isLoading]);

	useEffect(() => {
		if (adventurers?.length && summoners?.length) {
			idOptions = selectedType?.name === 'Adventurer' ? adventurersAvailable : summonersAvailable;
			setSelectedId(selectedType?.name === 'Adventurer' ? adventurersAvailable[0]: summonersAvailable[0]);
		} else {
			idOptions = adventurers?.length ? adventurersAvailable : summonersAvailable;
			setSelectedId(idOptions[0]);
		}
	}, [selectedType, adventurers?.length, summoners?.length]);

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
										options={idOptions}
										className={'w-full'}
										set_selected={setSelectedId}
										selected={selectedId || idOptions[0]} />
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
