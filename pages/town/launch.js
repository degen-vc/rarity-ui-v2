// import {useEffect, useState} from 'react';
import {ethers} from 'ethers';
import {useContractCall, useContractFunction} from '@usedapp/core';

import useWeb3 from	'contexts/useWeb3';
import useRarity from	'contexts/useRarity';
import LaunchHeader from 'components/_launch/LaunchHeader';
import FarmingInfoBox from 'components/_launch/FarmingInfoBox';
import AdvFarmingInfoBox from 'components/_launch/AdvFarmingInfoBox';
import LaunchInfoArticle from 'components/_launch/LaunchInfoArticle';
import PurchaseCostumeForm from 'components/_launch/PurchaseCostumeForm';
import SGV_TOKEN_ABI from 'utils/abi/sgvToken.abi';
import WRAPPED_GOLD_ABI from 'utils/abi/wrappedGold.abi';

import SkinInfos from 'components/Launch/components/SkinInfos';

const rarityMFix = '0x781394c4878e217A02CD66248df86dc4dC427738';
const skinsAddr = '0x2AF8F4B4F82051e3Ae985422AC71f591c428decC';

const addresses = {
	summonerSkins: '0x2AF8F4B4F82051e3Ae985422AC71f591c428decC',
	manager: '0x781394c4878e217A02CD66248df86dc4dC427738',
	commonSkins: '0x2AF8F4B4F82051e3Ae985422AC71f591c428decC'
};

const SgvTokenI = new ethers.utils.Interface(JSON.stringify(SGV_TOKEN_ABI));
const SkinManagerFixI = new ethers.utils.Interface('[{"inputs":[{"internalType":"address","name":"_rarity","type":"address"},{"internalType":"address","name":"_token","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"claimer","type":"address"},{"indexed":false,"internalType":"uint256","name":"skinId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"claimedAmount","type":"uint256"},{"indexed":false,"internalType":"bool","name":"isRogue","type":"bool"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"claimer","type":"address"},{"indexed":false,"internalType":"uint256","name":"claimedAmount","type":"uint256"}],"name":"ClaimAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"components":[{"internalType":"address","name":"implementation","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"indexed":false,"internalType":"struct RaritySkinManager.Skin","name":"skin","type":"tuple"},{"indexed":false,"internalType":"uint256","name":"summoner","type":"uint256"}],"name":"SumonnerSkinAssigned","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"adventurersTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"implementation","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"summonerId","type":"uint256"}],"name":"assignSkinToSummoner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"availableForClaim","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"availableForClaimAll","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"exManager","outputs":[{"internalType":"contract RaritySkinManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isStrictOnSummonerClass","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"myAdventurersYieldPerDay","outputs":[{"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"internalType":"uint256","name":"numOfAdventurers","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"myRoguesYieldPerDay","outputs":[{"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"internalType":"uint256","name":"numOfRogues","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rogueReserve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"roguesLevels","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"roguesTotalLevels","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"roguesValues","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"implementation","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"internalType":"struct RaritySkinManager.Skin","name":"skin","type":"tuple"}],"name":"skinKey","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"summonerId","type":"uint256"}],"name":"skinOf","outputs":[{"components":[{"internalType":"address","name":"implementation","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"internalType":"struct RaritySkinManager.Skin","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_skins","type":"address"}],"name":"skinsImplementation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_skinKey","type":"bytes32"}],"name":"summonerOf","outputs":[{"internalType":"uint256","name":"summonerId","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenPerLevel","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_impAddress","type":"address"}],"name":"trustImplementation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"summonerId","type":"uint256"}],"name":"trustedAssignSkinToSummoner","outputs":[],"stateMutability":"nonpayable","type":"function"}]');
const CommonSkinsI = new ethers.utils.Interface('[{"inputs":[{"internalType":"address","name":"_rarity","type":"address"},{"internalType":"address","name":"_gold","type":"address"},{"internalType":"address","name":"_raritySkinManagerFix","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"class","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isStrictOnSummonerClass","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"quantity","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raritySkinManager","outputs":[{"internalType":"contract RaritySkinManagerFix","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"skinURIs","outputs":[{"internalType":"contract CommonSkinURIs","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_to","type":"address"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]');

const WSGolsContract = new ethers.Contract(process.env.WRAPPED_GOLD, WRAPPED_GOLD_ABI);
const RSMFixContract = new ethers.Contract(rarityMFix, SkinManagerFixI);

const amountToSgvString = (amount, currency = 'SGV') => `${Math.round(parseInt((amount / 1e16).toString()))/100 || 0} $${currency}`;

const Launch = () => {
	const	{address} = useWeb3();
	const	{currentAdventurer: {name, tokenID}} = useRarity();

	const sgvTotal = useContractCall({abi: SgvTokenI, address: process.env.SGV_TOKEN_ADDR, method: 'balanceOf', args: [rarityMFix]});
	const sgvBalance = useContractCall({abi: SgvTokenI, address: process.env.SGV_TOKEN_ADDR, method: 'balanceOf', args: [address]});
	const sgvYield = useContractCall({abi: SkinManagerFixI, address: rarityMFix, method: 'myAdventurersYieldPerDay', args: [address]});
	const sgvRogueYield = useContractCall({abi: SkinManagerFixI, address: rarityMFix, method: 'myRoguesYieldPerDay', args: [address]});
	const sgvAvailable = useContractCall({abi: SkinManagerFixI, address: rarityMFix, method: 'availableForClaimAll', args: [address]});
	
	const currentSkin = useContractCall({abi: SkinManagerFixI, address: rarityMFix, method: 'skinOf', args: [+tokenID]});
	const currentSgvAvailable= useContractCall({abi: SkinManagerFixI, address: rarityMFix, method: 'availableForClaim', args: currentSkin ? [+`${currentSkin[0]['tokenId']}`]: '0'});

	const commonBalance = useContractCall({abi: CommonSkinsI, address: skinsAddr, method: 'balanceOf', args: [address]});
	const currentPrice = useContractCall({abi: CommonSkinsI, address: skinsAddr, method: 'price'});

	const managerAddress = [addresses.manager];

	
	const clamSGV = useContractFunction(RSMFixContract, 'claimAll');


	console.log(`${commonBalance}`, `${currentPrice}`);

	return (
		<section className={'max-w-full'}>
			<div className={'max-w-screen-lg w-full mx-auto'}>
				<LaunchHeader />
				<section className={'md:flex mt-12'}>
					<FarmingInfoBox
						sgvTotal={amountToSgvString(sgvTotal)}
						sgvBalance={amountToSgvString(sgvBalance)}
						sgvYield={amountToSgvString(sgvYield)}
						sgvRogueYield={amountToSgvString(sgvRogueYield?.[0])}
						sgvAvailable={amountToSgvString(sgvAvailable)}
					/>
					<AdvFarmingInfoBox
						name={name || `adventurer ${tokenID}`}
						sgvYield={amountToSgvString(sgvRogueYield?.[0])}
						sgvAvailable={amountToSgvString(currentSgvAvailable)}
					/>
				</section>
				<PurchaseCostumeForm
					commonBalance={commonBalance}
					currentPrice={amountToSgvString(currentPrice, 'WSGOLD')}
				/>
				<LaunchInfoArticle />
				<SkinInfos id={'10'} managerAddress={managerAddress}/>
			</div>
		</section>
	);
};

export default Launch;
