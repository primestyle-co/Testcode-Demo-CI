<template>
    <p style="text-align: center">
        <a-space :size="10" style="text-align: center; font-size: 18px;">
            <router-link to="/login">Login</router-link>
            <router-link to="/register">Register</router-link>
        </a-space>
    </p>
    <a-layout class="auth-layout" ref="authLayout">
        <router-view class="auth-main" />
    </a-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import router from "@/router";

export default defineComponent({
    setup() {
        return {};
    },
});
</script>
