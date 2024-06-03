import {Link} from "react-router-dom";
import {inAppUrls} from "../../utils/routes/routes";

const CompletedTestComponent = ({data}) =>{
    return(
        <div className={'mt-5'}>
            <h5>Completed Test(s)</h5>
        {data.map((test,key=0)=> (
            <div key={key} class="card mb-4">
                <div className="card-body">
                    <h4 className="card-title"> {test.test.description}</h4>
                    <div className="card-subtitle text-muted mb-1">{test.test.test_category}</div>
                    <p className="card-text">
                        {test.test.question}
                    </p>
                    <span className=" btn btn-outline-primary">No of Attempts :  {test.user_test_details.length}</span>
                    <a href="#" className="card-link">Another link</a>
                </div>
            </div>
        ))}


        </div>
    )
}

export default CompletedTestComponent