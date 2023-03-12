import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

//router
import router from "./router";

// store
import { createPinia } from "pinia";

//icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faTableList,
  faStar,
  faCloudSunRain,
  faSearch,
  faBars,
  faPlus,faTrash,
} from "@fortawesome/free-solid-svg-icons";
library.add(faTableList, faStar, faCloudSunRain, faSearch, faBars, faPlus,faTrash);

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(createPinia())
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
