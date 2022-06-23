
const placementPreviewImg = require("../../../images/placement/preview.jpg")

const PlacementPreview = (props) => {
    return (
<div className="WNFT-placement-preview d-flex flex-column justify-content-center align-items-center">
    <a href={props.keyphraseRender.link} target="_blank">
        <img className="card-img WNFT-placement-preview-img" src={props.keyphraseRender.imgSrc} alt="" />
    </a>
</div>
    )
}

export default PlacementPreview;