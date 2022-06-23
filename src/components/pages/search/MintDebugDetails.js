import { useState } from "react";

import {  wnftKeyphraseNormalize } from "../../wnft/WnftHash"


const MintDebugDetails = (props) => {

    const [showDebugDetails, setShowDebugDetails] = useState(false); 


    const toggleDebugDetails = (e) => {e.preventDefault();setShowDebugDetails(!showDebugDetails);}

    return (
<div className="my-5 px-3 py-2 border rounded">
    <a href="#" onClick={toggleDebugDetails}><small className="fw-light">Debug details</small><br /></a>
    {showDebugDetails && (<>Normalized: <strong>{props.wnftKeyphraseNormalized}</strong><br />
    Normalized no stop words: <strong>{wnftKeyphraseNormalize(props.wnftKeyphrase, false)}</strong><br />
    Hash: <strong>{props.wnftKeyphraseHashed}</strong><br /></>) }
</div>
    )
}


export default MintDebugDetails;