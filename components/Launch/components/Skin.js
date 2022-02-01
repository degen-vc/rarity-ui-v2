/* eslint-disable react/react-in-jsx-scope */
import {useContractCall, useContractFunction} from '@usedapp/core';
// import {useContractCall} from '@usedapp/core';

import {ethers} from 'ethers';
import * as addresses from '../addresses.json';
import * as summonerSkinsJson from '../artifacts/contracts/SummonerSkins.sol/SummonerSkins.json';
import * as managerJson from '../artifacts/contracts/RaritySkinManager.sol/RaritySkinManager.json';
import Loading from './Loading';
import {Card, Button, Stack, Form} from 'react-bootstrap';
import {useState} from 'react';
import	Box					from	'components/Box';


export default function Skin({account, index, managerAddress, type}){
	const skinAddress = type === 'common' ? addresses.commonSkins : addresses.summonerSkins;
	console.log('skinAddress - ', skinAddress);
	const skinsABI = JSON.stringify(summonerSkinsJson.abi);
	const skinsInterface = new ethers.utils.Interface(skinsABI);
	const skinId = useContractCall({abi : skinsInterface, address: skinAddress, method: 'tokenOfOwnerByIndex', args: [account,index.toString()]});

	return(
		<>
			{!skinId && <Loading/>}
			{skinId && <_Skin id={skinId} managerAddress={managerAddress} type={type}/>}
		</>
	);
}

function _Skin({id,managerAddress, type}){
	const skinAddress = type === 'common' ? addresses.commonSkins : addresses.summonerSkins;
	const managerABI = JSON.stringify(managerJson.abi);
	const managerInterface = new ethers.utils.Interface(managerABI);
	const skinsABI = JSON.stringify(summonerSkinsJson.abi);
	const skinsInterface = new ethers.utils.Interface(skinsABI);
	const skinBase64 = useContractCall({abi: skinsInterface, address: skinAddress, method: 'tokenURI', args: [id.toString()]});
	const skinClass = useContractCall({abi: skinsInterface, address: skinAddress, method:'class', args:[id.toString()]});
	const managerContract = new ethers.Contract(managerAddress, managerInterface);
	const skinKey = useContractCall({abi: managerInterface, address: managerAddress, method: 'skinKey', args: [[skinAddress, id.toString()]]});
	const assign = useContractFunction(managerContract,'assignSkinToSummoner');
	const [summonerId, setSummonerId] = useState(0);
	const classes = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Wizard'];

	let skinJson;
	let imgUri;
	if(skinBase64 !== undefined){
		skinJson = decodeURI(skinBase64);
		skinJson = skinJson.split('data:application/json;base64,').pop();
		skinJson = JSON.parse(atob(skinJson));
		imgUri = skinJson.image;
	}

	return(
		<>
			{!skinBase64 && <div>{'Loading...&nbsp;'}</div>}
			{skinBase64 && <>
				<Card className={'bg-white dark:bg-dark-600 flex flex-col items-center'}>
					<Card.Img src={imgUri} className={'w-50 m-7'}/>
					<Card.Body className={'bg-white dark:bg-dark-600 flex flex-col items-center'}>
						<Card.Title>{skinJson.name}</Card.Title>
						{skinClass && skinKey && <Card.Text>
							{classes[skinClass - 1]}<br/>
							{<Assignation skinKey={skinKey} managerAddress={managerAddress} />}
						</Card.Text>}
						{!skinClass && <Loading/>}
						{/* <Stack direction={'vertical'}> */}<br/>
						<Form.Control style={{backgroundColor: 'transparent'}} size={'sm'} type={'number'} placeholder={'Advanturer id'} value=
							{summonerId === 0 ? undefined : summonerId} 
						onChange={e => setSummonerId(e.target.value)}/>&nbsp;
						<Button className={'bg-green dark:bg-lgreen  text-white dark:text-black'} style={{width: '90px', paddingRight: '5px', paddingLeft: '5px'}} size={'sm'} onClick={()=> {assign.send(skinAddress, id.toString(), summonerId,);}}><a>{'Dress'}</a></Button>
						{/* </Stack> */}
					</Card.Body>
				</Card>
				<br/>
			</>}
		</>
	);
}

function Assignation({skinKey, managerAddress}){
	const managerABI = JSON.stringify(managerJson.abi);
	const managerInterface = new ethers.utils.Interface(managerABI);
	const assignation = useContractCall({abi: managerInterface, address: managerAddress, method: 'summonerOf', args: [skinKey[0]]});

	if (!assignation) return <Loading/>;
	if (assignation == 0) return <>{'unassigned'}</>;
	else return <>{'skin of '}{assignation.toString()}</>;
}