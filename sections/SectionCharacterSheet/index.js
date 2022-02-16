import {useState, useEffect}	from	'react';
import Image from	'next/image';
import {Contract}	from	'ethcall';
import Attributes	from	'sections/SectionCharacterSheet/Attributes';	
import Balloon from	'sections/SectionCharacterSheet/Balloon';	
import Info from 'sections/SectionCharacterSheet/Info';
import AdventurerTab from 'sections/SectionCharacterSheet/AdventurerTab';
import {newEthCallProvider} from 'utils';
import {classMappingImg}	from	'utils/constants';
import RARITY_NAMES_ABI from 'utils/abi/rarityNames.abi';

const checkNamePrice = async (provider, callback) => {
	const	ethcallProvider = await newEthCallProvider(provider);
	const namesContract = new Contract(process.env.RARITY_NAMES_ADDR, RARITY_NAMES_ABI);
	const namePriceCall = namesContract.buyTokenPrice();
	const namePrice = await ethcallProvider.all([namePriceCall]);
	return callback(+`${namePrice}`);
};

function	Adventurer({rarity, provider, updateRarity, router, chainTime}) {
	const [namePrice, setNamePrice] = useState(0);
	
	useEffect(() => {
		if (namePrice || !provider) return;
		checkNamePrice(provider, setNamePrice);
	}, [namePrice, provider]);

	return (
		<div className={'w-full'}>
			<div className={'flex flex-row w-full mb-6'}>
				<div className={'w-full flex flex-col-reverse md:flex-row justify-start'}>
					<div className={'w-64'} style={{minWidth: 256}}>
						<Image
							src={classMappingImg[rarity.class]}
							loading={'eager'}
							quality={100}
							width={256}
							height={256} />
					</div>
					<div>
						<section className={'message -left'}>
							<Balloon
								adventurer={rarity}
								chainTime={chainTime}
								updateRarity={updateRarity}
								provider={provider}
								router={router} />
						</section>
					</div>
				</div>
			</div>
			<div className={'flex flex-col md:flex-row w-full space-x-0 md:space-x-4 space-y-6 md:space-y-0'}>
				<Info adventurer={rarity} updateRarity={updateRarity} namePrice={namePrice} />
				<Attributes adventurer={rarity} updateRarity={updateRarity} provider={provider} />
			</div>
			<AdventurerTab adventurer={rarity} updateRarity={updateRarity} provider={provider} />
		</div>
	);
}

export default Adventurer;