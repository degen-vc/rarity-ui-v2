import {getSGVBalance} from 'utils/actions';
import {useEffect, useState} from 'react';
import {GTOKEN} from 'utils/constants';
import useWeb3 from	'contexts/useWeb3';

const RTYBalance = () => {
	const [sgvBalance, setSgvBalance] = useState();
	const	{address, provider} = useWeb3();


	useEffect(() => {
		if (!provider || !address ) return;
		getSGVBalance(provider, address, setSgvBalance);
	}, [provider, address]);

	return (sgvBalance ? `${Number(sgvBalance).toFixed(2)} ${GTOKEN}` : '-');
};

export default RTYBalance;