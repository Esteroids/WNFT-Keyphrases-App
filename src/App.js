import "./css/bevellier.css"
import "./css/alpino.css"

import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/main.css";

import Svgs from "./components/svgs/Svgs"
import Header from "./components/header/Header";
import { Route, Routes, Outlet } from "react-router-dom";
import MintWnftKeyphrase from "./components/pages/search/MintWnftKeyphrase";
import KeyphraseView from "./components/pages/keyphrase/KeyphraseView";
import useIpfsFactory from "./components/hooks/useIpfsFactory"



const MainLayout = () => {
  return (<><Outlet /></>)
  
}


function App() {


  const { ipfs, ipfsInitError, isIpfsReady } = useIpfsFactory()

  return (
<>

  <Svgs />
  <div className="container">
      <Header />
  </div>
  <div className="container main-content p-4 rounded shadow-lg col-5">
    <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index path="/"  element={<MintWnftKeyphrase ipfs={ipfs} />} />
          <Route path="mint"  element={<MintWnftKeyphrase ipfs={ipfs} />} />
          <Route path="keyphrases" element={<KeyphraseView ipfs={ipfs} isIpfsReady={isIpfsReady} />}>
            <Route path=":keyphraseId" element={<KeyphraseView ipfs={ipfs} isIpfsReady={isIpfsReady} />} />
          </Route>
        </Route>


    </Routes>
  </div>
  <div className="bg-top"> </div>
</>
  );
}

export default App;
