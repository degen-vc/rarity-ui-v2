import {useEffect, useState} from 'react';
import Image	from	'next/image';
import Link	from	'next/link';
import useRarity from	'contexts/useRarity';
import useWeb3 from	'contexts/useWeb3';
import Button	from 'components/Button';
import Input from 'components/Input';
import BoxWithTitle from 'components/BoxWithTitle';
import {validateDigits} from 'utils/scarcity-functions';
import {getSkinInfo, dressSummoner} from 'utils/actions';
import SUMMOER_SKINS_ABI from 'utils/abi/summonerSkins.abi';
import {CLASSES} from 'utils/constants';

const checkAvailableSummoners = (rarities, skinId) => 
	Object.values(rarities).reduce((all, summ) => {
		if (`${summ?.class}` === skinId) all.push(summ?.tokenID);
		return all;
	}, []);

const Skin = ({index}) => {
	const	{address, provider} = useWeb3();
	const {rarities} = useRarity();

	const [skinInfo, setSkinInfo] = useState({});
	const [assignedSkin, setAssignedSkin] = useState('');
	const [availableSummoners, setAvailableSummoners] = useState([]);
	
	const validate = (skin) => {
		if (!skin) return;
		if (skin === skinInfo?.assignation?.toString()) return 'You\'ve already assign this costume to selected adventurer';
		if (!availableSummoners.includes(skin)) return 'You can assign this costume only to your adventurer with appropriate class';
		return;
	};

	const onDressAdventurer = () => {
		if (!assignedSkin || assignedSkin === skinInfo?.assignation?.toString()) return;
		dressSummoner(provider, skinInfo?.skinJson?.name, skinInfo?.skinId, assignedSkin);
	};

	useEffect(() => {
		if (!provider ||  !address) return;
		getSkinInfo(provider, address, process.env.COMMON_SKIN_ADDR, SUMMOER_SKINS_ABI, index.toString(), setSkinInfo);
	}, [provider, address, index]);

	useEffect(() => {
		if (!skinInfo?.skinClass) return;
		const availableSumList = checkAvailableSummoners(rarities, skinInfo?.skinClass);
		if (availableSumList.length) return setAvailableSummoners(availableSumList);
	}, [skinInfo?.skinClass, rarities]);

	if (!skinInfo || !rarities) return null;

	return (
		<section className={'mt-8 flex justify-center w-full md:w-1/2 lg:w-1/3'}>
			<div style={{width: 320, minWidth: 320, minHeight: 400}}>
				<BoxWithTitle
					title={skinInfo?.skinJson?.name || ''}
					className={'h-full flex flex-col items-center px-2 py-6 relative'}
				>
					{skinInfo?.skinImgUri &&
						<Image src={skinInfo?.skinImgUri} quality={100} width={'100%'} height={'100%'} />
					}
					<p className={'my-4'}>{CLASSES[skinInfo?.skinClass - 1]}</p>
					<p className={'text-xs mb-4'}>
						<span className={'text-blackLight'}>{'status: '}</span>
						{skinInfo?.assignation == 0
							? <span className={'text-tag-warning'}>{'unassigned'}</span> 
							: <span className={'text-tag-info'}>{`assigned to ${skinInfo?.assignation?.toString()}`}</span>
						}
					</p>
					{availableSummoners.length ? <>
						<p className={'text-megaxs mb-2'}>{'Adventurer IDs available: '}</p>
						<p>{availableSummoners?.join(', ')}</p>
						<Input
							className={'w-full my-4'}
							validateOnChange={validateDigits}
							validateOnBlur={validate}
							setValue={setAssignedSkin}
							defaultValue={assignedSkin}
							placeholder={'Adventurer ID'} />
						<Button
							className={'inline-block cursor-pointer hover:bg-white focus:bg-white dark:hover:bg-dark-600 dark:focus:bg-dark-600 bg-gray-principal dark:bg-dark-400 text-center'}
							backgroundColor={'bg-gray-principal dark:bg-dark-400'}
							onClick={onDressAdventurer} >
							{'DRESS'}
						</Button>
					</> : <>
						<p className={'text-megaxs text-center text-tag-withdraw'}>{'Seems like you don\'t have appropriate adventurer to dress this costume'}</p>
						<Link href={'/town/tavern?tab=recruit'}>
							<span className={'text-sm mt-8 cursor-pointer opacity-60 hover:opacity-100'}>{'recruit adventurer >'}</span>
						</Link>
					</>}
				</BoxWithTitle>
			</div>
		</section>
	);
};

export default Skin;
