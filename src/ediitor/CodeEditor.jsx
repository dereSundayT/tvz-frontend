import {Box, HStack} from "@chakra-ui/react";
import {Editor} from "@monaco-editor/react";
import {useRef, useState} from "react";
import LanguageSelector from "./LanguageSelector";
import {CODE_SNIPPETS} from "./constant";
import CodeOutput from "./CodeOutput";

export const CodeEditor = () => {
    //focus on the editor it mounts
    const editorRef = useRef();
    //store the state of code written
    const [value,setValue] = useState('');
    const [language , setLanguage] = useState('javascript');


    //when the component mounts
    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus()
    }
    const handleLanguageChange = (language)=>{
        setLanguage(language)
        setValue(CODE_SNIPPETS[language])
    }




    return (
        <Box>
            <HStack spacing={4}>
                <Box w={'50%'}>
                    <LanguageSelector language={language} onSelect={handleLanguageChange}/>
                    <Editor
                        height="75vh"
                        theme={'vs-dark'}
                        language={language}
                        defaultValue={CODE_SNIPPETS[language]}
                        value={value}
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