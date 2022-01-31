import {useState, useEffect} from 'react';
import useWeb3 from	'contexts/useWeb3';
import LandsHeader from 'components/lands/LandsHeader';
import StakeForm from 'components/lands/StakeForm';
import PlotInfo from 'components/lands/PlotInfo';
import Map from 'components/lands/Map';
import {MAPS} from 'components/lands/consts';
import {getSGVBalance, getLandsGameInfo, stakeSgvTokens, unstakeSgvTokens, buyPlot} from 'utils/actions';

const Lands = () => {
	const	{address, provider} = useWeb3();

	const [map] = useState(Object.values(MAPS)[0]);
	const [sgvBalance, setSgvBalance] = useState(0);
	const [gameInfo, setGameInfo] = useState({});
	const [plot, setPlot] = useState();

	const onStakeSgvTokens = (value) => stakeSgvTokens(
		provider, map.address, map.abi, value, gameInfo?.maxStake
	);

	const onUnstakeSgvTokens = () => unstakeSgvTokens(
		provider, map.address, map.abi, gameInfo?.staked
	);

	const onBuyPlot = () => buyPlot(
		provider, map.address, map.abi, plot?.x, plot?.y
	);

	useEffect(() => {
		getSGVBalance(provider, address, setSgvBalance);
	}, [provider, address]);

	useEffect(() => {
		getLandsGameInfo(provider, map.address, map.abi, address, setGameInfo);
	}, [provider, address, map]);

	return (
		<section className={'max-w-screen-lg w-full mx-auto'}>
			<LandsHeader />
			<StakeForm
				sgvBalance={sgvBalance}
				staked={gameInfo?.staked}
				maxStake={gameInfo?.maxStake}
				tokensPerDay={gameInfo?.tokensPerDay}
				stakeSgvTokens={onStakeSgvTokens}
				unstakeSgvTokens={onUnstakeSgvTokens} />
			<PlotInfo
				plot={plot}
				buyPlot={onBuyPlot}
				rewardNeeded={gameInfo?.rewardNeeded && Number(gameInfo?.rewardNeeded)}
				points={gameInfo?.balance && Number(gameInfo?.balance)}
				canBuy={gameInfo?.canBuy && Number(gameInfo?.canBuy)}
				staked={gameInfo?.staked && Number(gameInfo?.staked)}
				sgvBalance={sgvBalance} />
			<Map
				rows={gameInfo?.mapYSize}
				cols={gameInfo?.mapXSize}
				url={map?.url}
				plot={plot}
				plots={gameInfo?.plots}
				selectPlot={setPlot} />
		</section>
	);
};
 
export default Lands;
