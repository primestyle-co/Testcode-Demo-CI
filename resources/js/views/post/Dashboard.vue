<template>
    <div>
        <a-page-header
            style="border: 1px solid rgb(235, 237, 240)"
            title="Dashboard"
            sub-title="Dashboard from AWS QuickSight"
        />
       Test
        <iframe
        width="960"
        height="720"
        src="https://ap-northeast-1.quicksight.aws.amazon.com/sn/embed/share/accounts/217511598673/dashboards/5fd5ce11-b8e9-4506-afdc-089e8f822b6d?directory_alias=locphuongpl">
    </iframe>
        
        <br />
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";

import { message } from "ant-design-vue";

export default defineComponent({
    props: ["id"],
    setup(props) {
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
                        if (error.response.status === 404) {
                            message.error(
                                "you can't edit other people's posts"
                            );
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
