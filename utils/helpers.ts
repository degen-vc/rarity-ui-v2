/**
 * Helper functions.
 */

 import { Contract, ContractTransaction, ethers }												from	'ethers';
 import { Provider } from 'ethcall';
 import	toast				from	'react-hot-toast';
 import { BaseProvider } from '@ethersproject/providers';
 
 
 export async function newEthCallProvider(provider: BaseProvider, devMode: boolean) {
   const	ethcallProvider = new Provider();
   if (devMode) {
     await	ethcallProvider.init(new ethers.providers.JsonRpcProvider('http://localhost:8545'));
     ethcallProvider.multicallAddress = process.env.MULTICALL_ADDRESS;
     ethcallProvider.multicall2Address = process.env.MULTICALL2_ADDRESS;
     return ethcallProvider;
   }
   await	ethcallProvider.init(provider);
   return	ethcallProvider;
 }
 
 const _defaultTransactionError = 'Impossible to submit transaction';
 const _defaultWriteError = 'Something went wrong, please try again later.';
 
 /** 
  * Common function that handles write function calls on contracts, handling transactions and errors as necessary.
  */
 export async function handleWriteContract(contract: Contract, functionName: string, parameters: any[],
   toastId: string, callback: (callbackData: { error: any, data: any }) => void,
   transactionErrorMessage = _defaultTransactionError, unexpectedErrorMessage = _defaultWriteError) {
   
   // In order to avoid dumb error, let's first check if the TX would be successful with a static call
   try {
     await contract.callStatic[functionName](...parameters);
   } catch (error) {
     toast.dismiss(toastId);
     toast.error(transactionErrorMessage);
     callback({error, data: undefined});
     return;
   }
 
   // If the call is successful, try to perform the actual TX
   try {
     const	transaction: ContractTransaction = await contract.functions[functionName](...parameters);
     const	transactionResult = await transaction.wait();
     if (transactionResult.status === 1) {
       callback({error: false, data: undefined});
       toast.dismiss(toastId);
       toast.success('Transaction successful');
     } else {
       toast.dismiss(toastId);
       toast.error('Transaction reverted');
       callback({error: true, data: parameters});
     }
   } catch (error) {
     console.error(error);
     toast.dismiss(toastId);
     toast.error(unexpectedErrorMessage);
     callback({error, data: parameters});
   }
 }