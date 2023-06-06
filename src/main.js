import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import VueDropdown from "./components/dropdown/VueDropdown.vue"

import 
{ 
  faPaperclip,faPen,faCircle,faXmark,faPlus,faUser,faHouseChimney,faEllipsis,faSearch,faStar,faXmarkCircle
} from '@fortawesome/free-solid-svg-icons';

import { faStar as star,faCalendarDays,faFileLines,faClock,faTrashCan } from "@fortawesome/free-regular-svg-icons";

library.add(
    star,faComment,faClock,faPaperclip,faStar,faHouseChimney,faEllipsis,faSearch,
    faUser,faCalendarDays,faFileLines,faPlus,faXmark,faCircle,faPen,faTrashCan,faXmarkCircle
);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App)

app.use(router)

app.component("font-awesome-icon", FontAwesomeIcon)
app.component("vue-dropdown", VueDropdown)
app.mount('#app')
