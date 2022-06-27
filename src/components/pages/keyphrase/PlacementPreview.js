import { getValidUrl } from "../../utils/url"

const ImagePreview = (props) =>{
    return (
<img className="card-img WNFT-placement-preview-img" src={props.imgSrc} alt="" />
)
}


const LinkedPreview = (props) => {

    const cleanedUrl = getValidUrl(props.link)
    return (
<a href={cleanedUrl} target="_blank">
    <ImagePreview imgSrc={props.imgSrc} />
</a>
    )
}

const PlacementPreview = (props) => {

    const previewType = (props.keyphraseRender.link && 'LinkedPreview') || 'ImagePreview'

    return (
<div className="WNFT-placement-preview d-flex flex-column justify-content-center align-items-center">
    {previewType==='LinkedPreview' && (<LinkedPreview imgSrc={props.keyphraseRender.imgSrc} link={props.keyphraseRender.link} />)}
    {previewType==='ImagePreview' && (<ImagePreview imgSrc={props.keyphraseRender.imgSrc}  />)}
</div>
    )
}

export default PlacementPreview;