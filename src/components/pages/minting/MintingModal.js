import Modal from 'react-bootstrap/Modal';
import UpdatingWnft from '../../data/UpdatingWnft';
import { useState } from 'react';
import { wnftKeyphraseHash } from '../../wnft/WnftHash';
import EditPlacement from '../keyphrase/EditPlacement';


const getOfflineMetadata = (keyphrase) => {
    return {
        "wnftKeyphrase": keyphrase,
        "placement": null
    }
}

const MintingModal = (props) => {

    const [showUpdating, setShowUpdating] = useState(false);
    const handleCloseUpdating = () => setShowUpdating(false);

    
    const keyphraseInfo = getOfflineMetadata(props.wnftKeyphrase)
    const wnftKeyphraseHashId = wnftKeyphraseHash(props.wnftKeyphrase)

    const [showEdit, setShowEdit] = useState(false);

    const handleShowEdit = () => {setShowEdit(true);props.handleClose();}
    const handleCloseEdit = () => setShowEdit(false);

    const keyphraseRender = keyphraseInfo?.placement?.renderInfo || {};



    const changePlacementRenderInfo = (renderInfo) => {
        const newKeyphraseInfo = JSON.parse(JSON.stringify(keyphraseInfo));
        const oldPlacementInfo = newKeyphraseInfo?.placement || {};
        newKeyphraseInfo.placement = {"renderInfo": renderInfo, ...oldPlacementInfo};
        return newKeyphraseInfo;
      }



    const mintKeyphrase = () => {setShowUpdating(true);props.handleClose();}
    return (
<>
    <UpdatingWnft show={showUpdating} handleClose={handleCloseUpdating} updateInfo={keyphraseInfo} ipfs={props.ipfs} wnftKeyphraseHashId={wnftKeyphraseHashId} newToken={true} />
    <EditPlacement keyphraseRender={keyphraseRender} showEdit={showEdit} handleCloseEdit={handleCloseEdit} 
        changePlacementRenderInfo={changePlacementRenderInfo} ipfs={props.ipfs} newToken={true} keyphraseId={wnftKeyphraseHashId} />
    <Modal size="lg" show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Mint Keypharse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='d-flex flex-column '>
                <div><a href="#" onClick={mintKeyphrase}>Mint with an Empty Placement</a></div>
                <div className='circle-with-text justify-content-center'><strong>OR</strong></div>
                <div><a href="#"  onClick={handleShowEdit}>Configure Placement & Mint</a></div>
            </div>
        </Modal.Body>
    </Modal>
</>)

}


export default MintingModal;