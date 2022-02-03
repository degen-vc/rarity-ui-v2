import	Image							     from	'next/image';
import {ethers} from 'ethers';
import {useContractCall, useContractFunction} from '@usedapp/core';

import SUMMOER_SKINS_ABI from 'utils/abi/summonerSkins.abi';
import MANAGER_SKINS_ABI from 'utils/abi/managerSkins.abi';

const addresses = {
	summonerSkins: '0x2AF8F4B4F82051e3Ae985422AC71f591c428decC',
	manager: '0x781394c4878e217A02CD66248df86dc4dC427738',
	commonSkins: '0x2AF8F4B4F82051e3Ae985422AC71f591c428decC'
};

const classes = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Wizard'];

const skinsI = new ethers.utils.Interface(SUMMOER_SKINS_ABI);
const managerI = new ethers.utils.Interface(MANAGER_SKINS_ABI);


const Assignation = ({skinKey, managerAddress}) => {
	const assignation = useContractCall({abi: managerI, address: managerAddress, method: 'summonerOf', args: [skinKey]});

	if (!assignation) return null;
	return (
		<p>{assignation == 0 ? 'unassigned' : `skin of ${assignation.toString()}`}</p>
	);
};

const Skin = ({skinId, skinAddress, managerAddress}) => {
	const skinBase64 = useContractCall({abi: skinsI, address: skinAddress, method: 'tokenURI', args: [skinId.toString()]});
	const skinClass = useContractCall({abi: skinsI, address: skinAddress, method:'class', args:[skinId.toString()]});
	const managerContract = new ethers.Contract(managerAddress, managerI);
	const skinKey = useContractCall({abi: managerI, address: managerAddress, method: 'skinKey', args: [[skinAddress, skinId.toString()]]});

	const assign = useContractFunction(managerContract,'assignSkinToSummoner');
		
	// const [summonerId, setSummonerId] = useState(0);

	let skinJson;
	let imgUri;
	if(skinBase64 !== undefined) {
		skinJson = decodeURI(skinBase64);
		skinJson = skinJson.split('data:application/json;base64,').pop();
		skinJson = JSON.parse(atob(skinJson));
		imgUri = skinJson.image;
	}

	if (!skinBase64) return null;

	return (
		<section className={'w-1/3'}>
			<Image src={imgUri} quality={100} width={'100%'} height={'100%'} />
			<div>{skinJson.name}</div>
			{skinClass && skinKey && (
				<div>
					<p>{classes[skinClass - 1]}</p>
					<Assignation skinKey={skinKey[0]} managerAddres={managerAddress} />
				</div>
			)}
		</section>
	);
};


const SkinWrapper = ({address, index, managerAddress, type}) => {
	const skinAddress = type === 'common' ? addresses.commonSkins : addresses.summonerSkins;
	const skinId = useContractCall({abi : skinsI, address: skinAddress, method: 'tokenOfOwnerByIndex', args: [address, index.toString()]});

	return skinId ? <Skin skinId={skinId} skinAddress={skinAddress} managerAddress={managerAddress} type={type} /> : null;
};

export default SkinWrapper;
