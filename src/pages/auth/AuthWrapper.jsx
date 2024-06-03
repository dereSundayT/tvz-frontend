import {useEffect} from "react";
import {getDataFromLocalStorage} from "../../utils/routes/utills";
import {Navigate, useNavigate} from "react-router-dom";
import {inAppUrls} from "../../utils/routes/routes";

const AuthWrapper = ({children}) => {
    const navigate = useNavigate()


    useEffect(() => {
        const token = getDataFromLocalStorage('token')
        if(token){
            navigate(inAppUrls.userDashboard)
        }
    }, []);

    return(
        <>
            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="header-navbar-shadow"></div>
                <div className="content-wrapper">
                    <div className="content-header row"></div>
                    <div className="content-body">
                        <div className="auth-wrapper auth-basic px-2">
                            <div className="auth-inner my-2">
                                <div className="card mb-0">
                                    <div className="card-body">
                                        <h4 className="card-title mb-1">Welcome to HankerTest! 👋</h4>
                                        <p className="card-text mb-2">
                                            Please sign-in to your account and start the adventure
                                        </p>
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AuthWrapper