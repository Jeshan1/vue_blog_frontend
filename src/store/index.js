import { createStore } from "vuex";
import auth from "./AuthStore";
import category from "./CategoryStore";
import blog from "./BlogStore"
import contact from "./ContactStore"
import comment from "./CommentStore"
import DashboardStore from "./DashboardStore"
export default createStore({
  modules: {
    auth,
    category,
    blog,
    contact,
    comment,
    DashboardStore
  },
});
