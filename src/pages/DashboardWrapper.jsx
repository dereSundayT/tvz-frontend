import { useNavigate} from "react-router-dom";
import {inAppUrls} from "../utils/routes/routes";
import {useToast} from "@chakra-ui/react";
import {useEffect} from "react";
import {getDataFromLocalStorage} from "../utils/routes/utills";
import {Nav} from "./layout";

const DashboardWrapper = ({children,error_message}) => {
    const navigate = useNavigate()
    const toast = useToast()

    if(error_message){
        toast({
            title: 'Error',
            description: error_message,
            status: 'error',
            duration: 3000,
            isClosable: true,
        })
    }

    useEffect(() => {
        const token = getDataFromLocalStorage('token')

        if(!token){
            navigate(inAppUrls.home)
        }
    }, []);


    return(
            <>
               <Nav/>
                {/* BEGIN: Content*/}
                <div className="app-content content">
                    <div className="content-overlay" />
                    <div className="header-navbar-shadow" />
                    <div className="content-wrapper container-xxl p-0 mt-5">
                        <div className="content-header row">
                            <div className="content-header-left col-md-9 col-12 mb-2">
                                <div className="row breadcrumbs-top">
                                    <div className="col-12 mt-5">
                                        <h2 className="content-header-title float-start mb-0"></h2>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="content-body">
                            <section  className={'px-5'}>

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