import {HStack} from "@chakra-ui/react";
import {TestListingComponent} from "../../components/test";
import {getRequest} from "../../utils/request";
import {useEffect, useState} from "react";

const UserDashboard = () => {
    const [tests, setTest]  = useState([])

    const getTestForUser = async () => {
        const resp =  await getRequest('user/tests',
            '')
        if(resp.status){
            setTest(resp.data)
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