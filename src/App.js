import { NFTCard } from './components/NFTCard';


function App() {

  let nft = [
    { name: "Festival1", symbol: "MHP", copies: 10, image:"https://via.placeholder.com/150"},
    { name: "Festival2", symbol: "MHP", copies: 10, image:"https://via.placeholder.com/150"},
    { name: "Festival3", symbol: "MHP", copies: 10, image:"https://via.placeholder.com/150"},
    { name: "Festival4", symbol: "MHP", copies: 10, image:"https://via.placeholder.com/150"}
  ] 
  
  return (
    <div className="App">
      {
        nft.map((nft, i) =>
      <NFTCard nft={nft} key= {i} />
      )
      }
    </div>
  );
}


export default App;
