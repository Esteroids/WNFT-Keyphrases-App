import { useState } from "react";
import { Link } from "react-router-dom";
import { useWeb3ProviderInfo } from "../../contexts/Web3Context";
import { wnftKeyphraseHash, wnftKeyphraseNormalize } from "../../wnft/WnftHash"

import { getTokenData } from "../../wnft/WnftActions";
import { Button } from "react-bootstrap";

import MintingModal from "../minting/MintingModal";
import LoadingIcon from "../../svgs/LoadingIcon";

import MintDebugDetails from "./MintDebugDetails";

import useAsync from "../../hooks/useAsync";


const SearchLoading = (props) => {
    return (<><LoadingIcon className='loading-icon-svg' width={50} height={50} stroke="gray" /><span>Querying WNFT smart contract...</span></>)
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

    const mintWnft = (e) => {
        e.preventDefault();
        execute(); 
    }

    const getAllTokenData = async () => {
        const wnftHash = wnftKeyphraseHash(wnftKeyphrase)

        getTokenData(web3ProviderInfo, wnftHash).then((resp)=>{ 

            if(resp.tokenExists){
                setWnftKeyphraseTaken(true)
            }else{
                setWnftKeyphraseTaken(false)
            } 
            setStatus('done');
        })
    }


    const { execute, status, value, error, setStatus } = useAsync(getAllTokenData, false);

    const wnftKeyphraseChange = (e) => {
        setWnftKeyphrase(e.target.value);

        setWnftKeyphraseTaken(false); 
        setStatus('idle');
    }


    return (
<>
    <div className="h2"><strong>Get keywords</strong></div>
    <div className="h6"><strong>Keywords grant you result of search results pages</strong></div>

    <div className='py-3'>
        <div className="col-12  my-3">
            <form onSubmit={mintWnft} >
                
                
                <input type="text" className="form-control shadow-lg" name="token-id-to-mint" 
                id="token-id-to-mint" disabled={notIsContractLoaded ? 'disabled' : null} value={wnftKeyphrase} onChange={wnftKeyphraseChange} placeholder="Enter search phrase"  />
                <div className="d-flex justify-content-end  my-2">
                    <button  className="btn btn-secondary-wnft"  disabled={notIsContractLoaded ? 'disabled' : null} >Check</button>
                </div>
            </form>
            
        </div>
        { status=='done' && wnftKeyphraseHashed && (
<>
    <div className="py-3">
        
        {status=='done' && !wnftKeyphraseTaken && (<><MintingModal show={showMintingModal} handleClose={handleMintingModalClose} wnftKeyphrase={wnftKeyphraseNormalized} ipfs={props.ipfs} /><div className="text-success h5">Available</div> {
        (web3ProviderInfo.wallet && (<Button variant="primary" onClick={handleMintingModalOpen}>Mint</Button>)) || (<><br />In order to mint you must connect to your wallet<br /></>)
        }</>)}
        {status=='done' && wnftKeyphraseTaken && (<><div className="h5"><mark><strong>"{wnftKeyphraseNormalized}"</strong></mark><svg className="h-100" width="20" height="20" version="2.0" alt="WNFT Keyphrase explained">
          <use href="#question-mark-filled" />
        </svg> WNFT Keyphrase is Taken</div><div>Search for another keyphrase or see <Link to={`/keyphrases/${wnftKeyphraseHashed}`}><strong>WNFT Keyphrase Details</strong></Link></div></>)}

    </div>
    <MintDebugDetails wnftKeyphrase={wnftKeyphrase} wnftKeyphraseNormalized={wnftKeyphraseNormalized} wnftKeyphraseHashed={wnftKeyphraseHashed} />
    
</> ) }
{ status=='loading' && (<SearchLoading />) }
       
    </div>
</>
    )
}

export default MintWnftKeyphrase;