import {Box, Button, Menu, MenuButton, MenuItem, MenuList, Text} from "@chakra-ui/react";
import {LANGUAGE_OPTIONS} from "./constant";


const languages = LANGUAGE_OPTIONS
const ACTIVE_COLOR = "blue.400"
const LanguageSelector = ({language,onSelect}) => {
    return(
        <Box ml={2} mb={4}>
            <Text mb={2} fontSize={'lg'}>Language:</Text>
            <Menu isLazy>
                <MenuButton as={Button} >{language}</MenuButton>
                <MenuList bg={'#110c1b'}>
                    {
                        languages.map((lang,key=0)=> (
                            <MenuItem
                                key={lang.value}
                                color={lang.value === language ? ACTIVE_COLOR : ''}
                                bg={lang.value===language?"gray.900":"transparent"}
                                _hover={{color:ACTIVE_COLOR, bg:"gray.900"}}
                                onClick={()=>onSelect(lang)}
                            >
                                {lang.label}
                                &nbsp;
                            </MenuItem>
                        ))
                     }
                </MenuList>
            </Menu>
        </Box>
    )
}

export default LanguageSelector
