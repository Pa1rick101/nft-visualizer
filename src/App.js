import styled from 'styled-components';
import { NFTCard } from './components/NFTCard';


function App() {

  let nft = [
    { name: "Festival1", symbol: "MHP", copies: 10, image:"https://via.placeholder.com/150"},
    { name: "Festival2", symbol: "MHP", copies: 10, image:"https://via.placeholder.com/150"},
    { name: "Festival3", symbol: "MHP", copies: 10, image:"https://via.placeholder.com/150"},
    { name: "Festival4", symbol: "MHP", copies: 10, image:"https://via.placeholder.com/150"},
    { name: "Festival1", symbol: "MHP", copies: 10, image:"https://via.placeholder.com/150"},
    { name: "Festival2", symbol: "MHP", copies: 10, image:"https://via.placeholder.com/150"},
    { name: "Festival3", symbol: "MHP", copies: 10, image:"https://via.placeholder.com/150"},
    { name: "Festival4", symbol: "MHP", copies: 10, image:"https://via.placeholder.com/150"}
  ] 
  
  return (
    <div className="App">
      <Container>
        <Title> MHP Festival NFTs</Title>
        <Subtitle>Gotta Catch 'Em All!</Subtitle>
        <Grid>
        {
          nft.map((nft, i) =>
          <NFTCard nft={nft} key= {i} />
        )}
        </Grid>
      </Container>
      <NFTModal />

    </div>
  );
}
const NFTModal = (props) => {
  return (
    <Modal>
      <ModalContent>

      </ModalContent>
    </Modal>
  )
}
const Modal = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%auto;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.5);
`

const ModalContent = styled.div`
  position: relative;
  width: 900px;
  margin: auto;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
`

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
