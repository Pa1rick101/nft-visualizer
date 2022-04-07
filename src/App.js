import styled from 'styled-components';
import { NFTCard, NftPhoto } from './components/NFTCard';
import { useState, useEffect } from "react"
import { NFTModal } from './components/NFTModal';
import { ethers } from 'ethers';
import { connect } from './helpers';

const axios = require('axios');

function App() {

  let initialNfts = 
  [
    { name: "Festival1", symbol: "MHP", copies: 10, image: "https://via.placeholder.com/150" },
    { name: "Festival2", symbol: "MHP", copies: 10, image: "https://via.placeholder.com/150" },
    { name: "Festival3", symbol: "MHP", copies: 10, image: "https://via.placeholder.com/150" },
    { name: "Festival4", symbol: "MHP", copies: 10, image: "https://via.placeholder.com/150" },
    { name: "Festival5", symbol: "MHP", copies: 10, image: "https://via.placeholder.com/150" },
    { name: "Festival6", symbol: "MHP", copies: 10, image: "https://via.placeholder.com/150" },
    { name: "Festival7", symbol: "MHP", copies: 10, image: "https://via.placeholder.com/150" },
    { name: "Festival8", symbol: "MHP", copies: 10, image: "https://via.placeholder.com/150" },
  ]

  const [showModal, setShowModal] = useState(false)
  const [selectedNft, setSelectedNft] = useState()
  const [nfts, setNfts] = useState(initialNfts)

  useEffect( () => {

    ( async () => {
      const address = await connect()
      if (address) {
        getNfts(address)
      }
    })()
    
      
    }, [])



  function toggleModal(i) {
    if (i >= 0) {
      setSelectedNft(nfts[i])
    }
    setShowModal(!showModal)
  }

  async function getMetadataFromIpfs(tokenURI) {
    let metadata = await axios.get(tokenURI)
    return metadata.data
  }

  async function getNfts(address) {
    const rpc = "https://rpc.xdaichain.com/"
    const ethersProvider = new ethers.providers.JsonRpcProvider(rpc)

    let abi = [
      "function symbol() public view returns(string memory)",
      "function tokenCount() public view returns(uint256)",
      "function uri(uint256 _tokenId) public view returns(string memory)",
      "function balanceOfBatch(address[] accounts, uint256[] ids) public view returns(uint256[])"
    ]

    let nftCollection = new ethers.Contract(
      "0x22C1f6050E56d2876009903609a2cC3fEf83B415",
      abi,
      ethersProvider
    )

    let numberOfNfts = (await nftCollection.tokenCount()).toNumber()
    let collectionSymbol = await nftCollection.symbol()

    let accounts = Array(numberOfNfts).fill(address)
    let ids = Array.from({length: numberOfNfts}, (_, i) => i + 1)
    let copies = await nftCollection.balanceOfBatch(accounts, ids)

    let tempArray = []
    let baseUrl = ""

    for (let i=1; i<= numberOfNfts; i++) {
      if (i==1) { 
        let tokenURI = await nftCollection.uri(i)
        baseUrl = tokenURI.replace(/\d+.json/,"")
        let metadata = await getMetadataFromIpfs(tokenURI)
        metadata.symbol = collectionSymbol
        metadata.copies = copies[i - 1]
        tempArray.push(metadata)
      } else {
        let metadata = await getMetadataFromIpfs(baseUrl + `${i}.json`)
        metadata.symbol = collectionSymbol
        metadata.copies = copies[i - 1]
        tempArray.push(metadata)        

      }
    }
    setNfts(tempArray)
  }

  return (
    <div className="App">
      <Container>
        <Title> MHP Festival </Title>
        <Subtitle> Gotta Catch 'Em Call!</Subtitle>
        <Grid>
          {
            nfts.map((nft, i) =>
              <NFTCard nft={nft} key={i} toggleModal={() => toggleModal(i)} />
            )
          }
        </Grid>
      </Container>
      {
        showModal &&
        <NFTModal
          nft={selectedNft}
          toggleModal={() => toggleModal()}
        />
      }

    </div>
  );
}

const Title = styled.h1`
  margin: 0;
  text-align: center;
`
const Subtitle = styled.h4`
  color: gray;
  margin-top: 0;
  text-align: center;
`
const Container = styled.div`
  width: 70%;
  max-width: 1200px;
  margin: auto;
  margin-top: 100px;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 40px;
`

export default App;