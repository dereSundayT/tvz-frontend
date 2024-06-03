import {Box, Card, CardBody, CardHeader, Heading, HStack, Stack, StackDivider, Text} from "@chakra-ui/react";
import {getRequest} from "../../utils/request";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {CodeEditor} from "../../ediitor/CodeEditor";
import SkeletonLoader from "../../components/SkeletonLoader";
import {inAppUrls} from "../../utils/routes/routes";
import {getDataFromLocalStorage} from "../../utils/routes/utills";
import DashboardWrapper from "../DashboardWrapper";

const UserTestDashboard = () => {
    const {id} = useParams();
    const [test, setTest] = useState([])
    const [isTestLoading, setIsTestLoading] = useState(false)

    const getTestDetails = async () => {
        const token = await getDataFromLocalStorage('token')
        setIsTestLoading(true)
        const resp = await getRequest(`user/test/${id}`, token)
        setIsTestLoading(false)
        if (resp.status) {
            setTest(resp.data)
        }
    }

    useEffect(() => {
        getTestDetails().then(r => console.log(r))
    }, []);
    return (
        <DashboardWrapper>
            <div className={'row mt-5'}>
                <div className={'col-4'}>
                    <div className={''}>
                        <div className={'mb-5'}>
                            <h2>Test:</h2>
                            <h6></h6>
                        </div>

                        {
                            isTestLoading
                                ?
                                <SkeletonLoader/>
                                :
                                <div className={'card'}>
                                    <div  className={''}>
                                        <div className={'card-header'}>{test?.description}</div>
                                        <div  className={'card-body'}>
                                            <Text fontSize='sm'>{test.test_category}</Text>
                                            <Text fontSize='sm'>{test.question}</Text>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>

                </div>

                <div className={'col-8'}>
                    <CodeEditor test_id={id}/>
                </div>
            </div>
        </DashboardWrapper>
    )
}

export default UserTestDashboard