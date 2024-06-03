import axios from "axios";



const checkStatus = async (token) => {

    try {
        const options = {
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            },
        };
        let response = await axios.get(`${process.env.REACT_APP_RAPID_API_URL}/${token}`,options);
        const status = response.status
        if(status>=200 && status<=299){
            let statusId = response.data.status?.id;
            // Processed - we have a result
            if (statusId === 1 || statusId === 2) {
                // still processing
                setTimeout(() => {
                    checkStatus(token)
                }, 2000)
                return;
            }
            //Compilation completed
            else {
                return {status:true,data:response.data,message:'success'}
            }
        }
        //Some went wrong
        console.log(response)

    } catch (err) {
        console.log("err", err);
    }
    return {status:false,data:null,message:'something went wrong'}
};

export const compileCode = async (language, sourceCode) => {
    try{
        //form data
        const formData = {
            language_id: language.id,
            source_code: btoa(sourceCode),
        };
        //request configuration
        const options = {
            method: "POST",
            url: process.env.REACT_APP_RAPID_API_URL,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            },
            data: formData,
        };
        const compileResp = await axios.request(options)
        const status = compileResp.status

        if(status>=200 && status<300){
            const token = compileResp.data.token;
            const checkStatusResp = await checkStatus(token);
            if(checkStatusResp.status){
                return {data:checkStatusResp.data,status:true,message:''}
            }
            return {data:checkStatusResp,status:false,message:''}
        }
        // return data
    }catch (e) {
        console.log(e)
        return {state:false, data:null,message:"something went wrong please try again later"}
    }

}


const handleRequestError = (e) => {
    //code: 'ERR_NETWORK'
    // console.log(e.response.data.message)
    return  e.response ? e.response.data.message:e.message
}


export const getRequest = async (url, token) => {
  try{
      const options = {
          headers:{
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
      }
      const respData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/${url}`,options)
      if(respData.status===200){
          return respData.data
      }
  }catch (e){
      const message = handleRequestError(e)
      return  {status:false,data:null,message}
  }

}

export const postRequest = async (url,postData, token) => {
    try{
        const options = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const respData = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/${url}`,postData,options)
        if(respData.status===200){
            return respData.data
        }
    }catch (e){
       const message = handleRequestError(e)
        return  {status:false,data:null,message}
    }

}


export const patchRequest = async (url,postData, token) => {
    try{
        const options = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const respData = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/${url}`,postData,options)
        if(respData.status===200){
            return respData.data
        }
    }catch (e){
        const message = handleRequestError(e)
        return  {status:false,data:null,message}
    }

}