
import React from "react";
import {UserDashboard} from "../../pages/user";
import UserTestDashboard from "../../pages/user/UserTestDashboard";
export const inAppUrls ={
    home :'/',
    userDashboard : '/user/dashboard',
    userTestDashboard_ : '/user/test',
    userTestDashboard : '/user/test/:id',
}

export const routes = [
    // {
    //     path:inAppUrls.home,
    //     element:<App/>,
    // },
    {
        path: inAppUrls.userDashboard,
        element: <UserDashboard/>,
    },
    {
        path: inAppUrls.userTestDashboard,
        element: <UserTestDashboard/>,
    },
]