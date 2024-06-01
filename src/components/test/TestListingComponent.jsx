import {Link} from "react-router-dom";
import {inAppUrls} from "../../utils/routes/routes";


const TestListingComponent = ({data}) => {
    return(
        <div className={''}>
            {data.length>0 ?
                data.map((test,key=0)=> (
                <div key={key} className="card  shadow-sm mb-3  py-3" style={{width: "25rem"}}>
                    <div className="card-body">
                        <h4 className="card-title">{test.description}</h4>
                        <p className="card-text">Test Category: {test.test_category}</p>
                        <Link to={`${inAppUrls.userTestDashboard_}/${test.id}`} className="btn btn-success text-white ">Solve Challenge</Link>
                    </div>
                </div>
                ))
                :
                <>Loading</>
            }
        </div>
    )
}


export default TestListingComponent