<template>
    <div class="d-flex flex-column fill-height">
        <div class="grow">
            <account-info />
            <div class="h-2 py-4 primary--text text-decoration-underline">Recent Transactions</div>
            <template v-for="(transaction, index) in transactionsList">
                <div :key="index" class="d-flex justify-space-between py-2">
                    <div>
                        <div>{{ transaction.description }}</div>
                        <div class="grey--text">{{ getTransactionDate(transaction.date) }}</div>
                    </div>
                    <div>{{ getTransactionAmount(transaction) }}</div>
                </div>
            </template>
        </div>
        <div class="d-flex align-center justify-end px-2 py-10">
            <transaction-modal @hasSubmit="refreshTransactionList()" />
        </div>
        <v-snackbar v-model="snackbar" :timeout="2000">{{ snackbarText }}</v-snackbar>
    </div>
</template>

<script lang="ts">
import { user } from '@/composables/user'
import AccountInfo from '@/components/AccountInfo.vue'
import { transactions } from '@/composables/transactions'
import TransactionModal from '@/components/modals/Transaction.vue'
import { defineComponent, onBeforeMount, ref, watch } from '@vue/composition-api'

export default defineComponent({
    name: 'Account',
    components: { AccountInfo, TransactionModal },
    setup() {
        const { getTransactions, getTransactionAmount, getTransactionDate } = transactions()
        const { getBalance } = user()
        const transactionsList = ref(null)
        const snackbar = ref(false)
        const snackbarText = ref('')

        onBeforeMount(async () => {
            transactionsList.value = await getTransactions()
        })

        const refreshTransactionList = async () => {
            transactionsList.value = await getTransactions()
        }

        watch(getBalance, newVal => {
            if (newVal > 4000) {
                snackbar.value = true
                snackbarText.value = 'You have savings of £4000 or more'
            }

            if (newVal < 0) {
                snackbar.value = true
                snackbarText.value = 'You are currently spending your overdraft'
            }
        })

        return {
            transactionsList,
            getTransactionDate,
            getTransactionAmount,
            refreshTransactionList,
            snackbar,
            snackbarText
        }
    }
})
</script>

<style scoped></style>
