import	{Fragment, useState}		from	'react';
import  toast                           from    'react-hot-toast';    
import	{Dialog, Transition}			from	'@headlessui/react';
import	useWeb3							from	'contexts/useWeb3';
import	Button						     from	'components/Button';
import {validateDigits} from 'utils/scarcity-functions';
import 	{wrapGold, unwrapGold} 				    from	'utils/gold';

function ModalGoldWrapper({isOpen, closeModal, gold, adventurerGold, goldName, tokenId, allowance}) {
	const {provider} = useWeb3();
	const	[goldAmount, set_goldAmount] = useState('');
	const amount = goldName === '$WG' ? gold : adventurerGold;

	const validateAmount = () => {
		if (!goldAmount) return 'Gold amount must be a valid number!';
		if (Number(goldAmount) > amount) return 'Not enough available gold!';
		return;
	};

	const onChange = (value) => {
		if (value && !validateDigits(value)) return;
		set_goldAmount(value);
	};

	const handleWrapGold = (event) => {
		event.preventDefault();
		const error = validateAmount();
		if (error) return toast.error(error);
		const amountToConvert = Number(goldAmount);
		if (goldName === '$WG') {
			unwrapGold(tokenId, amountToConvert, provider, closeModal);
		} else {
			if (!allowance || allowance <= 0) return toast.error('You should approve gold first!');
			wrapGold(tokenId, amountToConvert, provider, ({error}) => {
				if (error) {
					console.error(error);
				} else {
					closeModal();
				}
			});
		}
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as={'div'}
				className={'fixed inset-0 z-10 overflow-none'}
				style={{zIndex: 1000}}
				onClose={closeModal}>
				<div className={'min-h-screen px-4 text-center'}>

					<Transition.Child
						as={Fragment}
						enter={'ease-out duration-300'}
						enterFrom={'opacity-0'}
						enterTo={'opacity-100'}
						leave={'ease-in duration-200'}
						leaveFrom={'opacity-100'}
						leaveTo={'opacity-0'}>
						<Dialog.Overlay className={'fixed inset-0 bg-black bg-opacity-80'} />
					</Transition.Child>

					<Transition.Child
						as={Fragment}
						enter={'ease-out duration-300'}
						enterFrom={'opacity-0 scale-95'}
						enterTo={'opacity-100 scale-100'}
						leave={'ease-in duration-200'}
						leaveFrom={'opacity-100 scale-100'}
						leaveTo={'opacity-0 scale-95'}>
						<div className={'inline-block px-4 md:px-10 pt-9 pb-0 md:pb-9 mt-16 md:mt-23 text-left transition-all transform bg-white dark:bg-dark-600 shadow-xl max-w-screen-lg w-full uppercase font-title relative border-4 border-black'}>
							<Dialog.Title as={'h3'} className={'relative mb-10 text-lg font-medium leading-6 text-black dark:text-white flex flex-col md:flex-row justify-between'}>
								{goldName === '$WG' ? 'UNWRAPPING GOLD' : 'WRAPPING GOLD'}
								<svg onClick={closeModal} className={'absolute md:relative top-0 right-0 cursor-pointer'} width={'24'} height={'24'} viewBox={'0 0 24 24'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
									<path d={'M6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4142 12L18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5858L6.70711 5.29289Z'} fill={'currentcolor'}/>
								</svg>
							</Dialog.Title>
							<div className={'mb-4'}>
								{`Available Gold: ${amount} ${goldName}`}
							</div>
							<input
								onChange={e => onChange(e?.target?.value || '')}
								className={'border-4 border-black dark:border-dark-100 bg-white dark:bg-dark-600 border-solid h-10 w-full md:w-75 mr-0 md:mr-4 text-xs px-2 focus:outline-none text-black dark:text-white mb-4'}
								placeholder={goldName === '$WG' ? 'GOLD TO UNWRAP' : 'GOLD TO WRAP'} />
							<Button
								className={'inline-block cursor-pointer hover:bg-gray-secondary focus:bg-gray-secondary dark:hover:bg-dark-600 dark:focus:bg-dark-600 bg-white dark:bg-dark-900 text-center'}
								backgroundColor={'bg-white dark:bg-black bg-opacity-40 dark:bg-opacity-0'}
								onClick={handleWrapGold}>
								{goldName === '$WG' ? 'UNWRAP GOLD' : 'WRAP GOLD'}
							</Button>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
}

export default ModalGoldWrapper;