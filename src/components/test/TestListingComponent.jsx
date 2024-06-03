import {Link} from "react-router-dom";
import {inAppUrls} from "../../utils/routes/routes";
import SkeletonLoader from "../SkeletonLoader";


const TestListingComponent = ({data}) => {
    return(
        <div className={''}>
            {data.length>0 ?
                data.map((test,key=0)=> (
                        <div key={key} className="card mb-1">
                            <div className="card-body">
                                <h4 className="card-title">{test.description}</h4>
                                <div className="card-subtitle text-muted mb-1">Test Category: {test.test_category}</div>
                                <p className="card-text">{test.question}</p>
                                <Link to={`${inAppUrls.userTestDashboard_}/${test.id}`} className="btn btn-success text-white ">Solve Challenge</Link>
                            </div>
                        </div>

                ))
                :
                <>
                <SkeletonLoader/>
                <SkeletonLoader/>
                <SkeletonLoader/>
                </>
            }
        </div>
    )
}


export default TestListingComponent