import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChainId, DAppProvider} from '@usedapp/core';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Mead from './components/Mead.js'

const client = new ApolloClient({
  uri: '', //https://api.thegraph.com/subgraphs/name/rarity-adventure/rarity
  cache: new InMemoryCache()
})

const config = {
  readOnlyChain : [ChainId.Fantom],
  readOnluUrls:{
    [ChainId.Fantom]: "https://api.polygonscan.com/api"
  },
  multicallAddresses: {
    1337: "0x557fD25F9169247000F9D866704b4Bc12680CE5f" 
  }
}

ReactDOM.render(
    <React.StrictMode>
        <DAppProvider config={config}>
          <ApolloProvider client={client}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/mead" element={<Mead />} />
              </Routes>
            </BrowserRouter>
          </ApolloProvider>
        </DAppProvider>
    </React.StrictMode>,
    document.getElementById('root')
);