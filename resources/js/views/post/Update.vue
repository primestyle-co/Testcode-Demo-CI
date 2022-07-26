<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="Update"
      sub-title="Update a post"
    />
    <a-form
      :model="formState"
      v-bind="layout"
      name="nest-messages"
      :validate-messages="validateMessages"
      @finish="onFinish"
    >
      <a-row :gutter="24">
        <a-col :span="16" :offset="1">
          <a-form-item :name="'title'" label="title" :rules="[{ required: true }]">
            <a-input v-model:value="formState.title" />
          </a-form-item>
          <a-form-item :name="'content'" label="content" :rules="[{ required: true }]">
            <a-textarea v-model:value="formState.content" />
          </a-form-item>
          <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
            <a-button type="primary" html-type="submit">Create</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <br>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import type { FormInstance } from 'ant-design-vue';
import { useStore } from "vuex";
import router from "@/router";
import { message } from 'ant-design-vue';

export default defineComponent({
  setup() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const store = useStore();

    const validateMessages = {
      required: '${label} is required!',
      types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    };

    const formState = reactive({
      title: '',
      content: '',
    });
    const onFinish = (values: any) => {
      store.dispatch("post/create", formState).then(res => {
        if(res.data.status == 'ok') {
          router.push('/posts');
        }
      });
    };
    return {
      formState,
      onFinish,
      layout,
      validateMessages,
    };
  },
});
</script>
