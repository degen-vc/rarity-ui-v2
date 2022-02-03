import BoxWithTitle from 'components/BoxWithTitle';
import Skin from 'components/_launch/Skin';

const Skins = ({skinBalance, address, managerAddress, type = 'common'}) => {
	const skinsArr = [...Array(Number(skinBalance)).keys()];
	
	return (
		<BoxWithTitle title={'YOUR COSTUMES'} className={'mt-8 flex flex-wrap'}>
			{skinsArr.length
				? skinsArr?.map(skin => 
					<Skin key={skin} index={skin} address={address} managerAddress={managerAddress} type={type} />
				) : (
					<div>{'You have no costumes yet'}</div>
				)
			}
		</BoxWithTitle>
	);
};

export default Skins;
