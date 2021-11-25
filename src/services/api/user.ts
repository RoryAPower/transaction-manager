import { AxiosResponse } from 'axios'
import http from '@/services/api/http'
import { User } from '@/interfaces/user'

class UserService {
    show(): Promise<AxiosResponse> {
        return http.get('/user')
    }
    update(params: User): Promise<AxiosResponse> {
        return http.put('/user', params)
    }
}

export default new UserService()
