<template>
    <div>
        <a-page-header
            style="border: 1px solid rgb(235, 237, 240)"
            title="List"
            sub-title="List of post"
        />
        <a-form
            ref="formRef"
            name="advanced_search"
            class="ant-advanced-search-form"
            :model="formState"
            @finish="onFinish"
        >
            <a-row :gutter="24">
                <a-col :span="8" :offset="1">
                    <a-form-item :name="'title'" :label="`title`">
                        <a-input
                            v-model:value="formState[`title`]"
                            placeholder="placeholder"
                        ></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="8" :offset="1">
                    <a-form-item :name="'author'" :label="`Author`">
                        <a-input
                            v-model:value="formState[`author`]"
                            placeholder="placeholder"
                        ></a-input>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row>
                <a-col :span="24" style="text-align: right">
                    <a-button type="primary" html-type="submit"
                        >Search</a-button
                    >
                    <a-button style="margin: 0 8px" @click="resetFields"
                        >Clear</a-button
                    >
                </a-col>
            </a-row>
        </a-form>
        <div class="search-result-list">Search Result List</div>
        <a-layout>
            <a-table
                :columns="columns"
                :data-source="posts.data"
                @change="onTableChange"
                :pagination="pagination"
            >
                <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex === 'created_by'">
                        {{ record.user.name }}
                    </template>
                    <template v-else-if="column.dataIndex === 'operation'">
                        <a-space :size="15" style="text-align: center">
                            <router-link
                                :to="{
                                    name: 'post_update',
                                    params: { id: record.id },
                                }"
                                >Edit</router-link
                            >
                            <a-popconfirm
                                v-if="posts.data.length"
                                title="Sure to delete?"
                                @confirm="onDelete(record.id)"
                            >
                                <a>Delete</a>
                            </a-popconfirm>
                        </a-space>
                    </template>
                </template>
            </a-table>
        </a-layout>
        <br />
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";

export default defineComponent({
    setup() {
        const expand = ref(false);
        const formRef = ref();
        const formState = reactive({
            title: "",
            author: "",
            page: 1,
        });
        const store = useStore();

        const sortedInfo = ref();
        const posts = computed(() => {
            return store.state.post.posts;
        });
        const onFinish = () => {
            store.dispatch("post/search", formState);
        };

        onBeforeMount(async () => {
            await store.dispatch("post/search", formState);
        });
        const onDelete = (id) => {
            store.dispatch("post/delete", id).then(() => {
                store.dispatch("post/search", formState);
            }).catch((error) => {
                if(error.response.status === 404) {
                    message.error("you can't delete other people's posts");
                }
            });
        };

        const pagination = computed(() => {
            return {
                total: posts.value.total,
                current: posts.value.current_page,
                pageSize: posts.value.per_page,
            };
        });
        const onChange = (params) => {
            formState.page = params.current;
            store.dispatch("post/search", formState);
        };

        const onTableChange = (pag, filters, sorter) => {
            formState.page = pag.current;
            sortedInfo.value = sorter;
            formState.sort_field = sorter.field;
            if (sorter.order === "descend") {
                formState.sort_direction = "desc";
            } else if (sorter.order === "ascend") {
                formState.sort_direction = "asc";
            } else {
                formState.sort_field = undefined;
                formState.sort_direction = undefined;
            }
            console.log(formState, "tung formState");
            store.dispatch("post/search", formState);
        };

        const resetFields = () => {
            formState.title = "";
            formState.author = "";
            formState.page = 1;
            formState.sort_field = undefined;
            formState.sort_direction = undefined;
            sortedInfo.value = false;
        };

        const columns = computed(() => {
            const sorted = sortedInfo.value || {};
            return [
                {
                    title: "ID",
                    dataIndex: "id",
                    sorter: true,
                    sortOrder: sorted.field === "id" && sorted.order,
                },
                {
                    title: "Title",
                    dataIndex: "title",
                    sorter: true,
                    sortOrder: sorted.field === "title" && sorted.order,
                },
                {
                    title: "Author",
                    dataIndex: "created_by",
                    sorter: true,
                    sortOrder: sorted.field === "created_by" && sorted.order,
                },
                {
                    title: "Created At",
                    dataIndex: "created_at",
                    sorter: true,
                    sortOrder: sorted.field === "created_at" && sorted.order,
                },
                {
                    title: "Operation",
                    dataIndex: "operation",
                },
            ];
        });

        return {
            formRef,
            formState,
            expand,
            onFinish,
            columns,
            posts,
            onDelete,
            pagination,
            onChange,
            onTableChange,
            resetFields,
        };
    },
});
</script>
