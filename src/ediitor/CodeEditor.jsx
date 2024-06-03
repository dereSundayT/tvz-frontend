import {Box, HStack} from "@chakra-ui/react";
import {Editor} from "@monaco-editor/react";
import {useRef, useState} from "react";
import LanguageSelector from "./LanguageSelector";
import CodeOutput from "./CodeOutput";
import {LANGUAGE_OPTIONS} from "./constant";

export const CodeEditor = ({test_id}) => {
    //focus on the editor it mounts
    const editorRef = useRef();
    //store the state of code written
    const [value,setValue] = useState('');  //empty state
    const [language , setLanguage] = useState(LANGUAGE_OPTIONS[5]);
    const [isLoading,setIsLoading] = useState(false)



    //when the component mounts
    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus()
    }
    const handleLanguageChange = (language)=>{
        setLanguage(language)
        setValue(language.snippet)
    }
    const handleLoading = (loading) => {
        setIsLoading(loading)
    }




    return (
        <Box>
            <div className={'row'} >
                <div className={'col-6'}>
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
                </div>
                <div className={'col-6'}>
                    <CodeOutput editorRef={editorRef} language={language} handleLoading={handleLoading} isLoading={isLoading} test_id={test_id}/>
                </div>
            </div>

        </Box>
    )
}