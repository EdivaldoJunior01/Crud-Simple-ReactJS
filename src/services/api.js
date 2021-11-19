import axios from "axios";

const api =axios.create({
    baseURL:'https://crud-simple-react-js.vercel.app/api'
})

export default api
