import createStoreConfig from "./StoreConfig";
import postApi from "./../../../api/apis/post.js";
import { createStore } from "vuex";
import { afterEach, describe, it, vi, expect } from "vitest";
import { computed } from "vue";

describe("Post Store", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    const storeConfig = createStoreConfig();
    const store = createStore(storeConfig);
    const postData = [1, 2, 3].map((id) => {
        return {
            id: id,
            content: "content" + id,
            title: "title" + id,
        };
    });

    const postsResponse = {
        data: {
            posts: {
                data: postData,
                total: postData.length,
                per_page: 25,
                current_page: 1,
            },
        },
    };

    const errorData = {
        response: {
            status: 500,
            data: {
                message: "server error",
                errors: {
                    err1: "invalid value",
                },
            },
        },
    };

    it("Test Search Success ", async () => {
        vi.spyOn(postApi, "search").mockImplementationOnce(() =>
            Promise.resolve(postsResponse)
        );
        await store.dispatch("post/search", {});
        const posts = computed(() => store.state.post.posts);
        expect(posts.value).toEqual(postsResponse.data.posts);
    });

    it("Test Search Fail", () => {
        vi.spyOn(postApi, "search").mockRejectedValueOnce(errorData);
        store.dispatch("post/search", {}).catch((error) => {
            expect(error.response?.status).toBe(errorData.response.status);
            expect(error.response?.data).toBe(errorData.response.data);
        });
    });

    const postCreate = {
        title: "title test",
        content: "content test",
    };

    const createReponse = {
        status: "ok",
        post: {
            id: 1,
            ...postCreate,
        },
    };

    it("Test Create Success ", async () => {
        vi.spyOn(postApi, "create").mockImplementationOnce(() =>
            Promise.resolve(createReponse)
        );
        const res = await store.dispatch("post/create", postCreate);
        expect(res).toEqual(createReponse);
    });

    it("Test Create Fail", () => {
        vi.spyOn(postApi, "create").mockRejectedValueOnce(errorData);
        store.dispatch("post/create", {}).catch((error) => {
            expect(error.response?.status).toBe(errorData.response.status);
            expect(error.response?.data).toBe(errorData.response.data);
        });
    });

    const postUpdate = {
        id: 1,
        title: "title test update",
        content: "content test update",
    };

    const updateReponse = {
        status: "ok",
        post: postUpdate,
    };

    it("Test Update Success ", async () => {
        vi.spyOn(postApi, "update").mockImplementationOnce(() =>
            Promise.resolve(updateReponse)
        );
        const res = await store.dispatch("post/update", postUpdate);
        expect(res).toEqual(updateReponse);
    });

    it("Test Update Fail", () => {
        vi.spyOn(postApi, "update").mockRejectedValueOnce(errorData);
        store.dispatch("post/update", {}).catch((error) => {
            expect(error.response?.status).toBe(errorData.response.status);
            expect(error.response?.data).toBe(errorData.response.data);
        });
    });

    const postDetail = {
        data: {
            post: {
                id: 1,
                title: "title test update",
                content: "content test update",
            },
            status: "ok",
        },
    };

    it("Test Detail Success ", async () => {
        vi.spyOn(postApi, "detail").mockImplementationOnce(() =>
            Promise.resolve(postDetail)
        );
        await store.dispatch("post/detail", {});
        const post = computed(() => store.state.post.post);
        expect(post.value).toEqual(postDetail.data.post);
    });

    it("Test Detail Fail", () => {
        vi.spyOn(postApi, "detail").mockRejectedValueOnce(errorData);
        store.dispatch("post/detail", {}).catch((error) => {
            expect(error.response?.status).toBe(errorData.response.status);
            expect(error.response?.data).toBe(errorData.response.data);
        });
    });

    const postDetele = {
        data: {
            status: "ok",
        },
    };

    it("Test Delete Success ", async () => {
        vi.spyOn(postApi, "delete").mockImplementationOnce(() =>
            Promise.resolve(postDetele)
        );
        const res = await store.dispatch("post/delete", 1);
        expect(res).toEqual(postDetele);
    });

    it("Test Delete Fail", () => {
        vi.spyOn(postApi, "delete").mockRejectedValueOnce(errorData);
        store.dispatch("post/delete", {}).catch((error) => {
            expect(error.response?.status).toBe(errorData.response.status);
            expect(error.response?.data).toBe(errorData.response.data);
        });
    });
});
