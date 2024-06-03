import DashboardWrapper from "../DashboardWrapper";
import {useForm} from "react-hook-form";
import {getRequest, patchRequest, postRequest} from "../../utils/request";
import {getDataFromLocalStorage} from "../../utils/routes/utills";
import {useEffect, useState} from "react";
import {Spinner, useToast} from "@chakra-ui/react";
import SkeletonLoader from "../../components/SkeletonLoader";

const UserProfile = () => {
    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        email: "",
        profile_url: null,
        status: "",
        user_role: "",
    })
    //
    const {register, reset, handleSubmit, formState: {errors}, clearForm} = useForm();

    const getProfileDetails = async () => {
        try {
            // setIsLoading(true)
            const token = getDataFromLocalStorage('token')
            const resp = await getRequest('auth/profile', token)
            // setIsLoading(false)
            if (resp.status) {
                setUserData(resp.data)
            }
        } catch (e) {
            // setIsLoading(false)
        }
    }

    const handleUpdateProfile = async (data) => {
        try {
            data.last_name = data.last_name ? data.last_name : userData.last_name
            data.first_name = data.first_name ? data.first_name : userData.first_name
            data.email = data.email ? data.email : userData.email
            data.profile_image_url = data.profile_image_url ? data.profile_image_url : userData.profile_url
            //::::: ::::: ::::: ::::: ::::: ::::: ::::: :::::
            setIsLoading(true)
            const token = getDataFromLocalStorage('token')
            const resp = await patchRequest('auth/profile', data, token)
            setIsLoading(false)
            if (resp.status) {
                //
                toast({
                    title: 'Success',
                    description: `${resp.message}`,
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })
            }
        } catch (e) {

        }
    }

    useEffect(() => {
        getProfileDetails().then()
    }, []);


    return (
        <DashboardWrapper>
            <div className=" col-8 mt-5 mx-auto">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">My Profile</h4>
                    </div>
                    <div className="card-body">
                        <form className="form form-horizontal" onSubmit={handleSubmit(handleUpdateProfile)}>
                            <div className="row">

                                <div className="col-12">
                                    <div className="mb-1 row">
                                        <div className="col-sm-3">
                                            <label className="col-form-label" htmlFor="first-name">First
                                                Name</label>
                                        </div>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                defaultValue={userData?.first_name}
                                                {...register('first_name')}
                                            />
                                        </div>
                                    </div>
                                </div>


                                <div className="col-12">
                                    <div className="mb-1 row">
                                        <div className="col-sm-3">
                                            <label className="col-form-label" htmlFor="first-name">Last
                                                Name</label>
                                        </div>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                defaultValue={userData?.last_name ?? ''}
                                                {...register('last_name')}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="mb-1 row">
                                        <div className="col-sm-3">
                                            <label className="col-form-label" htmlFor="email-id">Email</label>
                                        </div>
                                        <div className="col-sm-9">
                                            <input
                                                type="email"
                                                readOnly={true}
                                                className="form-control"
                                                defaultValue={userData.email}
                                                {...register('email')}
                                            />
                                        </div>
                                    </div>
                                </div>


                                <div className="col-12">
                                    <div className="mb-1 row">
                                        <div className="col-sm-3">
                                            <label className="col-form-label" htmlFor="email-id">Profile</label>
                                        </div>
                                        <div className="col-sm-9">
                                            <input
                                                type="url"
                                                className="form-control"
                                                defaultValue={userData.profile_url}
                                                {...register('profile_image_url')}
                                            />
                                        </div>
                                    </div>
                                </div>


                                <div className="col-sm-9 offset-sm-3">
                                    {
                                        isLoading ?
                                            <Spinner/>
                                            :
                                            <button type="submit"
                                                    className="btn btn-primary me-1 waves-effect waves-float waves-light">Submit</button>
                                    }

                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DashboardWrapper>
    )
}

export default UserProfile