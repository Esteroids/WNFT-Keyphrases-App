import { useState } from "react";
import { Link } from "react-router-dom";
import { useWeb3ProviderInfo } from "../../contexts/Web3Context";
import { wnftKeyphraseHash, wnftKeyphraseNormalize } from "../../wnft/WnftHash"

import { getTokenData } from "../../wnft/WnftActions";
import { Button } from "react-bootstrap";

import MintingModal from "../minting/MintingModal";
import LoadingEsteroidsIcon from "../../svgs/LoadingEsteroidsIcon";

import MintDebugDetails from "./MintDebugDetails";

import useAsync from "../../hooks/useAsync";


const SearchLoading = (props) => {
    return (<><LoadingEsteroidsIcon /><span>Querying WNFT smart contract...</span></>)
}


const MintWnftKeyphrase = (props) => {

    const web3ProviderInfo = useWeb3ProviderInfo()
    const [wnftKeyphrase, setWnftKeyphrase] = useState(''); 

    const wnftKeyphraseHashed = wnftKeyphrase && wnftKeyphraseHash(wnftKeyphrase);
    const wnftKeyphraseNormalized = wnftKeyphrase && wnftKeyphraseNormalize(wnftKeyphrase);
    const [wnftKeyphraseTaken, setWnftKeyphraseTaken] = useState(false); 

    const [showMintingModal, setShowMintingModal] = useState(false); 

    

    const handleMintingModalClose = () => {setShowMintingModal(false)}

    const handleMintingModalOpen = () => {setShowMintingModal(true)}


    const notIsContractLoaded = false;

   

    const getAllTokenData = async () => {
        const wnftHash = wnftKeyphraseHash(wnftKeyphrase)

        const resp = await getTokenData(web3ProviderInfo, wnftHash);
        
        if(resp.tokenExists){
            setWnftKeyphraseTaken(true)
        }else{
            setWnftKeyphraseTaken(false)
        } 
        
    }


    const { execute, status, error, setStatus } = useAsync(getAllTokenData, false);

    const mintWnft = (e) => {
       
        execute(); 
        e.preventDefault();
    }

    const wnftKeyphraseChange = (e) => {
        setWnftKeyphrase(e.target.value);

        setWnftKeyphraseTaken(false); 

        if (status!='idle') setStatus('idle');
    }


    return (
<>
    <div className="h2"><strong>Get keyphrases</strong></div>
    <div className="h6"><strong>Keyphrases grant you control of a space on corresponding search results pages</strong></div>

    <div className='py-3'>
        <div className="col-12  my-3">
            <form onSubmit={mintWnft} >
                
                
                <input type="text" className="form-control shadow-lg" name="token-id-to-mint" 
                id="token-id-to-mint" disabled={notIsContractLoaded ? 'disabled' : null} value={wnftKeyphrase} onChange={wnftKeyphraseChange} placeholder="Enter keyphrase to search"  />
                <div className="d-flex justify-content-end  my-2">
                    <button  className="btn btn-secondary-wnft"  disabled={notIsContractLoaded ? 'disabled' : null} >Check</button>
                </div>
            </form>
            
        </div>
        { status==='success' && wnftKeyphraseHashed && (
<>
    <div className="py-3">
        
        {status==='success' && !wnftKeyphraseTaken && (<><MintingModal show={showMintingModal} handleClose={handleMintingModalClose} wnftKeyphrase={wnftKeyphraseNormalized} ipfs={props.ipfs} /><div className="text-success h5">Available</div> {
        (web3ProviderInfo.wallet && (<Button variant="primary" onClick={handleMintingModalOpen}>Mint</Button>)) || (<><br />In order to mint you must connect to your wallet<br /></>)
        }</>)}
        {status==='success' && wnftKeyphraseTaken && (<><div className="h5"><mark><strong>"{wnftKeyphraseNormalized}"</strong></mark><svg className="h-100" width="20" height="20" version="2.0" alt="WNFT Keyphrase explained">
          <use href="#question-mark-filled" />
        </svg> WNFT Keyphrase is Taken</div><div>Search for another keyphrase or see <Link to={`/keyphrases/${wnftKeyphraseHashed}`}><strong>WNFT Keyphrase Details</strong></Link></div></>)}

    </div>
    <MintDebugDetails wnftKeyphrase={wnftKeyphrase} wnftKeyphraseNormalized={wnftKeyphraseNormalized} wnftKeyphraseHashed={wnftKeyphraseHashed} />
    
</> ) }
{ status==='loading' && (<SearchLoading />) }
       
    </div>
</>
    )
}

export default MintWnftKeyphrase;