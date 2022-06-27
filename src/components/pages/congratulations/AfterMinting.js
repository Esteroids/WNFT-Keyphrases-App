import { useNavigate, useParams } from "react-router-dom";

 
 const AfterMinting = (props) => {

    let navigate = useNavigate();
    let params = useParams();



    return (
<div className="d-flex  flex-column">
    <div className="h2 congrats-headline d-flex justify-content-center font-weight-bold">Congratulations!</div>
    <div className="font-weight-bold m-4 d-flex justify-content-center">You just became an Esterodian. Do you feel any different?</div>
    <div className="mt-1 mb-3 px-4">
        <div className="m-2">Well, you SHOULD feel different. You just got yourself a piece of esteroids.eth. You just became part of the future web. </div>

		<div className="m-2">We imagine a futuristic web of community platforms. These platforms are going to be for the people, and owned by the people. We imagine esteroids.eth as a community search engine. We want people to have part of it; to have a saying on decisions in it. To be partial owners of it.</div>

		<div className="m-2">So yes, you didn't just got yourself a keyphrase; you also became a pioneer of the future web.</div>

		<div className="m-2">Welcome to the future web; hold tight; it's gonna be an exciting ride. </div>
    </div>
    <div className="d-flex justify-content-center">
        <button  className="btn btn-secondary-wnft" onClick={() => navigate(`/keyphrases/${params.keyphraseId}`,{replace: true})} >Edit My Keyphrase</button>
    </div>
</div>
        ) 
}

export default AfterMinting;