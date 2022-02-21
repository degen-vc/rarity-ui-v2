import { BigNumber, Contract, providers } from 'ethers';
import toast from 'react-hot-toast';
import { handleWriteContract } from 'utils/helpers';
import WRAPPED_GOLD_ABI from 'utils/abi/wrappedGold.abi';

const _maxBN = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn;
const _contractSpender = 1;

export async function approveWrappedGold(adventurerId: string, provider: providers.Web3Provider,
    callback: (callbackData: { error: any, data: any }) => void) {
  const	_toast = toast.loading('Allow $RGV to be wrapped to $WG...');

  const signer = provider.getSigner();

	const approveGoldContract = new Contract(
		process.env.RARITY_GOLD_ADDR, 
		['function approve(uint256 from, uint256 spender, uint256 amount) external returns (bool)'],
		signer
  );

  await handleWriteContract(approveGoldContract, 'approve', [adventurerId, _contractSpender, _maxBN], _toast, callback);
}

export async function wrapGold(adventurerId: string, amount: number, provider: providers.Web3Provider,
    callback: (callbackData: { error: any, data: any }) => void) {
  const _toast = toast.loading('Wrapping given amount of $RG...');
  
  const signer = provider.getSigner();

  const wrapGoldContract = new Contract(
		process.env.WRAPPED_GOLD, 
		WRAPPED_GOLD_ABI,
		signer
  );
  
  const amountBN = BigNumber.from(Math.trunc(amount)).mul(BigNumber.from(10).pow(18));

  await handleWriteContract(wrapGoldContract, 'deposit', [adventurerId, amountBN], _toast, callback);
}

export async function unwrapGold(adventurerId: string, amount: number, provider: providers.Web3Provider, callback: () => void) {
  const _toast = toast.loading('Unwrapping given amount of $WG...');

  const signer = provider.getSigner();

  const wrapGoldContract = new Contract(
    process.env.WRAPPED_GOLD, 
    WRAPPED_GOLD_ABI,
    signer
  );
  
  const amountBN = BigNumber.from(Math.trunc(amount)).mul(BigNumber.from(10).pow(18));

  try {
    const transaction = await wrapGoldContract.withdraw(adventurerId, amountBN);
    const	transactionResult = await transaction.wait();
    if (transactionResult.status === 1) {
      toast.dismiss(_toast);
      toast.success('Transaction successful');
      callback();
    } else {
      toast.dismiss(_toast);
      toast.error('Transaction reverted');
    }
  } catch (error) {
    console.error(error);
    toast.dismiss(_toast);
    toast.error('Something wait wrong. Please try again later');
  }
}