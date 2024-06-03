import {
    Box,
    Button,
    Spinner, Table,
    TableContainer, Tbody, Td,
    Text, Th,
    Thead, Tr,
    useToast
} from "@chakra-ui/react";
import {compileCode, postRequest} from "../utils/request";
import {getDataFromLocalStorage} from "../utils/routes/utills";
import {useState} from "react";

const CodeOutput = ({editorRef, language, handleLoading, isLoading,test_id}) => {
    const toast = useToast()
    const [testToken, setTestToken] = useState('')
    const [sourceCode, setSourceCode] = useState('')


    /**
     * A function to handle running the code.
     * @return {Promise<void>}
     */
    const handleRunCode = async () => {
        //get the source code from the editor
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;
        //
        try {
            handleLoading(true)
            const resp = await compileCode(language, sourceCode)
            handleLoading(false)
            if (resp.status) {
                setTestToken(resp.data.token)
                setSourceCode(sourceCode)
                toast({
                    title: 'Code compiled successfully.',
                    description: `you can see the output in the output tab.`,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            }
        } catch (e) {
            console.log(e)
            handleLoading(false)
        }

    }


    const handleSubmit = async () => {
        const token = await getDataFromLocalStorage('token')
        try{
            handleLoading(true)
            const resp = await postRequest(
                `user/test/${test_id}`,
                {user_submission:sourceCode,token:testToken},
                token
            )
            handleLoading(false)
            if (resp.status) {
                toast({
                    title: 'Successfully submitted.',
                    description: `you test was successfully submitted.`,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            }
        }catch (e) {
            handleLoading(false)
        }

    }

    return (
        <>
            <Text mb={2} fontSize={'lg'}>Output</Text>
            {isLoading
                ?
                <Spinner color='red.500'/>
                :
                <Button variant={'outline'} colorScheme={'green'} mb={4} onClick={handleRunCode}> Run Code</Button>
            }

            {isLoading
                ?
                <Spinner color='red.500'/>
                :
                <Button variant={'outline'} colorScheme={'primary'} float={'right'} mb={4} onClick={handleSubmit}> Submit Code </Button>
            }



            <Box
                height={'75vh'}
                p={2}
                border={'1px solid'}
                borderRadius={4}
                borderColor={'#333'}>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th> </Th>
                                <Th> </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Status</Td>
                                <Td>millimetres (mm)</Td>

                            </Tr>
                            <Tr>
                                <Td>time</Td>
                                <Td>centimetres (cm)</Td>
                            </Tr>
                            <Tr>
                                <Td>memory</Td>
                                <Td>metres (m)</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>

            </Box>
        </>
    )
}

export default CodeOutput