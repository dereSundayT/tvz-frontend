import {
    Box,
    Button,
    CircularProgress,
    Spinner, Table,
    TableCaption,
    TableContainer, Tbody, Td,
    Text, Th,
    Thead, Tr,
    useToast
} from "@chakra-ui/react";
import {compileCode} from "../utils/request";

const CodeOutput = ({editorRef, language, handleLoading, isLoading}) => {
    const toast = useToast()


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
                console.log(resp.data.status.id===3)
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

    return (
        <>
            <Text mb={2} fontSize={'lg'}>Output</Text>
            {isLoading
                ?
                <Spinner color='red.500'/>
                :
                <Button variant={'outline'} colorScheme={'green'} mb={4} onClick={handleRunCode}> Run Code</Button>
            }
            <Button variant={'outline'} colorScheme={'primary'} float={'right'} mb={4} onClick={handleRunCode}> Submit Code </Button>


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