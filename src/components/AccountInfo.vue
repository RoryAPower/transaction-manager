<template>
    <v-row class="my-0" style="border-bottom: 2px solid #1976d2">
        <v-col :cols="12" :lg="6" class="d-flex justify-space-between py-2">
            <div class="font-weight-bold h-2">Balance</div>
            <div class="primary--text font-weight-bold">&pound;{{ getBalanceToDisplay }}</div>
        </v-col>
        <v-col :cols="12" :lg="6" class="d-flex justify-space-between grey--text py-2">
            <div>Overdraft</div>
            <div>&pound;{{ getOverDraftToDisplay }}</div>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { user } from '@/composables/user'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    name: 'AccountInfo',
    setup() {
        const { getOverDraftToDisplay, getBalanceToDisplay } = user()

        return {
            getBalanceToDisplay,
            getOverDraftToDisplay
        }
    }
})
</script>

<style scoped></style>
