import {Link} from "react-router-dom";
import {inAppUrls} from "../../utils/routes/routes";
import SkeletonLoader from "../SkeletonLoader";

const CompletedTestComponent = ({data, isLoading}) => {
    return (
        <div className={'mt-5'}>
            <h5>Completed Test(s)</h5>
            {
                isLoading ?
                    <>
                        <SkeletonLoader/>
                        <SkeletonLoader/>
                        <SkeletonLoader/>
                    </>
                    :
                    <>
                        { data.length> 0 ?data.map((test, key = 0) => (
                            <div key={key} className="card mb-4">
                                <div className="card-body">
                                    <h4 className="card-title"> {test.test.description}</h4>
                                    <div className="card-subtitle text-muted mb-1">{test?.test?.test_category}</div>
                                    <p className="card-text">
                                        {test?.test?.question}
                                    </p>
                                    <span className="btn-sm btn btn-outline-primary mr-5">No of Attempts : {test?.user_test_details?.length}</span>
                                    &nbsp;
                                    <span className={`btn-sm btn btn-outline-${test.user_test_details[0].status==='Accepted'?'success':'danger'}`}>
                                        Result : {test.user_test_details[0].status}
                                    </span>
                                    &nbsp;
                                    {/*<Link to={`${inAppUrls.userTestDashboard_}/${test.test_id}`} className={`btn btn-outline-dark btn-sm`}>View Details</Link>*/}
                                </div>
                            </div>
                        ))
                        :
                            <>
                                <hr/>
                                <p>To are yet to complete any test</p>
                            </>

                        }


                    </>

            }

        </div>
    )
}

export default CompletedTestComponent