import { useEffect, useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { mintToken, setTokenURI } from '../wnft/WnftActions';
import { useWeb3ProviderInfo } from '../contexts/Web3Context';
import { wnftKeyphraseHash } from '../wnft/WnftHash';
import CheckIcon from '../svgs/CheckIcon';
import LoadingIcon from '../svgs/LoadingIcon';




const UpdatingWnftIpfsAdding = (props) => {

    return (
        <>
        {(props.updatingStage=="ipfs-adding" && (<><LoadingIcon className='loading-icon-svg' width={20} height={20} />Adding to IPFS...</>)) || 
        (<><CheckIcon width={20} height={20} fill="tomato" />Added to IPFS</>) }
        </>
    )
}

const UpdatingWnftOfflineContent = (props) => {

    return (
        <>
        {(props.updatingStage=="ipfs-adding" && (<><LoadingIcon width={20} height={20} stroke="gray"/>Changing WNFT offline content...<br/></>)) || 
        (props.updatingStage=="wnft-updating" && (<><LoadingIcon className='loading-icon-svg' width={20} height={20} />Changing WNFT offline content...</>)) ||
        (props.updatingStage=="done" && (<><CheckIcon fill="tomato" width={20} height={20} />WNFT contract updated</>))
        }
        </>
    )
}


const UpdatingWnft = (props) => {

    const [updatingStage, setUpdatingStage] = useState("ipfs-adding")
    const web3ProviderInfo = useWeb3ProviderInfo()

    useEffect(() => {
        if (props.show){
            console.log(props.updateInfo);
            const wnftKeyphraseHashId = wnftKeyphraseHash(props.updateInfo.wnftKeyphrase);
            props.ipfs.add(JSON.stringify(props.updateInfo)).then((cid) => {
                console.log(cid)
                setUpdatingStage('wnft-updating')
                if (props.newToken){
                    mintToken(web3ProviderInfo, wnftKeyphraseHashId, 'ipfs://' + cid.path, true, 1).then(() => {
                        setUpdatingStage('done')
                    })
                }else{
                    setTokenURI(web3ProviderInfo, wnftKeyphraseHashId, 'ipfs://' + cid.path).then(() => {
                        setUpdatingStage('done')
                    })
                }
                
            });
        }
    }, [props.show, props.updateInfo])


  return (

    <Modal size="lg" backdrop={((updatingStage!='done') && "static") || true}
    keyboard={(updatingStage!='done')} show={props.show} onHide={props.handleClose}>
  <Modal.Header >
      <Modal.Title>Updating placement</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div >
      <UpdatingWnftIpfsAdding updatingStage={updatingStage} /><br/>
      <UpdatingWnftOfflineContent updatingStage={updatingStage} /><br/>

    </div>
  </Modal.Body>
  { (updatingStage=='done') && (
  <Modal.Footer>
      <Button  onClick={props.handleClose}>
          Close
      </Button>
      </Modal.Footer>)}
</Modal>
)
}

export default UpdatingWnft;
