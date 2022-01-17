import Web3 from 'web3';
import {abi} from '../artifacts/contracts/alts/SummonerSkins.sol/SummonerSkins.json';
import {abi as _abi} from '../artifacts/contracts/alts/SkinURIs.sol/SkinURIs.json';
import {data as _data} from '../contracts/alts/data.json';
import HDWalletProvider from '@truffle/hdwallet-provider';
import {privateKeys as _privateKeys, RPCs} from '../secrets.json';

async function main(){
	let provider = new HDWalletProvider({
		privateKeys: [_privateKeys.fantom],
		providerOrUrl: RPCs.fantom
	});

	let web3 = await new Web3(provider);
	let accounts = await web3.eth.getAccounts();

	//const skins = await deployContract(skinsJSON, accounts[0], web3)
	let skins = await new web3.eth.Contract(abi,'0x6fEd400dA17f2678C450aA1D35e909653B3b482A');
	let uriAddress = await skins.methods.skinURIs().call();
	let uriContract = await new web3.eth.Contract(_abi,uriAddress);
	let treatedData = [];
	const regex = /["'"]/gm;
	let arr;
	for(let i = 0; i < _data.length; i++){
		arr = _data[i];
		arr = arr.map(str => str.replace((regex, str => {
			return str === '"' ? "'" : '"';
		})));
		treatedData.push(arr);
	}

	await sendContrFunc(uriContract.methods.initializeArt(0,treatedData.slice(0,3)),accounts[0]);
	await sendContrFunc(uriContract.methods.initializeArt(3,treatedData.slice(3,8)),accounts[0]);
	await sendContrFunc(uriContract.methods.initializeArt(8,treatedData.slice(8,treatedData.length)),accounts[0]);
	await sendContrFunc(uriContract.methods.renounceOwnership(),accounts[0]);

	console.log('done');
}

main()
	.catch(err=>{
		console.log(err);
	});

// personnal library
async function sendContrFunc(stuffToDo, from, value){
	let gas = await stuffToDo.estimateGas({from: from, value: value});
	console.log(gas);
	return await stuffToDo.send({from: from, gas: gas + 21000, gasPrice: '400000000000', value: value}); // gas fee is 1 gwei
}

async function deployContract(json, from, web3, args){
	let contract = await new web3.eth.Contract(json.abi);
	return await sendContrFunc(contract.deploy({data:json.bytecode, arguments: args}), from);
}