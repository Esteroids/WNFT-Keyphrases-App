import { useNavigate, useParams } from "react-router-dom";

 
 const AfterMinting = (props) => {

    let navigate = useNavigate();
    let params = useParams();



    return (
<div className="d-flex justify-content-center flex-column">
    <h3 className="congrats-headline">Congratulations!</h3>
    <div className="font-weight-bold m-2">You just joined the Esteroids family. What's next?</div>
    <div className="m-2">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</div>
    <div><button  className="btn btn-secondary-wnft" onClick={() => navigate(`/keyphrases/${params.keyphraseId}`,{replace: true})} >Edit My Keyphrase</button></div>
</div>
        ) 
}

export default AfterMinting;