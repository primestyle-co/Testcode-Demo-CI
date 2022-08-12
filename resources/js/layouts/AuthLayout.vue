<template>
  <HTMLHeader ref="header"/>
  <div class="demo-dropdown-wrap">
    <a-dropdown-button>
      {{ user.name }}
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item key="1">
            <UserOutlined />
            <span  @click="logout">Logout</span>
          </a-menu-item>
        </a-menu>
      </template>
      <template #icon><UserOutlined /></template>
    </a-dropdown-button>
  </div>
  <a-layout ref="authLayout">
    <a-row>
        <a-col :span="3">
            <a-menu
              v-model:selectedKeys="selectedKeys"
              style="width: 150px"
              mode="inline"
              theme="dark"
              :open-keys="openKeys"
              @openChange="onOpenChange"
            >
              <a-sub-menu key="sub1">
                <template #icon></template>
                <template #title>
                  <AppstoreOutlined />
                  Post
                </template>
                <a-menu-item key="1">
                  <router-link :to="'/posts'">List</router-link>
                </a-menu-item>
                <a-menu-item key="2">
                  <router-link :to="'/posts/create'">Create</router-link>
                </a-menu-item>
              </a-sub-menu>
            </a-menu>
        </a-col>
        <a-col :span="19" :offset="1">
          <router-view class="auth-main" />
        </a-col>
    </a-row>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { UserOutlined } from '@ant-design/icons-vue';
import HTMLHeader from "@/components/header/HTMLHeader.vue";
import { useStore } from "vuex";
import router from "@/router";

export default defineComponent({
  components: {
    UserOutlined,
    HTMLHeader,
  },
  setup() {
    const store = useStore();
    const user = computed(() => {
      return store.state.auth.user
    });
    const selectedKeys = ref<string[]>(['1']);
    const openKeys = ref<string[]>(['sub1']);
    const logout = () => {
      store.dispatch("auth/logout").then(() => {
        router.push('/login');
      });
    }
    return {
      selectedKeys,
      openKeys,
      logout,
      user
    };
  },
});
</script>