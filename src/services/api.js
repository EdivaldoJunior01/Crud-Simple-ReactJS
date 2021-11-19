import axios from "axios";

const api =axios.create({
    baseURL:'http://crud-simple-react-js.vercel.app/'
})

export default api
