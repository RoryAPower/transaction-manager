import axios, { AxiosError, AxiosResponse } from 'axios'
import * as AxiosLogger from 'axios-logger'

const http = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: true,
    headers: {
        'Content-type': 'application/json'
    }
})

if (process.env.NODE_ENV !== 'production') http.interceptors.request.use(AxiosLogger.requestLogger)

http.interceptors.response.use(
    (response: AxiosResponse) => {
        return response
    },
    async (error: { response: AxiosError }) => {
        return Promise.reject(error.response)
    }
)

export default http
