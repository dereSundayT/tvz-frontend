import {Link} from "react-router-dom";
import {inAppUrls} from "../../utils/routes/routes";

const CompletedTestComponent = ({data}) =>{
    return(
        <div className={'mt-5'}>
            <h5>Completed Test(s)</h5>
        {data.map((test,key=0)=> (
            <div key={key} class="card mb-4">
                <div className="card-body">
                    <h4 className="card-title">Card title</h4>
                    <div className="card-subtitle text-muted mb-1">Card subtitle</div>
                    <p className="card-text">
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                    <a href="#" className="card-link">Card link</a>
                    <a href="#" className="card-link">Another link</a>
                </div>
            </div>
        ))}


        </div>
    )
}

export default CompletedTestComponent