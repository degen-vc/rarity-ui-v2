import Web3 from 'web3';
import {abi} from '../artifacts/contracts/alts/SummonerSkins.sol/SummonerSkins.json';
import {writeFileSync} from 'fs';

async function main(){
	let web3 = await new Web3('https://rpc.ftm.tools/');

	let allSkinsData = [];
	let tempJson;
	let buff;

	const skins = await new web3.eth.Contract(abi, '0xb1796cDe8AeBb2F3d3C715d4f384620B086C6923');

	for(let i = 1; i <= 5000; i++){
		tempJson = await skins.methods.tokenURI(i).call();
		tempJson = decodeURI(tempJson);
		tempJson = tempJson.split('data:application/json;base64,').pop();
		buff = new Buffer(tempJson, 'base64');
		tempJson = JSON.parse(buff.toString('utf8'));
		console.log(tempJson.name);
		allSkinsData.push(tempJson);
	}

	writeFileSync('./allSkins.json', JSON.stringify(allSkinsData), err => {
		if (err) {
			console.error(err);
			return;
		}
	});

	console.log('done');
}

main()
	.catch(err=>{
		console.log(err);
	});