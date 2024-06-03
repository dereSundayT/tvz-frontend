import {Link} from "react-router-dom";
import {inAppUrls} from "../utils/routes/routes";

const PageNotFound = () => {
    return(
        <div className={'my-5 mx-5'}>
            <h1>Page Not Found</h1>
            <Link className={'btn btn-outline-dark'} to={inAppUrls.home}>Go back Home</Link>
        </div>
    )
}

export default PageNotFound