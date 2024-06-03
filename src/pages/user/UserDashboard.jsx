import {HStack} from "@chakra-ui/react";
import {TestListingComponent} from "../../components/test";
import {getRequest} from "../../utils/request";
import {useEffect, useState} from "react";
import {getDataFromLocalStorage} from "../../utils/routes/utills";

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
        <div className={'p-4'}>
            <div>
                <TestListingComponent data={tests}/>
            </div>
        </div>
    )
}

export default UserDashboard