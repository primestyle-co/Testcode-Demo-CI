<template>
  <p style="text-align: center;">
    <a-space :size="10"  style="text-align: center;">
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </a-space>
  </p>
  <a-layout class="auth-layout" ref="authLayout">
    <router-view class="auth-main" />
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, provide, ref } from "vue";
import Header from "@/components/header/Header.vue";

export default defineComponent({
  components: {
    Header,
  },
  setup() {
    return {
    };
  },
});
</script>