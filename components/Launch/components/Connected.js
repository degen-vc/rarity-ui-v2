import {Form, Stack, Row, Button} from 'react-bootstrap';
import {useContractCall, useEthers, useContractFunction} from '@usedapp/core';
import {ethers} from 'ethers';
import * as addresses from '../addresses.json';
import * as summonerSkinsJson from '../artifacts/contracts/SummonerSkins.sol/SummonerSkins.json';
// import * as raritySkinManagerFix from '../artifacts/contracts/SummonerSkins.sol/SummonerSkins.json';
import * as commonSkinsJson from '../artifacts/contracts/alts/CommonSummonerSkins.sol/CommonSummonerSkins.json';
import Skin from './Skin';
import {useState} from 'react';
import Loading from './Loading';
import {useQuery, gql} from '@apollo/client';
import Summoner from './Summoner';
import SkinInfos from './SkinInfos';
import Assigner from './Assigner';
import SxgvTokenAbi from 'utils/abi/sxgvToken.abi.js';

export function Connected({account}){
	const sxgvTokenInterface = new ethers.utils.Interface(JSON.stringify(SxgvTokenAbi));
	const SkinManagerFixInterface = new ethers.utils.Interface('[{"inputs":[{"internalType":"address","name":"_rarity","type":"address"},{"internalType":"address","name":"_token","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"claimer","type":"address"},{"indexed":false,"internalType":"uint256","name":"skinId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"claimedAmount","type":"uint256"},{"indexed":false,"internalType":"bool","name":"isRogue","type":"bool"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"claimer","type":"address"},{"indexed":false,"internalType":"uint256","name":"claimedAmount","type":"uint256"}],"name":"ClaimAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"components":[{"internalType":"address","name":"implementation","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"indexed":false,"internalType":"struct RaritySkinManager.Skin","name":"skin","type":"tuple"},{"indexed":false,"internalType":"uint256","name":"summoner","type":"uint256"}],"name":"SumonnerSkinAssigned","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"adventurersTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"implementation","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"summonerId","type":"uint256"}],"name":"assignSkinToSummoner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"availableForClaim","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"availableForClaimAll","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"exManager","outputs":[{"internalType":"contract RaritySkinManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isStrictOnSummonerClass","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"myAdventurersYieldPerDay","outputs":[{"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"internalType":"uint256","name":"numOfAdventurers","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"myRoguesYieldPerDay","outputs":[{"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"internalType":"uint256","name":"numOfRogues","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rogueReserve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"roguesLevels","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"roguesTotalLevels","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"roguesValues","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"implementation","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"internalType":"struct RaritySkinManager.Skin","name":"skin","type":"tuple"}],"name":"skinKey","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"summonerId","type":"uint256"}],"name":"skinOf","outputs":[{"components":[{"internalType":"address","name":"implementation","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"internalType":"struct RaritySkinManager.Skin","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_skins","type":"address"}],"name":"skinsImplementation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_skinKey","type":"bytes32"}],"name":"summonerOf","outputs":[{"internalType":"uint256","name":"summonerId","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenPerLevel","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_impAddress","type":"address"}],"name":"trustImplementation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"summonerId","type":"uint256"}],"name":"trustedAssignSkinToSummoner","outputs":[],"stateMutability":"nonpayable","type":"function"}]');

	const sxgvTokenAdress = '0xB0519b72fE39b8AcA96ba1c64e07FAd1cc3B8D99';
	const rarityMFix = '0xfB48543dFFC6566638709a3D0a8e66eBed73732A';
	const totalTokensAvailable = useContractCall({abi: sxgvTokenInterface, address: sxgvTokenAdress, method: 'balanceOf', args: [rarityMFix]});
	const myTokens = useContractCall({abi: sxgvTokenInterface, address: sxgvTokenAdress, method: 'balanceOf', args: [account]});
	const yieldPerDay = useContractCall({abi: SkinManagerFixInterface, address: rarityMFix, method: 'myAdventurersYieldPerDay', args: [account]});
	const myRoguesYieldPerDay = useContractCall({abi: SkinManagerFixInterface, address: rarityMFix, method: 'myRoguesYieldPerDay', args: [account]});
	const availableForClaim = useContractCall({abi: SkinManagerFixInterface, address: rarityMFix, method: 'availableForClaimAll', args: [account]});
	const skinsABI = JSON.stringify(summonerSkinsJson.abi);
	const skinsInterface = new ethers.utils.Interface(skinsABI);
	const commonABI = JSON.stringify(commonSkinsJson.abi);
	const commonInterface = new ethers.utils.Interface(commonABI);
	const skinBalance = useContractCall({abi : skinsInterface, address: addresses.summonerSkins, method: 'balanceOf', args: [account]});
	const commonBalance = useContractCall({abi: commonInterface, address: addresses.commonSkins, method: 'balanceOf', args: [account]});
	const currentPrice = useContractCall({abi: commonInterface, address: addresses.commonSkins, method: 'price'});
	const commonContract = new ethers.Contract(addresses.commonSkins,commonInterface);
	const mintRandomClasses = useContractFunction(commonContract,'mint');
	const mintAndAssign = useContractFunction(commonContract, 'mintAndAssign');
	const [amount, setAmount] = useState(10);
	const managerAddress = [addresses.manager];
	const [skinId, setSkinId] = useState(0);
	const {loading, error, data} = useQuery(gql`{
        summoners(where: {owner:"${account.toLowerCase()}"}) {
            id
        }
    }`);
	const {chainId} = useEthers();

	console.log(`44444 - ${myRoguesYieldPerDay? myRoguesYieldPerDay[0] : 'none'}`);

	const boldStyle = {fontWeight: 'bold', display: 'inline-block'};
    
	// 250 is fantom's chain id
	return(
		<>
			{'Total tokens available'}<div style={{...boldStyle, color:'lightgreen'}}>
                &nbsp;{Math.round(parseInt((totalTokensAvailable / 1e16).toString()))/100}&nbsp;
				{'$SGV'}&nbsp;&nbsp;
			</div>
			<br/>
			
			{'My Tokens'}<div style={{...boldStyle, color:'lightgreen'}}>
                &nbsp;{Math.round(parseInt((myTokens / 1e16).toString()))/100}&nbsp;
				{'$SGV'}&nbsp;&nbsp;
			</div>
			<br/>
			
			{'Yield Per Day'}<div style={{...boldStyle, color:'lightgreen'}}>
                &nbsp;{Math.round(parseInt(((yieldPerDay? yieldPerDay[0]: 0) / 1e16).toString()))/100}&nbsp;
				{'$SGV'}&nbsp;&nbsp;
			</div>
			<br/>
			
			{'Rouges Yield Per Day'}<div style={{...boldStyle, color:'lightgreen'}}>
                &nbsp;{Math.round(parseInt(((myRoguesYieldPerDay? myRoguesYieldPerDay[0] : 0) / 1e16).toString()))/100}&nbsp;
				{'$SGV'}&nbsp;&nbsp;
			</div>
			<br/>

			{'Pending'}<div style={{...boldStyle, color:'lightgreen'}}>
                &nbsp;{Math.round(parseInt((availableForClaim / 1e16).toString()))/100}&nbsp;
				{'$SGV'}&nbsp;&nbsp;
			</div>{'CLAIM'}
			<br/><br/>
			<h1>{'You need a costume to go to the  launch party!'}</h1>
			<br/>
			{/* {'Connected to '}{account.substring(0,5) + '...' + account.substring(account.length - 3)}<br/> */}
			{/* {chainId != 250 && <>{'Please connect to the Fantom network from your wallet'}</>} */}
			<br/><br/>
			{currentPrice !== undefined ? 
				<>{'Common Costumes Price : '}
					<div style={{...boldStyle, color:'lightgreen'}}>
                &nbsp;{Math.round(parseInt((currentPrice / 1e16).toString()))/100}&nbsp;
						{'$WSGOLD'}&nbsp;&nbsp;
					</div>
					<br/></>
				: 
				<>{'Loading ...'}<br/></>}
			{currentPrice && <>
				<Stack direction={'horizontal'}>
					<div>{'I want '}</div>
					<div>
						<Form.Control size={'sm'} type={'number'} value={amount} min={0} onChange={e => setAmount(e.target.value)} style={{backgroundColor: 'black'}}/>
					</div>
					<div>{'new costumes'}</div>
					<div>
						<Button size={'sm'} onClick={()=>{mintRandomClasses.send(amount,{value: '0'});}}>{'Mint !'}</Button>
					</div>
				</Stack><br/></>
			}
			{/* Rare Skins are <div style={{...boldStyle, color:"#ff4a4a"}}>Sold Out</div> !<br/> */}
			{/* {'Find them on '}<a href={'https://paintswap.finance/marketplace/collections/0x6fed400da17f2678c450aa1d35e909653b3b482a'}>{'OpenSea(!)'}</a> 
        &nbsp;{'or '}<a href={'https://artion.io/explore'}>{'Rarities(!)'}</a><br/> */}
			<br/>

			
			
			{/* Get infos on a Rare Skin <div style={{display: "inline-block"}}>
            <Form.Control size="sm" type="number" placeholder="skin id" value={skinId !== 0 ? skinId : undefined} onChange={e => setSkinId(e.target.value)}/>
        </div> */}
			{skinId > 0 && skinId <= 5000 && managerAddress && <><br/><br/><SkinInfos id={skinId} managerAddress={managerAddress}/></>}
			<br/><br/>
			{managerAddress && <Assigner managerAddress={managerAddress} />}
			<br/><br/>
			{/* {skins(skinBalance, account, managerAddress, "rare")} */}

			{!loading && !error && summonerList(data).length > 0 && <>
				<br/>
				<Stack direction={'horizontal'}>
					<div>{'Your summoners :'}</div>
					<div className={'ms-auto'}>
						<Button size={'sm'} onClick={()=>{
							mintAndAssign.send(summonerIds(data),{value: (currentPrice * summonerList(data).length).toString()});
						}}>{'Give a new skin to each summoner !'}</Button>
					</div>
				</Stack>
				<br/>
			</>}

			<Row>{summoners(loading, error, data, managerAddress, currentPrice)}</Row>
        
			<br/>
			{skins(commonBalance, account, managerAddress, 'common')}
		</>
	);
}

function skins(skinBalance, account, managerAddress, type){
	let arr =[];
	if(skinBalance && account && managerAddress){
		if (skinBalance == 0) return <>{'You have no '}{type === 'common' ? 'Common' : 'Rare'}{' Skin :( '}<br/></>;
		for(let i = 0; i < skinBalance; i++)
			arr.push(i);
		return <>
			{'Your '}{type === 'common' ? 'Common Costumes' : 'Rare Skins'}{' : '}<br/><br/>
			<Row>{arr.map(index => <Skin key={index} index={index} account={account} managerAddress={managerAddress[0]} type={type}/>)}</Row>
		</>;
	} else {
		return <Loading/>;
	}
}

function summoners(loading, error, data, managerAddress, currentPrice){
	let summonerList;

	if (loading) return <Loading/>;
	if (error) return <>{'GraphQL Error :( unable to load summoners'}</>;
	if (data && managerAddress && currentPrice){
		summonerList = data.summoners;
		if (summonerList.length == 0){
			return <>{'You have no summoners :( '}<br/></>;
		} else {
			return summonerList.map(summoner => <Summoner id={parseInt(summoner.id)} key={parseInt(summoner.id)} price={currentPrice} managerAddress={managerAddress}/>);
		}
	}
}

function summonerIds(data){
	return data.summoners.map(summoner => parseInt(summoner.id));
}

function summonerList(data){
	return data.summoners;
}