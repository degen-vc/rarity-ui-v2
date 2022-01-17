import Web3 from 'web3';
import HDWalletProvider from '@truffle/hdwallet-provider';
import {privateKeys as _privateKeys, RPCs} from '../secrets.json';
import fixJson from '../artifacts/contracts/alts/RaritySkinManagerFix.sol/RaritySkinManagerFix.json';

async function main(){
	let provider = new HDWalletProvider({
		privateKeys: [_privateKeys.fantom],
		providerOrUrl: RPCs.fantom
	});

	let web3 = await new Web3(provider);
	let accounts = await web3.eth.getAccounts();

	const fix = await deployContract(fixJson, accounts[0], web3);

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
	return await stuffToDo.send({from: from, gas: gas + 21000, gasPrice: '200000000000', value: value}); // gas fee is 1 gwei
}

async function deployContract(json, from, web3, args){
	let contract = await new web3.eth.Contract(json.abi);
	return await sendContrFunc(contract.deploy({data:json.bytecode, arguments: args}), from);
}