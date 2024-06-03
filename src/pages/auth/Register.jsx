import {Link, useNavigate} from "react-router-dom";
import {useToast} from "@chakra-ui/react";
import {useState} from "react";
import {useForm} from "react-hook-form";
import AuthWrapper from "./AuthWrapper";
import {postRequest} from "../../utils/request";
import {inAppUrls} from "../../utils/routes/routes";

const Register = () => {
    const navigate = useNavigate();
    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const {register,reset,
        handleSubmit, formState: {errors}, clearForm} = useForm({
        defaultValues: {email: '', password: '',first_name:'',last_name:''},
    });

    /**
     * On Submit
     * @param data
     * @returns {Promise<void>}
     */
    const onSubmit = async (data) => {
        try {
            setIsLoading(true)
            const respData = await postRequest('auth/register', data)
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
                navigate(inAppUrls.home)
            }else{
                toast({
                    title: 'Error!',
                    description: `${message}`,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }
        }
        catch (e) {
            setIsLoading(false)
        }
    }

    return (
        <AuthWrapper>
            <form onSubmit={handleSubmit(onSubmit)} className="auth-login-form mt-2">
                {/**/}
                <div className="mb-1">
                    <label htmlFor="login-email" className="form-label">First Name</label>
                    <input
                        type="text"
                        className={`form-control ${errors.first_name && 'is-invalid'} `}
                        tabIndex={1}
                        {...register('first_name', {required: {value: true, message: 'first name is required'},})}
                    />
                    {errors.first_name && <div className="invalid-feedback">{errors.first_name.message}</div>}
                </div>

                {/**/}
                <div className="mb-1">
                    <label htmlFor="last-name-email" className="form-label">Last Name</label>
                    <input
                        type="text"
                        className={`form-control ${errors.last_name && 'is-invalid'} `}
                        tabIndex={1}
                        {...register('last_name', {required: {value: true, message: 'last name is required'},})}
                    />
                    {errors.last_name && <div className="invalid-feedback">{errors.last_name.message}</div>}
                </div>

                <div className="mb-1">
                    <label htmlFor="login-email" className="form-label">Email</label>
                    <input
                        type="email"
                        className={`form-control ${errors.email && 'is-invalid'} `}
                        tabIndex={1}
                        {
                            ...register('email', {
                                required: {
                                    value: true,
                                    message: 'email is required'
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Invalid email address'
                                }
                            })}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>

                {/*Password Section*/}
                <div className="mb-1">
                    <div className="d-flex justify-content-between">
                        <label className="form-label" htmlFor="login-password">Password</label>
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
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#=])[A-Za-z\d@$!%*?&#=]+$/,
                                    message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character from @$!%*?&#='
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
                <Link to={inAppUrls.register}>
                    <span>Create an account</span>
                </Link>
            </p>
        </AuthWrapper>
    )
}
export default Register