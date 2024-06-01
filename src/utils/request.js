import axios from "axios";

const makeRequest = () => {

}

const checkStatus = async (token) => {
    const options = {
        headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
            "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        },
    };
    try {
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
                console.log('response data :', response.data)
                return {status:true,data:response.data,message:'success'}
            }
        }
        //Some went wrong
        console.log(response)
        return {status:false,data:null}

    } catch (err) {
        console.log("err", err);
    }
};

export const compileCode = async (language, sourceCode) => {
    try{
        await checkStatus("7de095c6-7a2c-4141-8645-3bc767f22593")
        return;
        const formData = {
            language_id: language.id,
            source_code: btoa(sourceCode),
        };
        const options = {
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            },
        };
        const resp =  await axios.post(`${process.env.REACT_APP_RAPID_API_URL}/submissions`,formData,options)
        const status = resp.status;
        console.log( resp.data.token)
        if(status >=200 && status < 300){
            const token = resp.data.token
            console.log(token)
            //7de095c6-7a2c-4141-8645-3bc767f22593
            return {data:token,status:true,message:''}
        }
        // return data
    }catch (e) {
        console.log(e)
        return {state:false, data:null,message:"something went wrong please try again later"}
    }

}