import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    HStack,
    Input, VStack,
    InputGroup,
    InputRightElement,
    Icon, Heading, useToast
} from "@chakra-ui/react";

import {Center, Square, Circle} from '@chakra-ui/react'
import {useState} from "react";
import {useForm} from "react-hook-form";
import {postRequest} from "../utils/request";
import {storeDataInLocalStorage} from "../utils/routes/utills";
import {Navigate, useNavigate} from "react-router-dom";
import {inAppUrls} from "../utils/routes/routes";


const Login = () => {
    const navigate = useNavigate();
    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const {register,reset,
        handleSubmit, formState: {errors}, clearForm} = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            setIsLoading(true)
            const respData = await postRequest('auth/login', data)
            setIsLoading(false)
            const message = respData.message
            if(respData.status){
                //Clear Form fields
                reset()
                //Set message
                toast({
                    title: 'Success',
                    description: `${message}`,
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })
                //Store token in local
                storeDataInLocalStorage('token', respData.data.access_token)
                //redirect to dashboard
                navigate(inAppUrls.userDashboard)
            }else{
                toast({
                    title: 'Error!',
                    description: `${message}`,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }

            // console.log(respData)
        } catch (e) {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="app-content content ">
                <div className="content-overlay"></div>
                <div className="header-navbar-shadow"></div>
                <div className="content-wrapper">
                    <div className="content-header row"></div>
                    <div className="content-body">
                        <div className="auth-wrapper auth-basic px-2">
                            <div className="auth-inner my-2">
                                {/* Login basic */}
                                <div className="card mb-0">
                                    <div className="card-body">
                                        <h4 className="card-title mb-1">Welcome to HankerTest! 👋</h4>
                                        <p className="card-text mb-2">
                                            Please sign-in to your account and start the adventure
                                        </p>

                                        <form onSubmit={handleSubmit(onSubmit)} className="auth-login-form mt-2">
                                            <div className="mb-1">
                                                <label htmlFor="login-email" className="form-label">Email</label>
                                                <input
                                                    type="email"
                                                    className={`form-control ${errors.email && 'is-invalid'} `}
                                                    placeholder=""
                                                    tabIndex={1}
                                                    {...register('email', {
                                                        required: {
                                                            value: true,
                                                            message: 'email is required'
                                                        }
                                                    })}
                                                />
                                                {errors.email &&
                                                    <div className="invalid-feedback">{errors.email.message}</div>}
                                            </div>

                                            {/*Password Section*/}
                                            <div className="mb-1">
                                                <div className="d-flex justify-content-between">
                                                    <label className="form-label"
                                                           htmlFor="login-password">Password</label>
                                                </div>

                                                <div
                                                    className={`input-group input-group-merge form-password-toggle ${errors.password && 'is-invalid'}`}>
                                                    <input
                                                        type={showPassword ? 'text' : 'password'}
                                                        className={`form-control form-control-merge ${errors.password && 'is-invalid'}`}
                                                        tabIndex="2"
                                                        placeholder="············"
                                                        aria-describedby="login-password login-password-error"
                                                        aria-invalid="true"
                                                        {...register('password', {
                                                            required: {
                                                                value: true,
                                                                message: 'password is required'
                                                            },
                                                            minLength: {
                                                                value: 8,
                                                                message: 'password must be at least 6 characters'
                                                            }
                                                        })}
                                                    />
                                                    <span className="input-group-text cursor-pointer" onClick={()=>setShowPassword(!showPassword)}>
                                                           <svg xmlns="http://www.w3.org/2000/svg" width="14"
                                                                height="14" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" strokeWidth="2"
                                                                strokeLinecap="round" strokeLinejoin="round"
                                                                className="feather feather-eye">
                                                               <path
                                                                   d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                               <circle cx="12" cy="12" r="3"></circle>
                                                           </svg>
                                                       </span>
                                                </div>
                                                {errors.password && <span
                                                    className="error invalid-feedback">{errors.password.message}</span>}
                                            </div>
                                            {
                                                isLoading
                                                ?
                                                <button className="btn btn-outline-primary waves-effect w-100" type="button" disabled="">
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Loading...</span>
                                                </button>
                                                :
                                                <button className="btn btn-primary w-100" tabIndex={4}>
                                                    Sign in
                                                </button>
                                            }



                                        </form>
                                        <p className="text-center mt-2">
                                            <span>New on our platform?</span>
                                            <a href="">
                                                <span>Create an account</span>
                                            </a>
                                        </p>

                                    </div>
                                </div>
                                {/* /Login basic */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login