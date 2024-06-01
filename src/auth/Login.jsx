import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    HStack,
    Input, VStack
} from "@chakra-ui/react";
import { Center, Square, Circle } from '@chakra-ui/react'
import {useState} from "react";
import {useForm} from "react-hook-form";


const Login = () => {
    const {register, handleSubmit, watch, formState: { errors },} = useForm()
    const onSubmit = (data) => {

    }
    return (
        <>

        </>
    )
}

export default Login