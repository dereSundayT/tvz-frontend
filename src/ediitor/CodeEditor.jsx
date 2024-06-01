import {Box, HStack} from "@chakra-ui/react";
import {Editor} from "@monaco-editor/react";
import {useRef, useState} from "react";
import LanguageSelector from "./LanguageSelector";
import CodeOutput from "./CodeOutput";
import {LANGUAGE_OPTIONS} from "./constant";

export const CodeEditor = () => {
    //focus on the editor it mounts
    const editorRef = useRef();
    //store the state of code written
    const [value,setValue] = useState('');  //empty state
    const [language , setLanguage] = useState(LANGUAGE_OPTIONS[0]);



    //when the component mounts
    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus()
    }
    const handleLanguageChange = (language)=>{
        setLanguage(language)
        setValue(language.snippet)
    }




    return (
        <Box>
            <HStack spacing={4}>
                <Box w={'50%'}>
                    <LanguageSelector language={language.value} onSelect={handleLanguageChange}/>
                    <Editor
                        height="75vh"
                        theme={'vs-dark'}
                        language={language.value??''} //string
                        defaultValue={''}
                        value={language.snippet}
                        onMount={onMount}
                        //get the value from the editor and update our state
                        onChange={(value,event) => {
                            setValue(value);
                        }}
                    />;
                </Box>
                <Box w={'50%'}>
                    <CodeOutput editorRef={editorRef} language={language}/>
                </Box>
            </HStack>

        </Box>
    )
}