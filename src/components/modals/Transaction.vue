<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
                <v-btn fab dark large color="primary" v-bind="attrs" v-on="on">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
            <v-form @submit.prevent="transactionHandler()" ref="form" v-model="valid" lazy-validation>
                <v-card>
                    <v-card-title>New Transaction</v-card-title>
                    <v-card-text>
                        <v-alert color="error" outlined icon="mdi-exclamation" text v-if="!hasFunds">
                            {{ noFundsMessage }}
                        </v-alert>
                        <v-text-field
                            id="amount"
                            label="Amount"
                            prepend-inner-icon="mdi-currency-gbp"
                            type="number"
                            step="0.01"
                            v-model="transaction.amount"
                            :rules="[v => !!v || 'Item is required']"
                        ></v-text-field>
                        <v-select
                            v-model="transaction.type"
                            :items="transactionSelectElements"
                            label="Transaction type"
                            prepend-inner-icon="mdi-bank"
                            single-line
                            :rules="[v => !!v || 'Item is required']"
                        ></v-select>
                        <v-menu>
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-bind="attrs"
                                    v-on="on"
                                    label="Date"
                                    :value="transaction.date"
                                    @click:append="on.click"
                                    prepend-inner-icon="mdi-calendar-blank"
                                    readonly
                                    single-line
                                    :rules="[v => !!v || 'Item is required']"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="transaction.date"
                                color="secondary"
                                no-title
                                :min="now"
                            ></v-date-picker>
                        </v-menu>
                        <v-text-field
                            id="description"
                            label="Short description"
                            prepend-inner-icon="mdi-draw"
                            v-model="transaction.description"
                            :rules="[v => !!v || 'Item is required']"
                        ></v-text-field>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn @click="dialog = false">Cancel</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" :loading="isLoading" type="submit" :disabled="!valid" @click="validate"
                            >OK</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import { watch, defineComponent, reactive, ref } from '@vue/composition-api'
import { transactions } from '@/composables/transactions'
import { user } from '@/composables/user'
import { TransactionType } from '@/enums/transactionTypes'

export default defineComponent({
    name: 'Transaction',
    emits: ['hasSubmit'],
    setup(props, { emit }) {
        const valid = ref(true)
        const form = ref(null)
        const dialog = ref(false)
        const isLoading = ref(false)
        const { postTransaction, now, transactionSelectElements } = transactions()
        const { areFundsAvailable, updateAccountBalance } = user()
        const noFundsMessage = 'Insufficient funds'
        const hasFunds = ref(true)

        const transaction = reactive({
            date: '',
            amount: null,
            description: '',
            type: ''
        })

        const transactionHandler = async () => {
            transaction.amount = Number(transaction.amount)

            if (transaction.type === TransactionType.Withdrawal && !areFundsAvailable(transaction.amount)) {
                hasFunds.value = false
                return
            }

            isLoading.value = true
            const response = await postTransaction(transaction)

            if (response) {
                await updateAccountBalance(transaction)
                dialog.value = false
                emit('hasSubmit', true)
            }
        }

        const validate = () => {
            form.value.validate()
        }

        const resetForm = () => {
            transaction.date = ''
            transaction.amount = null
            transaction.description = ''
            transaction.type = ''
            isLoading.value = false
            hasFunds.value = true
            form.value && form.value.reset()
        }

        watch(dialog, (newVal, oldVal) => {
            if (newVal !== oldVal) {
                resetForm()
            }
        })

        return {
            now,
            form,
            valid,
            dialog,
            isLoading,
            validate,
            transaction,
            transactionHandler,
            transactionSelectElements,
            noFundsMessage,
            hasFunds
        }
    }
})
</script>

<style scoped></style>
