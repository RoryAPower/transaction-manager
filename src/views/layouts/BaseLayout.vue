<template>
    <v-container fluid v-if="isAppLoaded" class="pt-0">
        <v-app-bar color="primary" app flat height="72">
            <h1 class="headline white--text">{{ getAccountType }}</h1>
            <v-spacer></v-spacer>
            <v-app-bar-nav-icon @click.stop="" color="white" role="navigation" outlined class="mx-0">
                <v-icon>mdi-account</v-icon>
            </v-app-bar-nav-icon>
        </v-app-bar>
        <v-main style="height: 100vh">
            <router-view />
        </v-main>
    </v-container>
</template>

<script lang="ts">
import { user } from '@/composables/user'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    name: 'BaseLayout',
    setup() {
        const { getAccountType, isAppLoaded } = user()

        return {
            getAccountType,
            isAppLoaded
        }
    }
})
</script>

<style scoped></style>
