/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Thursday September 23rd 2021
**	@Filename:				ModalCurrentAdventurer.js
******************************************************************************/

import	React, {Fragment, useState}		from	'react';
import  toast                           from    'react-hot-toast';    
import	{Dialog, Transition}			from	'@headlessui/react';
import	ListBox							from	'components/ListBox';
import	useRarity						from	'contexts/useRarity';
import	useWeb3							from	'contexts/useWeb3';
import 	{ wrapGold } 				    from	'utils/gold';

function ModalGoldWrapper({isOpen, closeModal}) {
	const	{currentAdventurer} = useRarity();
	const   { provider } = useWeb3();
	const	[goldAmount, set_goldAmount] = useState('');

    const handleWrapGold = (event) => {
        event.preventDefault();

        if (goldAmount === '') {
            toast.error("Amount of wrapped gold needs to be provided!");
        } else if (isNaN(goldAmount) || goldAmount <= 0) {
            toast.error("Gold amount must be a valid number!");
        } else {
            const availableGold = Number(currentAdventurer?.gold?.balance || 0);
            const goldToWrap = Number(goldAmount || 0);
            if (goldToWrap > availableGold) {
                toast.error("Not enough available gold!");
            } else {
                wrapGold(currentAdventurer.tokenID, goldToWrap, provider, ({error, data}) => {
                    if (error) {
                        console.error(error);
                    } else {
                        closeModal();
                    }
                });
            }
        }
    }

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
                                {'WRAPPING GOLD'}
                                <svg onClick={closeModal} className={'absolute md:relative top-0 right-0 cursor-pointer'} width={'24'} height={'24'} viewBox={'0 0 24 24'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
                                    <path d={'M6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4142 12L18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5858L6.70711 5.29289Z'} fill={'currentcolor'}/>
                                </svg>
                            </Dialog.Title>
                            <div className={'mb-4'}>
                                Available Gold: {currentAdventurer?.gold?.balance}
                            </div>
                            <input
                                onChange={e => set_goldAmount(e?.target?.value || '')}
                                className={'border-4 border-black dark:border-dark-100 bg-white dark:bg-dark-600 border-solid h-10 w-full md:w-75 mr-0 md:mr-4 text-xs px-2 focus:outline-none text-black dark:text-white mb-4'}
                                placeholder={'GOLD TO WRAP'} />
                            <button id='wrapGoldBtn' onClick={handleWrapGold}>
                                WRAP GOLD
                            </button>
                        </div>
                    </Transition.Child>
                </div>
			</Dialog>
		</Transition>
	);
}

export default ModalGoldWrapper;