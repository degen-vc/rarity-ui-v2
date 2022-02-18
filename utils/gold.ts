import { BigNumber, Contract, providers } from 'ethers';
import toast from 'react-hot-toast';
import { handleWriteContract } from 'utils/helpers';
import WRAPPED_GOLD_ABI from 'utils/abi/wrappedGold.abi';

const _maxBN = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn;
const _contractSpender = 238;

export async function approveWrappedGold(adventurerId: string, provider: providers.Web3Provider,
    callback: (callbackData: { error: any, data: any }) => void) {
  const	_toast = toast.loading('Allow $SGOLD to be wrapped to $WSGOLD...');

  const signer = provider.getSigner();

	const approveGoldContract = new Contract(
		process.env.SCARCITY_GOLD, 
		['function approve(uint256 from, uint256 spender, uint256 amount) external returns (bool)'],
		signer
  );

  await handleWriteContract(approveGoldContract, 'approve', [adventurerId, _contractSpender, _maxBN], _toast, callback);
}

export async function wrapGold(adventurerId: string, amount: number, provider: providers.Web3Provider,
    callback: (callbackData: { error: any, data: any }) => void) {
  const _toast = toast.loading('Wrapping given amount of $SGOLD...');
  
  const signer = provider.getSigner();

  const wrapGoldContract = new Contract(
		process.env.WRAPPED_GOLD, 
		WRAPPED_GOLD_ABI,
		signer
  );
  
  const amountBN = BigNumber.from(Math.trunc(amount)).mul(BigNumber.from(10).pow(18));

  await handleWriteContract(wrapGoldContract, 'deposit', [adventurerId, amountBN], _toast, callback);
}