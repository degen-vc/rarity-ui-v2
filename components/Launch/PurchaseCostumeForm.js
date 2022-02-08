import {useState, useEffect} from 'react';
import Button	from 'components/Button';
import BoxWithTitle from 'components/BoxWithTitle';
import InfoBlock from 'components/InfoBlock';
import {validateDigits} from 'utils/scarcity-functions';
import {getWGoldBalance, approveWGold, mintRandomCostume} from 'utils/actions';

const calculateAmount = (amount, price) => Number(amount) * Number(price);

const PurchaseCostumeForm = ({address, provider, currentPrice}) => {
	const [wrappeGold, setWrappedGold] = useState('-');
	const [costumeAmount, setCostumeAmount] = useState('');
	const [costumeAmountError, setCostumeAmountError] = useState('');

	const onChangeAmount = (value) => {
		if (value && !validateDigits(value)) return;
		if (costumeAmountError) setCostumeAmountError('');
		setCostumeAmount(value);
	};

	const checkAmount = () => {
		if (!costumeAmount) return;
		if (calculateAmount(costumeAmount, currentPrice) > Number(wrappeGold?.balance))
			return setCostumeAmountError(`Amount ${calculateAmount(costumeAmount, currentPrice)} $WSGOLD exceeds your balance`);
	};

	const handleGoldAllowance = () => setWrappedGold(prev => ({...prev, allowance: true}));

	const handleMint = () => {
		if (!costumeAmount || costumeAmountError) return;
		mintRandomCostume(provider, costumeAmount);
	};
	
	const handleApprove = () => approveWGold(provider, handleGoldAllowance);

	useEffect(() => {
		if (!address || !provider) return;
		getWGoldBalance(provider, address, process.env.COMMON_SKIN_ADDR, setWrappedGold);
	}, [address, provider]);

	return (
		<BoxWithTitle className={'mt-12 items-between m:flex justify-between'} title={'PURCHASE COSTUME'}>
			<div className={'md:w-2/3 m-auto'}>
				<div className={'sm:flex w-full justify-between mb-2'}>
					<InfoBlock
						className={'mb-4 md:mb-2 text-center sm:text-left'}
						name={'COSTUME PRICE:'}
						value={`${currentPrice} $WSGOLD`} />
					<InfoBlock
						className={'mb-4 md:mb-2 text-center sm:text-right'}
						name={'your balance:'}
						value={`${wrappeGold?.balance} $WSGOLD`} />
				</div>
				<div className={'sm:w-full m-auto'}>
					<input
						value={costumeAmount}
						onChange={(e) => onChangeAmount(e.target.value)}
						onBlur={checkAmount}
						className={'block w-full border-4 border-black dark:border-dark-100 bg-white dark:bg-dark-600 border-solid h-10 text-xs px-2 focus:border-black focus:outline-none text-black dark:text-white'}
						placeholder={'Costumes amount'} />
					{costumeAmountError && <p className={'text-megaxs text-tag-withdraw pt-2'}>{costumeAmountError}</p>}
					{(costumeAmount && !costumeAmountError) && <p className={'text-megaxs text-tag-new pt-2'}>{`Total price: ${costumeAmount ? calculateAmount(costumeAmount, currentPrice) : '0'} $WSGOLD`}</p>}
				</div>
			</div>

			<div className={'flex-1 xs:flex justify-center m:justify-start items-center md:items-start m:ml-4 m:mt-12 pt-4 flex flex-col xs:flex-row'}>	
				{!wrappeGold?.allowance && (
					<Button
						className={'mb-4 xs:mb-0 xs:mr-4 inline-block cursor-pointer hover:bg-white focus:bg-white dark:hover:bg-dark-600 dark:focus:bg-dark-600 bg-gray-principal dark:bg-dark-400 text-center'}
						backgroundColor={'bg-gray-principal dark:bg-dark-400'}
						onClick={handleApprove} >
						{'APROVE'}
					</Button>
				)}
				<Button
					className={'inline-block cursor-pointer hover:bg-white focus:bg-white dark:hover:bg-dark-600 dark:focus:bg-dark-600 bg-gray-principal dark:bg-dark-400 text-center'}
					backgroundColor={'bg-gray-principal dark:bg-dark-400'}
					onClick={handleMint} >
					{'MINT'}
				</Button>
			</div>
		</BoxWithTitle>
	);
};

export default PurchaseCostumeForm;
