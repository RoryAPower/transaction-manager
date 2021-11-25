import store from '@/store'
import { get } from 'lodash'
import { toDecimal } from '@/helpers'
import { computed } from '@vue/composition-api'
import { Transaction } from '@/interfaces/transaction'
import { TransactionType } from '@/enums/transactionTypes'

export function user() {
    const isAppLoaded = computed(() => {
        return store.getters.isAppLoaded
    })
    const getUser = computed(() => {
        return store.getters.getUser
    })

    const getBalance = computed(() => {
        return get(getUser.value, 'balance')
    })

    const getOverDraft = computed(() => {
        return get(getUser.value, 'overdraft')
    })

    const getOverDraftLimit = computed(() => {
        return get(getUser.value, 'overdraftLimit')
    })

    const getAccountType = computed(() => {
        const accountType = get(getUser.value, 'account')
        return `${accountType} Account`
    })

    const getBalanceToDisplay = computed(() => {
        return toDecimal(getBalance.value)
    })

    const getOverDraftToDisplay = computed(() => {
        return toDecimal(getOverDraft.value)
    })

    const areFundsAvailable = (amount: number) => {
        const availableFunds = getBalance.value > 0 ? getBalance.value + getOverDraft.value : getOverDraft.value

        return amount <= availableFunds
    }

    const handleDeposit = (depositAmount: number) => {
        if (getOverDraft.value < getOverDraftLimit.value) {
            const outstandingOverdraft = getOverDraftLimit.value - getOverDraft.value
            let overdraftPayment = getOverDraftLimit.value

            if (depositAmount < outstandingOverdraft) {
                overdraftPayment = getOverDraft.value + depositAmount
            }

            if (depositAmount > outstandingOverdraft) {
                depositAmount -= outstandingOverdraft
            }

            store.commit('setOverDraft', overdraftPayment)
        }

        store.commit('setBalance', getBalance.value + depositAmount)
    }

    const handleWithdrawal = (withdrawalAmount: number) => {
        if (withdrawalAmount > getBalance.value) {
            const overdraftPayment = getBalance.value < 0 ? withdrawalAmount : withdrawalAmount - getBalance.value
            store.commit('setOverDraft', getOverDraft.value - overdraftPayment)
        }

        store.commit('setBalance', getBalance.value - withdrawalAmount)
    }

    const updateAccountBalance = async (transaction: Transaction) => {
        if (transaction.type === TransactionType.Deposit) {
            handleDeposit(transaction.amount)
            await store.dispatch('updateUser')
            return
        }

        handleWithdrawal(transaction.amount)
        await store.dispatch('updateUser')
        return
    }

    return {
        getUser,
        getBalance,
        getOverDraft,
        getOverDraftLimit,
        getAccountType,
        getBalanceToDisplay,
        getOverDraftToDisplay,
        isAppLoaded,
        areFundsAvailable,
        updateAccountBalance
    }
}
