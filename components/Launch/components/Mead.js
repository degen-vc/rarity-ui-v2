import { useEthers } from '@usedapp/core'
import { Button, Container, Navbar, Row, Col } from 'react-bootstrap'
import { Connected } from './Connected'
import { Link } from "react-router-dom";


export default function App(){
    const { activateBrowserWallet, account } = useEthers()
    const style = {color : "#ffffff", backgroundColor: "#000000"}
    return(
        <div className="App" style={{color : "#ffffff", backgroundColor: "#000000"}}>
            <Navbar bg="dark">
                <Navbar.Brand style={{color : "#ffffff"}}>
                <Link to='/'>
                    &nbsp;&nbsp;Rarity Summoner's Rare Skins&nbsp;&nbsp;

                </Link>
                </Navbar.Brand>
                <Navbar.Brand style={{color : "#ffffff"}}>
                    <Link to='/mead'>
                        MEAD
                    </Link>
                </Navbar.Brand>
            </Navbar>
            <Container style={{color : "#ffffff", backgroundColor: "#000000"}}>
                <Row className="justify-content-md-center">
                  <Col className="justify-content-md-center">
                      <br/>
                      <h1>$MEAD</h1>

                      {!account && <><br/>&nbsp;&nbsp;<Button onClick={() => activateBrowserWallet()}>Connect Wallet</Button></>}
                      <br/>
                      <br/>
                      <br/>
                      $MEAD generated per day: -;

                      <br/>
                      <br/>
                      Available $MEAD: -;
                      <br/>
                      <br/>
                      <br/>
                      <Button size="sm" onClick>Claim !</Button>

                      {/* ugly cheap fix to background-color nor filling the whole screen */}
                  </Col>
              </Row>
              {/* {account && <Connected account={account}/>} */}

              {Array(100).fill(<br/>)} 
            </Container>
        </div>
    )
}