import {Box, Card, CardBody, CardHeader, Heading, HStack, Stack, StackDivider, Text} from "@chakra-ui/react";
import {getRequest} from "../../utils/request";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {CodeEditor} from "../../ediitor/CodeEditor";
import SkeletonLoader from "../../components/SkeletonLoader";
import {inAppUrls} from "../../utils/routes/routes";

const UserTestDashboard = () => {
    const {id} = useParams();
    const [test, setTest] = useState([])
    const [isTestLoading, setIsTestLoading] = useState(false)

    const getTestDetails = async () => {
        setIsTestLoading(true)
        const resp = await getRequest(`user/test/${id}`, '')
        setIsTestLoading(false)
        if (resp.status) {
            setTest(resp.data)
        }
    }

    useEffect(() => {
        getTestDetails().then(r => console.log(r))
    }, []);
    return (
        <Box>
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
                            <Card height={"75vh"}>

                                <CardHeader>
                                    <Heading size='md'>{test?.description}</Heading>
                                </CardHeader>

                                <CardBody>
                                    <Text fontSize='sm'>{test.test_category}</Text>
                                    <Text fontSize='sm'>{test.question}</Text>
                                </CardBody>
                            </Card>
                    }
                </Box>

                <Box width={'70%'}>
                    <CodeEditor/>
                </Box>
            </HStack>
        </Box>
    )
}

export default UserTestDashboard