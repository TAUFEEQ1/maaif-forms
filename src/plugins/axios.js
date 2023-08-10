import axios from "axios";
const axiosApiInst = axios.create();
axiosApiInst.interceptors.request.use(
    async config => {
        const apiKey = sessionStorage.getItem("token");
        config.headers = {
            'Authorization': `Bearer ${apiKey}`,
            'Accept':'application/json'
        }
        return config;
    },
)
export {axiosApiInst};