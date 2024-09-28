import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-dark-green/theme.css'
import App from "./app.vue";

// PrimeIcons
import 'primeicons/primeicons.css';

// PrimeFlex
import 'primeflex/primeflex.css';

// PrimeVue Services
import ToastService from "primevue/toastservice";
import DialogService from "primevue/dialogservice";
import ConfirmationService from "primevue/confirmationservice";



// PrimeVue Components
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ConfirmDialog from "primevue/confirmdialog";
import Row from "primevue/row";
import Toolbar from "primevue/toolbar";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Sidebar from "primevue/sidebar";
import Menu from "primevue/menu";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import Dropdown from "primevue/dropdown";
import Tag from "primevue/tag";
import Card from "primevue/card";
import FileUpload from "primevue/fileupload";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputNumber from "primevue/inputnumber";
import FloatLabel from "primevue/floatlabel";
import Checkbox from "primevue/checkbox";
import Rating from "primevue/rating";
import StyleClass from "primevue/styleclass";
import router from "./router/index.js";
import Ripple from "primevue/ripple";
import Avatar from "primevue/avatar";
import SpeedDial from "primevue/speeddial";
import Calendar from "primevue/calendar";
import Chart from 'primevue/chart';
import Stepper from 'primevue/stepper';
import StepperPanel from 'primevue/stepperpanel';
import RadioButton from 'primevue/radiobutton';
import SplitButton from "primevue/splitbutton";
import Badge from 'primevue/badge';
import ProgressBar from 'primevue/progressbar';
import i18n from "@/i18n.js";
import SelectButton from "primevue/selectbutton";


createApp(App)
    .use(router)
    .use(PrimeVue, {ripple: true})
    .use(ToastService)
    .use(DialogService)
    .use(ConfirmationService)
    .use(i18n)
    .component('Chart', Chart)
    .component('ConfirmDialog', ConfirmDialog)
    .component('pv-progress-bar',ProgressBar)
    .component('pv-badge',Badge)
    .component('pv-button', Button)
    .component('pv-radio-button',RadioButton)
    .component('pv-data-table', DataTable)
    .component('pv-column', Column)
    .component('pv-confirm-dialog', ConfirmDialog)
    .component('pv-row', Row)
    .component('pv-stepper', Stepper)
    .component('pv-stepper-panel',StepperPanel)
    .component('pv-toolbar', Toolbar)
    .component('pv-input-text', InputText)
    .component('pv-textarea', Textarea)
    .component('pv-sidebar', Sidebar)
    .component('pv-menu', Menu)
    .component('pv-dialog', Dialog)
    .component('pv-toast', Toast)
    .component('pv-dropdown', Dropdown)
    .component('pv-tag', Tag)
    .component('pv-card', Card)
    .component('pv-file-upload', FileUpload)
    .component('pv-icon-field', IconField)
    .component('pv-input-icon', InputIcon)
    .component('pv-input-number', InputNumber)
    .component('pv-float-label', FloatLabel)
    .component('pv-checkbox', Checkbox)
    .component('pv-rating', Rating)
    .component('pv-avatar',Avatar)
    .component('pv-select-button', SelectButton)
    .component('pv-speed-dial',SpeedDial)
    .component('pv-calendar',Calendar)
    .component('pv-split-button', SplitButton)
    .directive('styleclass', StyleClass)
    .directive('ripple', Ripple)

    .mount('#app')

