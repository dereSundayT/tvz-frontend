import React from 'react';
import ReactDOM from 'react-dom/client';
import {ChakraProvider} from '@chakra-ui/react'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {routes} from "./utils/routes/routes";
import theme from "./theme"
import App from "./App";


const root = ReactDOM.createRoot(document.getElementById('root'));
const routerConfig = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: routes,
    },
]);
root.render(
  <React.StrictMode>
      <ChakraProvider theme={theme}>
          <RouterProvider router={routerConfig}/>
      </ChakraProvider>
  </React.StrictMode>
);






