import {useState} from 'react';
import Button	from 'components/Button';
import BoxWithTitle from 'components/BoxWithTitle';
import InfoBlock from 'components/lands/InfoBlock';

const VALID_AMOUNT_RGX = /^[0-9]*\.?[0-9]*$/;

const StakeForm = ({
	maxStake,
	staked,
	sgvBalance,
	stakeSgvTokens,
	unstakeSgvTokens,
}) => {
	const [stakeAmount, setStakeAmount] = useState('');
	const [stakeAmountError, setStakeAmountError] = useState('');

	const stakeTokens = () => {
		if (stakeAmountError) return;
		stakeSgvTokens(stakeAmount);
	};
	
	const updateStakeAmpunt = (value) => {
		if (!value.trim().match(VALID_AMOUNT_RGX)) return;
		if (Number(value.trim()) > Number(sgvBalance)) {
			setStakeAmountError("You don't have enough $SGV to stake");
		} else if (stakeAmountError) {
			setStakeAmountError('');
		}
		setStakeAmount(value.trim());
	};

	return (
		<BoxWithTitle className={'mt-20'} title={'STAKE TO EARN POINTS'}>
			<div className={'text-center m:text-left m:flex'}>
				<div className={'w-full'}>
					<div className={'xs:flex w-full justify-around m:justify-between'}>
						<InfoBlock
							className={'mb-4 m:mb-2'}
							name={'Your $SGV'}
							value={sgvBalance} />
						<InfoBlock
							className={'mb-4 m:mb-2'}
							name={'Point rate'}
							value={'1 point/day'} />
					</div>
					<input
						value={stakeAmount}
						onChange={(e) => updateStakeAmpunt(e.target.value)}
						className={'w-3/4 m:w-full border-4 border-black dark:border-dark-100 bg-white dark:bg-dark-600 border-solid h-10 text-xs px-2 focus:outline-none text-black dark:text-white'}
						placeholder={'Amount'}
					/>
					{stakeAmountError && <p className={'text-megaxs text-tag-withdraw pt-2'}>{stakeAmountError}</p>}
				</div>

				<div className={'xs:flex w-full m:w-1/2 justify-around m:justify-end'}>
					<InfoBlock className={'mt-4 m:mt-0 m:ml-6 text-center'} name={'Max stake'} value={maxStake}>
						<Button
							className={'mt-2 inline-block cursor-pointer hover:bg-white focus:bg-white dark:hover:bg-dark-600 dark:focus:bg-dark-600 bg-gray-principal dark:bg-dark-400 text-center'}
							backgroundColor={'bg-gray-principal dark:bg-dark-400'}
							onClick={stakeTokens} >
							{'STAKE'}
						</Button>
					</InfoBlock>
					<InfoBlock className={'mt-4 m:mt-0 m:ml-6 text-center'} name={'Staked $SGV'} value={staked}>
						<Button
							className={'mt-2 inline-block cursor-pointer hover:bg-white focus:bg-white dark:hover:bg-dark-600 dark:focus:bg-dark-600 bg-gray-principal dark:bg-dark-400 text-center'}
							backgroundColor={'bg-gray-principal dark:bg-dark-400'}
							onClick={unstakeSgvTokens} >
							{'UNSTAKE'}
						</Button>
					</InfoBlock>
				</div>
			</div>
		</BoxWithTitle>
	);
};

export default StakeForm;
