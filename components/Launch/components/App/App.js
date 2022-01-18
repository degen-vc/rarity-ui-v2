import {useEthers} from '@usedapp/core';
import {Button, Container, Navbar, Row, Col} from 'react-bootstrap';
import {Connected} from '../Connected';
// import { Link } from "react-router-dom";


export default function Mead(){
	const {activateBrowserWallet, account} = useEthers();
	// const style = {color : '#ffffff', backgroundColor: '#000000'};
	return(
		<div className={'App bg-white dark:bg-dark-600'}>
			<Navbar className={'bg-white dark:bg-dark-600'}>
				<Navbar.Brand className={'bg-white dark:bg-dark-600'}>
					{/* <Link to='/'>
                    &nbsp;&nbsp;Rarity Summoner's Rare Skins&nbsp;&nbsp;

                </Link> */}
				</Navbar.Brand>
				<Navbar.Brand className={'bg-white dark:bg-dark-600'}>
					{/* <Link to='/mead'>
                        MEAD
                    </Link> */}
				</Navbar.Brand>
			</Navbar>
			<Container className={'bg-white dark:bg-dark-600'}>
				<Row>
					<Col>
						<Row>
							<Col>
								<br/>
                                
								{!account && <><br/>&nbsp;&nbsp;<Button onClick={() => activateBrowserWallet()}>{'Connect Wallet'}</Button></>}

								{/* ugly cheap fix to background-color nor filling the whole screen */}
							</Col>
                            
						</Row>
						{account && <Connected account={account}/>}

						{/* {Array(100).fill(<br/>)}  */}
					</Col>
				</Row>
			</Container>
		</div>
	);
}