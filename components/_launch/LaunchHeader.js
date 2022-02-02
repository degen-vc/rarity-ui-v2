import {useState, useEffect}	from	'react';
import HeroHeader from 'components/HeroHeader';
import Typer from	'components/Typer';

// TODO: Remove this flag once implemented in Polygon!
const bankImplemented = true;

const LaunchHeader = ({selectedVault, isTxPending, hasDeposited, hasDepositError, isDeposit}) => {
	const	[nonce, setNonce] = useState(0);
	const	[npcTextIndex, setNpcTextIndex] = useState(0);
	const	[hadInitialMessage, setHadInitialMessage] = useState(false);
	
	useEffect(() => {
		setNpcTextIndex(0);
		setNonce(n => n+1);
	}, [selectedVault?.id, isTxPending, hasDeposited, hasDepositError, isDeposit]);

	const	renderNPCText = () => {
		if (!bankImplemented) {
			return (
				<>
					<Typer onDone={() => setNpcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
						{'THE'}
					</Typer>&nbsp;
					<span className={'text-tag-info'}><Typer onDone={() => setNpcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
						{'LAUNCH'}
					</Typer></span>
					<Typer onDone={() => setNpcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
						{' IS NOT YET OPEN, Bazifra, will soon host the launch party in our tavern. In the meantime feel free to explore the Cellar for crafting materials.'}
					</Typer>
				</>
			);
		}

		if (selectedVault?.id >= 0) {
			if (isTxPending) {
				return (
					<Typer>{'GREAT CHOICE! LET\'S PROCESS YOUR TRANSACTION'}</Typer>
				);
			}

			if (hasDeposited) {
				return (
					<>
						<Typer onDone={() => setNpcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
							{'THANK YOU FOR YOUR DEPOSIT! THIS IS A GREAT INVESTMENT! TRUST ME!'}
						</Typer>
					</>
				);
			}

			if (hasDepositError) {
				return (
					<Typer>{'OH YOU CHANGED YOUR MIND!'}</Typer>
				);
			}

			if (!isDeposit) {
				if (Number(selectedVault?.share || 0) > 0) {
					return (
						<>
							<Typer onDone={() => setNpcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
								{'OH, YOU WOULD LIKE TO GET YOUR INVESTMENT BACK? HOW MANY '}
							</Typer>
							<span className={'text-tag-info'}><Typer onDone={() => setNpcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
								{selectedVault?.token}
							</Typer></span>
							<Typer onDone={() => setNpcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
								{' DO YOU WANT TO WITHDRAW?'}
							</Typer>
						</>
					);
				}
			}

			if (Number(selectedVault?.balance || 0) === 0) {
				if (Number(selectedVault?.share || 0) > 0) {
					return (
						<>
							<Typer onDone={() => setNpcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
								{'OH, YOU WOULD LIKE TO GET YOUR INVESTMENT BACK? HOW MANY '}
							</Typer>
							<span className={'text-tag-info'}><Typer onDone={() => setNpcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
								{selectedVault?.token}
							</Typer></span>
							<Typer onDone={() => setNpcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
								{' DO YOU WANT TO WITHDRAW?'}
							</Typer>
						</>
					);
				}
				return (
					<>
						<Typer onDone={() => setNpcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
							{'I WOULD LOVE TO, TRAVELER! BUT YOU DON\'T HAVE ANY '}
						</Typer>
						<span className={'text-tag-info'}><Typer onDone={() => setNpcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
							{selectedVault?.token}
						</Typer></span>
						<Typer onDone={() => setNpcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
							{'!'}
						</Typer>
					</>
				);
			}

			return (
				<>
					<Typer onDone={() => setNpcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
						{'GREAT CHOICE, TRAVELER! YOU HAVE '}
					</Typer>
					<span className={'text-tag-info'}><Typer onDone={() => setNpcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
						{`${Number(selectedVault?.balance || 0).toFixed(4)} ${selectedVault?.token}`}
					</Typer></span>
					<Typer onDone={() => setNpcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
						{', HOW MUCH WILL YOU DEPOSIT IN '}
					</Typer>
					<span className={'text-tag-info'}><Typer onDone={() => setNpcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 3}>
						{selectedVault?.name}
					</Typer></span>
				</>
			);
		}

		if (hadInitialMessage) {
			return (
				<>
					{'LOOK WHO IS HERE! WELCOME TO '}
					<span className={'text-tag-info'}>{'IVAN’S BANK'}</span>
					{', MIGHTY HERO! SO YOU’VE EARNED SOME COINS IN YOUR LEGENDARY ADVENTURES, HAVEN’T YOU? I CAN EARN YOU EVEN MORE! JUST DEPOSIT IN THE ONE OF THESE VERY NICE VAULTS...'}
				</>
			);
		}

		return (
			<>
				<Typer onDone={() => setNpcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
					{'LOOK WHO IS HERE! WELCOME TO '}
				</Typer>
				<span className={'text-tag-info'}>
					<Typer onDone={() => setNpcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
						{'IVAN’S BANK'}
					</Typer>
				</span>
				<Typer
					onDone={() => {
						setNpcTextIndex(i => i + 1);
						setHadInitialMessage(true);
					}}
					shouldStart={npcTextIndex === 2}>
					{', MIGHTY HERO! SO YOU’VE EARNED SOME COINS IN YOUR LEGENDARY ADVENTURES, HAVEN’T YOU? I CAN EARN YOU EVEN MORE! JUST DEPOSIT IN THE ONE OF THESE VERY NICE VAULTS...'}
				</Typer>
			</>
		);
	};

	return (
		<HeroHeader imageUrl={'/avatar/ivanna.png'}>
			<h1 key={nonce} className={'text-xs md:text-xs leading-normal md:leading-8'}>
				{renderNPCText()}
			</h1>
		</HeroHeader>
	);
};

export default LaunchHeader;
