import { DateTime } from 'luxon'
import { toDecimal } from '@/helpers'
import { computed } from '@vue/composition-api'
import { Transaction } from '@/interfaces/transaction'
import { TransactionType } from '@/enums/transactionTypes'
import transactionService from '@/services/api/transaction'

export function transactions() {
    const getTransactionDate = (transactionDate: string) => {
        return DateTime.fromISO(transactionDate).toFormat('d LLLL')
    }

    const now = computed(() => {
        return DateTime.now().toFormat('yyyy-MM-dd')
    })

    const transactionSelectElements = computed(() => {
        return [
            { text: 'deposit', value: TransactionType.Deposit },
            { text: 'Withdrawal', value: TransactionType.Withdrawal }
        ]
    })

    const getTransactions = async () => {
        try {
            const response = await transactionService.list()

            if (response && response.status) {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getTransactionAmount = (transaction: Transaction) => {
        const transactionIcon = transaction.type === TransactionType.Deposit ? '+' : '-'
        const transactionAmount = toDecimal(transaction.amount)

        return `${transactionIcon} ${transactionAmount}`
    }

    const postTransaction = async (params: Transaction) => {
        try {
            const response = await transactionService.create(params)

            if (response && response.status) {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    }

    return {
        now,
        postTransaction,
        getTransactions,
        getTransactionDate,
        getTransactionAmount,
        transactionSelectElements
    }
}
