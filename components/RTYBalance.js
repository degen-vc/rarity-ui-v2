import {getRTYBalance} from 'utils/actions';
import {useEffect, useState} from 'react';
import {GTOKEN} from 'utils/constants';
import useWeb3 from	'contexts/useWeb3';

const RTYBalance = () => {
	const [rtyBalance, setRtyBalance] = useState();
	const	{address, provider} = useWeb3();


	useEffect(() => {
		if (!provider || !address ) return;
		getRTYBalance(provider, address, setRtyBalance);
	}, [provider, address]);

	return (rtyBalance ? `${Number(rtyBalance).toFixed(2)} ${GTOKEN}` : '-');
};

export default RTYBalance;