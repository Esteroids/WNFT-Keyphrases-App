import { useParams, Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import EditPlacement from "./EditPlacement";
import PlacementPreview from "./PlacementPreview";
import { getTokenData } from "../../wnft/WnftActions";
import { useWeb3ProviderInfo } from "../../contexts/Web3Context";
import LoadingEsteroidsIcon from "../../svgs/LoadingEsteroidsIcon";

const all = require('it-all')
const { concat: uint8ArrayConcat } = require('uint8arrays/concat')


const SearchLoading = (props) => {
  return (<><LoadingEsteroidsIcon  /><span>Loading...</span></>)
}



const NoPlacementConfigured = (props) => {
  return (<>
    No placement is configured
    {props.tokenOwner==true && (<Button className="my-3 mx-4" variant="secondary" onClick={props.handleShowEdit}>Configure</Button>)} </>)
}


const PlacementView = (props) => {

  const isPlacementConfigured = props.keyphraseInfo?.placement != null

  return (
<div className="my-2">
  {props.tokenOwner==true && (<EditPlacement keyphraseRender={props.keyphraseRender} showEdit={props.showEdit} handleCloseEdit={props.handleCloseEdit} 
          changePlacementRenderInfo={props.changePlacementRenderInfo} ipfs={props.ipfs} keyphraseId={props.keyphraseId} setKeyphraseInfo={props.setKeyphraseInfo} />)}

    <div><small>Placement</small> {isPlacementConfigured && (<a href={"https://nightly.esteroids.eth.limo/#/search?term=" + encodeURIComponent(props?.keyphraseInfo?.wnftKeyphrase)} target="_blank">see it live</a>)}</div>
    <div className="border border-secondary px-3 py-3 rounded">
        { isPlacementConfigured && 
        (
<>
  <PlacementPreview keyphraseRender={props.keyphraseRender} />
  {props.tokenOwner==true && (<Button className="my-3" variant="secondary" onClick={props.handleShowEdit}>edit</Button>)}           
</>
        )}
        { (!isPlacementConfigured) && 
        ( <NoPlacementConfigured  handleShowEdit={props.handleShowEdit} tokenOwner={props.tokenOwner} /> )
        }  
  </div>
</div>)
}

const OwnerAddress = (props) => {
  return (<div className={"text-dark mx-1" + ((props.bold && "font-weight-bold") || "") }>{props.tokenData.owner}</div>)
}

const OwnerView = (props) => {
  return (
<div className="my-2 d-flex">
    Owned by {(props.tokenOwner && (<><div className="text-success font-weight-bold mx-1">Me</div> (<OwnerAddress tokenData={props.tokenData} />)</>)) || (<OwnerAddress tokenData={props.tokenData} bold={true} />)} 
</div>
  )
}

const  syntaxHighlight = (json) => {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
          if (/:$/.test(match)) {
              cls = 'key';
          } else {
              cls = 'string';
          }
      } else if (/true|false/.test(match)) {
          cls = 'boolean';
      } else if (/null/.test(match)) {
          cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
  });
}

const KeyphraseDebugDetails = (props) => {

  const [showDebugDetails, setShowDebugDetails] = useState(false); 


  const toggleDebugDetails = (e) => {e.preventDefault();setShowDebugDetails(!showDebugDetails);}

  return (
<div className="my-5 px-3 py-2 border rounded">
  <a href="#" onClick={toggleDebugDetails}><small className="fw-light">Debug details</small><br /></a>
  {showDebugDetails && (
<>TokenURI: <strong>{props.tokenData.tokenURI}</strong><br />
  Offline metadata: <pre dangerouslySetInnerHTML={{__html: syntaxHighlight(JSON.stringify(props.keyphraseInfo, undefined, 4))}}></pre><br />

</>) }
</div>
  )
}


export default function KeyphraseView(props) {
    let params = useParams();

    const [showEdit, setShowEdit] = useState(false);
    const [tokenData, setTokenData] = useState({});
    const [loaded, setLoaded] = useState(false);


    const [keyphraseInfo, setKeyphraseInfo] = useState({})
    const keyphraseRender = keyphraseInfo?.placement?.renderInfo || {};

    const web3ProviderInfo = useWeb3ProviderInfo()


    const tokenOwner = tokenData?.owner && web3ProviderInfo.wallet && tokenData.owner==web3ProviderInfo.wallet


    const handleShowEdit = () => setShowEdit(true);
    const handleCloseEdit = () => setShowEdit(false);

    const changePlacementRenderInfo = (renderInfo) => {
      const newKeyphraseInfo = JSON.parse(JSON.stringify(keyphraseInfo));
      const oldPlacementInfo = newKeyphraseInfo?.placement || {};
      newKeyphraseInfo.placement = {...oldPlacementInfo, "renderInfo": renderInfo};
      return newKeyphraseInfo;
    }

    useEffect(() =>{
      if (web3ProviderInfo.active && props.isIpfsReady){
        setLoaded(false);
        setTokenData(false);
        setShowEdit(false);
        setKeyphraseInfo({});

        getTokenData(web3ProviderInfo, params.keyphraseId).then(async (resp) => {
          
          setTokenData(resp)
          const cid = resp.tokenURI.substr(7);
          const file_txt = new TextDecoder().decode(uint8ArrayConcat(await all(props.ipfs.cat(cid))));
          // .then((resp_body) => {
          //   console.log(resp_body)
          // })
          setKeyphraseInfo(JSON.parse(file_txt))
          setLoaded(true);
        })
      }
    }, [params.keyphraseId, web3ProviderInfo.active, props.isIpfsReady])
    

   
    return (
<div>
  {!loaded && ( <div className="d-flex justify-content-center"><SearchLoading /></div> )}
  {loaded && (
<>
  <div className="mb-4"><Link to="/">&#8592; Back</Link></div>
  <div className="h3 d-flex text-dark">WNFT Keypharse "<div className="font-weight-bold">{keyphraseInfo.wnftKeyphrase}</div>"</div>
  <PlacementView  handleShowEdit={handleShowEdit} tokenOwner={tokenOwner} keyphraseInfo={keyphraseInfo} keyphraseRender={keyphraseRender}
  changePlacementRenderInfo={changePlacementRenderInfo} ipfs={props.ipfs} showEdit={showEdit} handleCloseEdit={handleCloseEdit} keyphraseId={params.keyphraseId} setKeyphraseInfo={setKeyphraseInfo} />
  <OwnerView tokenData={tokenData} tokenOwner={tokenOwner} />
  <KeyphraseDebugDetails tokenData={tokenData} keyphraseInfo={keyphraseInfo}/>
</>
  )}
</div>
    );
  }