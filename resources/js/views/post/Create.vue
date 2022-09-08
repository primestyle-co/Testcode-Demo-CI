<template>
    <div>
        <a-page-header
            style="border: 1px solid rgb(235, 237, 240)"
            title="Create"
            sub-title="Create a post"
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
                    <a-form-item
                        :name="'title'"
                        label="title"
                        :rules="[{ required: true }]"
                    >
                        <a-input
                            :value="formState.title"
                            @input="updateTitle"
                        />
                    </a-form-item>
                    <a-form-item
                        :name="'content'"
                        label="content"
                        :rules="[{ required: true }]"
                    >
                        <a-textarea
                            :value="formState.content"
                            @input="updateContent"
                        />
                    </a-form-item>
                    <a-form-item
                        :wrapper-col="{ ...layout.wrapperCol, offset: 8 }"
                    >
                        <a-button type="primary" html-type="submit"
                            >{{ id ? "Update" : "Create" }}</a-button
                        >
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
        <br />
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import router from "@/router";
import { message } from "ant-design-vue";
import { useRoute } from "vue-router";

export default defineComponent({
    props: ["id"],
    setup(props) {
        const route = useRoute();
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const store = useStore();

        const validateMessages = {
            required: "${label} is required!",
            types: {
                email: "${label} is not a valid email!",
                number: "${label} is not a valid number!",
            },
            number: {
                range: "${label} must be between ${min} and ${max}",
            },
        };

        const formState = computed(() => {
            return store.state.post.post;
        });

        const updateTitle = (e) => {
            store.commit("post/updatePostTitle", e.target.value);
        };

        const updateContent = (e) => {
            store.commit("post/updatePostContent", e.target.value);
        };

        onBeforeMount(async () => {
            if (props.id) {
                await store.dispatch("post/detail", props.id);
            }
        });

        const onFinish = () => {
            if (props.id) {
                store
                    .dispatch("post/update", formState.value)
                    .then((res) => {
                        if (res.data.status == "ok") {
                            router.push("/posts");
                        }
                    })
                    .catch((error) => {
                        if(error.response.status === 404) {
                            message.error("you can't edit other people's posts");
                        }
                        if (error.response.data.errors) {
                            for (var prop in error.response.data.errors) {
                                message.error(error.response.data.errors[prop]);
                                break;
                            }
                        }
                    });
            } else {
                store
                    .dispatch("post/create", formState.value)
                    .then((res) => {
                        if (res.data.status == "ok") {
                            router.push("/posts");
                        }
                    })
                    .catch((error) => {
                        if (error.response.data.errors) {
                            for (var prop in error.response.data.errors) {
                                message.error(error.response.data.errors[prop]);
                                break;
                            }
                        }
                    });
            }
        };

        return {
            formState,
            onFinish,
            layout,
            validateMessages,
            updateTitle,
            updateContent,
        };
    },
});
</script>
