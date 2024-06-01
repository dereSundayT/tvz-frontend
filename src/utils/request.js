
const API = axios.create({
    baseURL: "https://api64.ipify.org?format=json"
})

export const compileCode = async (language, sourceCode) => {
    const {data} = await API.post("", {
        language,
        sourceCode
    })
    return data
}