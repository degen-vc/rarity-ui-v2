import	{useState}				     from	'react';
import	useWeb3						     from	'contexts/useWeb3';
import	useRarity						   from	'contexts/useRarity';
import	ListBox						     from	'components/ListBox';
import	Box								     from	'components/Box';
import	Button						     from	'components/Button';
import  TRANSFER_GOLD_ABI      from 'utils/abi/transferGold.abi';
import  TRANSFER_MATERIALS_ABI from 'utils/abi/transferMaterials.abi';
import	ITEMS						       from	'utils/codex/items';
import  {transfer} 		         from	'utils/actions';

const transferOptions = [
	{name: 'GOLD', value: 'gold'},
	{name: 'CRAFT MATERIALS', value: 'materials'}
];

const DIGITS_REGEX = /^\d+$/;
const DIGIT_DOTS_REGEX = /^[0-9]*\.?[0-9]*$/;

const validateDigits = (value, withDot = false) => {
	if (withDot) return DIGIT_DOTS_REGEX.test(value) ;
	return DIGITS_REGEX.test(value);
};

const TransferForm = () => {
	const	{provider} = useWeb3();
	const {rarities} = useRarity();
	const [transferType, setTransferType] = useState(transferOptions[0]);
	const [sender, setSender] = useState('');
	const [senderError, setSenderError] = useState('');
	const [recipient, setRecipient] = useState('');
	const [amount, setAmount] = useState('');
	const [amountError, setAmountError] = useState('');

	const onTransfer = () => {
		if (!sender || !recipient || !amount || senderError || amountError) return;
		const isGold = transferType.name === transferOptions[0].name;
		const contractAddress = isGold ? process.env.TRANSFER_GOLD_ADDR : process.env.TRANSFER_MATERIALS_ADDR;
		const contractABI = isGold ? TRANSFER_GOLD_ABI : TRANSFER_MATERIALS_ABI;
		transfer(provider, contractAddress, contractABI, sender, recipient, amount, isGold);
	};

	const onChangeSender = (value) => {
		if (value && !validateDigits(value)) return;
		if (senderError) setSenderError('');
		setSender(value);
	};

	const onChangeRecipient = (value) => {
		if (value && !validateDigits(value)) return;
		setRecipient(value);
	};

	const onChangeAmount = (value) => {
		if (value && !validateDigits(value, transferType.name === transferOptions[0].name)) return;
		if (amountError) setAmountError('');
		setAmount(value);
	};

	const onChangeTransferType = (newTransferType) => {
		setTransferType(newTransferType);
		setAmount('');
		if (amountError) setAmountError('');
	};

	const checkSenderId = () => {
		if (!sender) return;
		if (sender && !Object.keys(rarities).includes(sender))
			setSenderError('You can only transfer from your summoner');
	};

	const checkAmount = () => {
		if (!amount) return;
		const currentSender = rarities?.[sender];
		const balance = transferType.name === transferOptions[0].name
			? Number(currentSender?.gold?.balance || '')
			: Number(currentSender?.inventory?.[ITEMS[0].id]);
		if (amount > balance) setAmountError('Amount exceeds your balance');
	};

	const renderBalance = () => {
		const currentSender = rarities?.[sender];
		if (!sender || !currentSender) return null;
		return transferType.name === transferOptions[0].name
			? `${Number(currentSender?.gold?.balance || '').toFixed(1)}`
			: `${Number(currentSender?.inventory?.[ITEMS[0].id])}`;
	};

	return (
		<Box className={'mt-12 p-4 with-title nes-container'}>
			<p className={'title bg-white dark:bg-dark-600 z-50 relative'} style={{paddingTop: '0.5rem'}}>{'Transfer gold and craft materials'}</p>
			<div className={'md:flex items-start py-2 mb-2'}>
				<div className={'mb-2 md:mb-0 md:mr-4 flex-1'}>
					<p className={'text-megaxs text-black py-2 dark:text-white'}>{'Sender'}</p>
					<input
						onChange={e => onChangeSender(e?.target?.value || '', setSender)}
						onBlur={checkSenderId}
						className={'border-4 border-black dark:border-dark-100 bg-white dark:bg-dark-600 border-solid h-10 w-full text-xs px-2 focus:outline-none text-black dark:text-white'}
						placeholder={'Adventurer ID'}
						value={sender}
					/>
					{senderError && <p className={'text-megaxs text-tag-withdraw pt-2'}>{senderError}</p>}
				</div>
				<div className={'mb-2 md:mb-0 md:mr-4 flex-1'}>
					<p className={'text-megaxs text-black py-2 dark:text-white'}>{'Recipient'}</p>
					<input
						onChange={e => onChangeRecipient(e?.target?.value || '')}
						className={'border-4 border-black dark:border-dark-100 bg-white dark:bg-dark-600 border-solid h-10 w-full text-xs px-2 focus:outline-none text-black dark:text-white'}
						placeholder={'Adventurer ID'}
						value={recipient}
					/>
				</div>
				<div className={'md:mr-4 relative flex-1'}>
					<span className={'absolute z-10 right-0 text-megaxs pt-2 mr-5 text-black dark:text-white'}>{`(${renderBalance() || '-'})`}</span>
					<ListBox
						options={transferOptions}
						className={'w-full'}
						set_selected={onChangeTransferType}
						selected={transferType} />
					<input
						onChange={e => onChangeAmount(e?.target?.value || '')}
						onBlur={checkAmount}
						className={'border-4 border-black dark:border-dark-100 bg-white dark:bg-dark-600 border-solid h-10 w-full text-xs px-2 focus:outline-none text-black dark:text-white'}
						placeholder={'AMOUNT'}
						disabled={!sender || senderError}
						value={amount}
					/>
					{amountError && <p className={'text-megaxs text-tag-withdraw pt-2'}>{amountError}</p>}
				</div>
				<div className={'mb-2 md:mb-0 text-center'}>
					<p className={'text-megaxs text-black dark:text-dark-100 py-2 invisible'}>{'transfer'}</p>
					<Button
						onClick={onTransfer}
						className={'inline-block cursor-pointer hover:bg-gray-secondary focus:bg-gray-secondary dark:hover:bg-dark-600 dark:focus:bg-dark-600 bg-white dark:bg-dark-900 text-center'}
						backgroundColor={'bg-white dark:bg-black bg-opacity-40 dark:bg-opacity-0'}>
						{'TRANSFER'}
					</Button>
				</div>
			</div>
		</Box>
	);
};

export default TransferForm;
