import axios from "axios"
const BASE_URL = process.env.VUE_APP_BACKEND;
function signIn(token, callback,errcallback) {

    axios.post(
        BASE_URL + "/token-auth",
        {token}
    ).then(callback).catch(errcallback);
}
export default { signIn }