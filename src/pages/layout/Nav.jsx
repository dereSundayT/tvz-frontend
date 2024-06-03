import {Link, useNavigate} from "react-router-dom";
import {inAppUrls} from "../../utils/routes/routes";

const Nav = () => {
    const navigate = useNavigate();
    const logOut = () => {
        localStorage.clear();
        navigate(inAppUrls.home)
    }
    return(
        <>
            <div className="horizontal-menu-wrapper">
                <div
                    className="header-navbar navbar-expand-sm navbar navbar-horizontal floating-nav navbar-dark navbar-shadow menu-border container-xxl"
                    role="navigation"
                    data-menu="menu-wrapper"
                    data-menu-type="floating-nav"
                >
                    <div className="navbar-header"></div>
                    <div className="shadow-bottom" />
                    {/* Horizontal menu content*/}
                    <div className="navbar-container main-menu-content" data-menu="menu-container">
                        <ul
                            className="nav navbar-nav"
                            id="main-menu-navigation"
                            data-menu="menu-navigation"
                        >
                            <li className="nav-item" data-menu="dropdown">
                                <Link className="nav-link d-flex align-items-center" to={inAppUrls.userDashboard}>
                                    <span data-i18n="Dashboards">Home</span>
                                </Link>
                            </li>

                            <li className="nav-item" data-menu="dropdown">
                                <Link className="nav-link d-flex align-items-center" to={inAppUrls.userProfile}>
                                    <span data-i18n="Dashboards">My Profile</span>
                                </Link>
                            </li>

                            <li className="nav-item" data-menu="dropdown">
                                <Link className="nav-link d-flex align-items-center" to={'#'} onClick={()=>logOut()}>
                                    <span data-i18n="Dashboards">Logout</span>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Nav