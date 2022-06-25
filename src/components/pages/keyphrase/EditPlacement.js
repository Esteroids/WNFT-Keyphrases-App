import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ImageUploading from "react-images-uploading";
import { useState, useEffect } from 'react';
import UpdatingWnft from '../../data/UpdatingWnft';
import { getImageSize } from '../../utils/image';

const IMAGE_WIDTH = 322
const IMAGE_HEIGHT_MIN = 200

const EditPlacement = (props) => {

    const [placementImage, setPlacementImage] = useState(props.keyphraseRender?.imgSrc || '');
    const [placementLink, setPlacementLink] = useState(props.keyphraseRender?.link || '');
    const [images, setImages] = useState([]);
    const [showUpdating, setShowUpdating] = useState(false);


    const [updateInfo, setUpdateInfo] = useState(null);

    useEffect(() => {
      if ((props.keyphraseRender?.imgSrc || '') != placementImage)
        setPlacementImage(props.keyphraseRender?.imgSrc || '')
      if ((props.keyphraseRender?.link || '') != placementLink)
        setPlacementLink(props.keyphraseRender?.link || '')

      setUpdateInfo(null)
      setShowUpdating(false)
    }, [props.keyphraseId])


    const handleCloseUpdating = () => {props.changePlacementRenderInfo(updateInfo);setShowUpdating(false);};


    const onChangeLink = (e) => {setPlacementLink(e.target.value);}


    const maxNumber = 1;
    const onImageChange = (imageList, addUpdateIndex) => {
        console.log(imageList)
    // data for submit
        if (imageList.length){
            getImageSize(imageList[addUpdateIndex].file).then((resp) => {
              if (resp.width == IMAGE_WIDTH && resp.height >= IMAGE_HEIGHT_MIN){
                setPlacementImage(imageList[addUpdateIndex].data_url);
                console.log(imageList[addUpdateIndex])
                setImages(imageList);
              }else{
                console.error('Size is not valid', resp)
              }
            })
            
        }
        
    };

    const onSave = () => {
      const renderInfo = {link: placementLink, imgSrc: placementImage}
      setUpdateInfo(props.changePlacementRenderInfo(renderInfo));
      props.handleCloseEdit();
      setShowUpdating(true);
 
    }

    
  
    return (  
<>
  <UpdatingWnft show={showUpdating} handleClose={handleCloseUpdating} updateInfo={updateInfo} ipfs={props.ipfs} newToken={props.newToken} />
      
  <Modal size="lg" show={props.showEdit} onHide={props.handleCloseEdit}>
      <Modal.Header closeButton>
          <Modal.Title>Edit my placement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <div>
      <label htmlFor="placement-img-url" className="form-label">Image</label>
      <div className="input-group">

      <div className='d-flex flex-column'>
      {placementImage && (<img src={placementImage} className="WNFT-placement-preview-img border" />)}
      {!placementImage && ("No image")}
      <ImageUploading
          multiple={false}
          value={images}
          onChange={onImageChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageUpdate,
            isDragging,
            dragProps
          }) => (
            // write your building UI
            <div className="upload__image-wrapper p-2">
              <Button variant="secondary"
                style={isDragging ? { color: "red" } : null}
                onClick={() => {if(imageList.length>0){ onImageUpdate(0)}else{ onImageUpload(); }}}
                {...dragProps}
              >
              Upload image
              </Button>
              &nbsp;

            </div>
          )}
        </ImageUploading>
        </div>
      </div>
      <label htmlFor="placement-link" className="form-label">Link</label>
      <div className="input-group">

      <input type="text" className="form-control shadow-lg rounded" name="placement-link" 
      id="placement-link" placeholder="link when clicked" value={placementLink}  onChange={onChangeLink} />
      </div>
  </div></Modal.Body>
      <Modal.Footer>
      <Button variant="warning" onClick={props.handleCloseEdit}>
          Close
      </Button>
  
      <Button variant="primary" onClick={onSave}>
          Save Changes
      </Button>
      </Modal.Footer>
  </Modal>
</>    
    );
  }


export default EditPlacement;