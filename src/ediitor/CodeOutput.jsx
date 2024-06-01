import {Box, Button, Text} from "@chakra-ui/react";

const CodeOutput = ({editorRef,language}) => {
    
    const handleRunCode = async () => {
        //get the source code from the editor
        const sourceCode = editorRef.current.getValue();
        if(!sourceCode) return;
        //make Api Call
        try{}catch (e) {
            
        }
        
    }
    return(
        <>
            <Text mb={2} fontSize={'lg'}>OutPut</Text>
            <Button variant={'outline'} colorScheme={'green'} mb={4}> Run Code</Button>

            <Box
                height={'75vh'}
                p={2}
                border={'1px solid'}
                borderRadius={4}
                borderColor={'#333'}

            >
                test

            </Box>      
        </>
    )
}

export default CodeOutput