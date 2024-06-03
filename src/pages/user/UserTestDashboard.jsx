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
            <HStack spacing={4}>
                <Box width={'30%'}>
                    <Box mb={4}>
                        <Text mb={2} fontSize={'lg'} color={'#FFF'}>Test:</Text>
                        <Link to={inAppUrls.userDashboard} mb={2} color={'#FFF'}>&nbsp; Go back</Link>
                    </Box>

                    {
                        isTestLoading
                            ?
                            <SkeletonLoader/>
                            :
                            <div >

                                <div>
                                    <Heading size='md'>{test?.description}</Heading>
                                </div>

                                <div>
                                    <Text fontSize='sm'>{test.test_category}</Text>
                                    <Text fontSize='sm'>{test.question}</Text>
                                </div>
                            </div>
                    }
                </Box>

                <Box width={'70%'}>
                    <CodeEditor test_id={id}/>
                </Box>
            </HStack>
        </DashboardWrapper>
    )
}

export default UserTestDashboard