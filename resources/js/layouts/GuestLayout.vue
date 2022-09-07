<template>
    <p style="text-align: center">
        <a-space :size="10" style="text-align: center">
            <router-link to="/login">Login</router-link>
            <router-link to="/register">Register</router-link>
        </a-space>
    </p>
    <a-layout class="auth-layout" ref="authLayout">
        <router-view class="auth-main" />
    </a-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    setup() {
        return {};
    },
});
</script>
