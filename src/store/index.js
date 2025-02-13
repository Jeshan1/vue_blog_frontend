import { createStore } from "vuex";
import auth from "./AuthStore";
import category from "./CategoryStore";
import blog from "./BlogStore"

export default createStore({
  modules: {
    auth,
    category,
    blog
  },
});
