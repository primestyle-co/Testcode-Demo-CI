import { createStore, createLogger } from "vuex";
import auth from "./modules/auth";
import post from "./modules/post";

const debug = true;

export default createStore({
    modules: {
        auth,
        post,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : [],
});
