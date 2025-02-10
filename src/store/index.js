import { createStore } from "vuex";
import auth from "./AuthStore";
import category from "./CategoryStore";

export default createStore({
  modules: {
    auth,
    category
  },
});
