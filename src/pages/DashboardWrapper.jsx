import {Link} from "react-router-dom";
import {inAppUrls} from "../utils/routes/routes";

const DashboardWrapper = ({children}) => {
    return(
            <>
                {/* BEGIN: Main Menu*/}

                {/* END: Main Menu*/}

                {/* BEGIN: Content*/}
                <div className="app-content content ">
                    <div className="content-overlay" />
                    <div className="header-navbar-shadow" />
                    <div className="content-wrapper container-xxl p-0">
                        <div className="content-header row"></div>
                        <div className="content-body mt-5">
                            <section className={' px-5'}>
                                <hr/>
                                {children}
                            </section>



                        </div>
                    </div>
                </div>
                {/* END: Content*/}
                <div className="sidenav-overlay" />
                <div className="drag-target" />
            </>





    )
}

export default DashboardWrapper