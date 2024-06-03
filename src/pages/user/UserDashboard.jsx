import {HStack} from "@chakra-ui/react";
import {TestListingComponent} from "../../components/test";
import {getRequest} from "../../utils/request";
import {useEffect, useState} from "react";
import {getDataFromLocalStorage} from "../../utils/routes/utills";
import DashboardWrapper from "../DashboardWrapper";

const UserDashboard = () => {
    const [tests, setTest]  = useState([])
    const [attempted_tests, setAttemptedTests]  = useState([])

    const getTestForUser = async () => {
        const token = getDataFromLocalStorage('token')
        const resp =  await getRequest('user/tests', token)

        if(resp.status){
            setTest(resp.data.tests)
            setAttemptedTests(resp.data?.attempted_tests??[])
        }
    }

    useEffect(() => {
        getTestForUser().then(r => console.log(r))
    }, []);
    return (
        <DashboardWrapper>
            <div className={'row'}>
                <div className={'col-6'}>
                    <TestListingComponent data={tests}/>
                </div>
                <div className={'col-6'}>
                 <h1>Attempted Tests</h1>
                </div>
            </div>
        </DashboardWrapper>
    )
}

export default UserDashboard