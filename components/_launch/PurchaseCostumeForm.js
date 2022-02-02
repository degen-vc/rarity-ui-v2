import {useState} from 'react';
import Button	from 'components/Button';
import BoxWithTitle from 'components/BoxWithTitle';
import InfoBlock from 'components/InfoBlock';

const PurchaseCostumeForm = ({currentPrice}) => {
	const [costumeAmount, setCostumeAmount] = useState('10');
	const [costumeAmountError] = useState('');
	
	return (
		<BoxWithTitle className={'mt-12 items-between md:flex justify-between'} title={'PURCHASE COSTUME'}>
			<div className={'sm:w-2/3 m-auto md:mx-0'}>
				<div className={'sm:flex w-full justify-between'}>
					<InfoBlock
						className={'mb-4 m:mb-2 text-center sm:text-left'}
						name={'COSTUME PRICE:'}
						value={currentPrice} />
					<InfoBlock
						className={'mb-4 m:mb-2 text-center sm:text-right'}
						name={'I want to buy:'}
						value={`${costumeAmount || '-'} costumes`} />
				</div>
				<input
					type={'number'}
					value={costumeAmount}
					onChange={(e) => setCostumeAmount(e.target.value)}
					className={'w-2/3 m-auto block sm:w-full border-4 border-black dark:border-dark-100 bg-white dark:bg-dark-600 border-solid h-10 text-xs px-2 focus:border-black focus:outline-none text-black dark:text-white'}
					placeholder={'Amount'}
				/>
				{costumeAmountError && <p className={'text-megaxs text-tag-withdraw pt-2'}>{costumeAmountError}</p>}
			</div>

			<div className={'flex-1 xs:flex justify-center items-center sm:items-end md:ml-4 mt-6 flex flex-col xs:flex-row'}>	
				<Button
					className={'mb-4 xs:mb-0 xs:mr-4 inline-block cursor-pointer hover:bg-white focus:bg-white dark:hover:bg-dark-600 dark:focus:bg-dark-600 bg-gray-principal dark:bg-dark-400 text-center'}
					backgroundColor={'bg-gray-principal dark:bg-dark-400'}
					onClick={() => {}} >
					{'APROVE'}
				</Button>
				<Button
					className={'inline-block cursor-pointer hover:bg-white focus:bg-white dark:hover:bg-dark-600 dark:focus:bg-dark-600 bg-gray-principal dark:bg-dark-400 text-center'}
					backgroundColor={'bg-gray-principal dark:bg-dark-400'}
					onClick={() => {}} >
					{'MINT'}
				</Button>
			</div>
		</BoxWithTitle>
	);
};

export default PurchaseCostumeForm;
