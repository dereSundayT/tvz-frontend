import {HStack} from "@chakra-ui/react";
import {CompletedTestComponent, TestListingComponent} from "../../components/test";
import {getRequest} from "../../utils/request";
import {useEffect, useState} from "react";
import {getDataFromLocalStorage} from "../../utils/routes/utills";
import DashboardWrapper from "../DashboardWrapper";

const UserDashboard = () => {
    const [isLoading,setIsLoading] = useState(false)
    const [tests, setTest]  = useState([])
    const [attempted_tests, setAttemptedTests]  = useState([])

    const getTestForUser = async () => {
        try{
            setIsLoading(true)
            const token = getDataFromLocalStorage('token')
            const resp =  await getRequest('user/tests', token)
            setIsLoading(false)
            if(resp.status){
                setTest(resp?.data?.tests??[])
                setAttemptedTests(resp?.data?.attempted_tests??[])
            }
        }catch (e) {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getTestForUser().then(r => console.log(r))
    }, []);

    return (
        <DashboardWrapper>
            <div className={'row'}>
                <div className={'col-6'}>
                    <TestListingComponent data={tests} isLoading={isLoading}/>
                </div>
                <div className={'col-6'}>
                    <CompletedTestComponent data={attempted_tests} isLoading={isLoading} />
                </div>
            </div>
        </DashboardWrapper>
    )
}

export default UserDashboard