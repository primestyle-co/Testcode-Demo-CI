<template>
  <a-layout>
    <a-typography-title :level="2" style="text-align: center">Login</a-typography-title>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 8 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="Username"
        name="name"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item
        label="Email"
        name="email"
        :rules="[{ required: true, message: 'Please input your email!' }]"
      >
        <a-input v-model:value="formState.email" />
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>
      <a-form-item
        label="Confirm password"
        name="password_confirmation"
        :rules="[{ required: true, message: 'Please input your Confirm password!' }]"
      >
        <a-input-password v-model:value="formState.password_confirmation" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Register</a-button>
      </a-form-item>
    </a-form>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useStore } from "vuex";
import router from "@/router";
import { message } from 'ant-design-vue';

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmed: string;
  remember: boolean;
}
export default defineComponent({
  setup() {
    const formState = reactive<FormState>({
      name: '',
      email: '',
      password_confirmation: '',
      confirmed: '',
    });
    const store = useStore();
    const onFinish = (values: any) => {
      store.dispatch("auth/register", values).then(res => {
        if (res.data.login) {
          router.push('/posts');
        }
      }).catch((error, b,c) => {
        if (error.response.data.errors) {
          for (var prop in error.response.data.errors) {  
              message.error(error.response.data.errors[prop]);
              break;
          }
        }
      });
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };
    return {
      formState,
      onFinish,
      onFinishFailed,
    };
  },
});
</script>