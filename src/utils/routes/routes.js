
import React from "react";
import {UserDashboard} from "../../pages/user";
import UserTestDashboard from "../../pages/user/UserTestDashboard";
import {Login, Register} from "../../auth";

export const inAppUrls ={
    home :'/',
    register :'/sign-up',
    userDashboard : '/user/dashboard',
    userTestDashboard_ : '/user/test',
    userTestDashboard : '/user/test/:id',
}

export const routes = [
    {
        path:inAppUrls.home,
        element:<Login/>,
    },
    {
        path:inAppUrls.register,
        element:<Register/>,
    },
    {
        path: inAppUrls.userDashboard,
        element: <UserDashboard/>,
    },
    {
        path: inAppUrls.userTestDashboard,
        element: <UserTestDashboard/>,
    },
]