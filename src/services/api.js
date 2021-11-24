import axios from "axios";

const api =axios.create({
    baseURL:'https://crud-simple-react-js.vercel.app/api'
    // ou  baseURL: 'http://localhost:3000/api'caso esteja rodando local
})

export default api
