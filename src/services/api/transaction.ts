import { AxiosResponse } from 'axios'
import http from '@/services/api/http'
import { Transaction } from '@/interfaces/transaction'

class TransactionService {
    list(): Promise<AxiosResponse> {
        return http.get('transactions?_sort=date&_order=desc')
    }
    create(params: Transaction): Promise<AxiosResponse> {
        return http.post('transactions', params)
    }
}

export default new TransactionService()
