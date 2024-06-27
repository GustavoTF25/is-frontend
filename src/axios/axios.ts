import axios from "axios";
//import { errorInterceptor, responseInterceptor } from "./interceptor";
const Backend = "http://192.168.1.3:8000"
const API = axios.create({
    baseURL: Backend,
    
});

// API.interceptors.response.use(
//     (response) => responseInterceptor(response),
//     (error) => errorInterceptor(error),
// );

export {API , Backend};