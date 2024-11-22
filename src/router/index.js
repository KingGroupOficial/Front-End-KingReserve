import {createRouter, createWebHistory} from "vue-router";
import homeComponent from "@/public/page/home.component.vue";
import notFoundComponent from "@/public/page/not-found.component.vue";
import reserveManagmentComoponent from "@/king-reserve/admin-reserve/pages/reserve-managment.comoponent.vue";
import reserveDetails from "@/king-reserve/admin-reserve/components/reserve-details.vue";
import roomDetailsComponent from "@/king-reserve/admin-rooms/components/room-details.component.vue";
import PersonManagementComponent from "@/king-reserve/admin-persons/pages/person-management.component.vue";
import stadisticsTotalComponent from "@/king-reserve/stadistics/page/stadistics-total.component.vue";
import staffManagementComponent from "@/king-reserve/staff/pages/staff-management.component.vue";
import staffViewComponent from "@/king-reserve/staff/pages/staff-view.component.vue";
import inventoryComponent from "@/king-reserve/inventory/components/inventory.component.vue"
import configurationComponent from "@/king-reserve/configuracion/components/configuration.component.vue";
import termsAndConditionsComponent from "@/public/components/termsAndConditions.component.vue";
import ServiceManagement   from "@/king-reserve/service/pages/Service-Management.vue";
import SignUpComponent from "@/IAM/pages/sign-up.component.vue";
import SignInComponent from "@/IAM/pages/sign-in.component.vue";
import {authenticationGuard} from "@/IAM/services/authentication.guard.js";

/**
 * Vue Router instance
 * @type {Router} Vue Router instance creation with default configs
 * @property {Object} history - Vue Router history
 * @property {Array} routes - Vue Router routes
 */
const router = createRouter({
    history: createWebHistory(),
    routes: [
        // Path to sign-in and sign-up
        { path: '/sign-in', name: 'sign-in',    component: SignInComponent,meta: { title: 'Sign In' } },
        { path: '/sign-up', name: 'sign-up',    component: SignUpComponent,meta: { title: 'Sign Up' } },
        { path: "/home", component: homeComponent, meta: { title: "Home"} },
        // Root path
        { path: "/", component: homeComponent, meta: { title: "home"} },
        { path: "/persons", component: PersonManagementComponent, meta: { title: "Persons"}},
        { path: "/staff", component:staffManagementComponent , meta: { title: "Staff"}},
        { path: "/service", component:ServiceManagement , meta: { title: "Service"}},

        { path: "/staf-view", component:staffViewComponent , meta: { title: "Staff-VIEW"}},
        {path: "/inventory", component: inventoryComponent, meta: { title: "Inventory"}},
        // Path to Stadistics
        { path: "/stadistic", component: stadisticsTotalComponent, meta: { title: "Stadistics"} },
        // Path to handle unmatched URLs, using notFoundComponent
        { path: "/:catchAll(.*)", component: notFoundComponent, meta: { title: "Not Found" } },
        { path: "/reservation", component: reserveManagmentComoponent, meta: { title: "Reservation" }},
        {
            path: "/reservation/:reservationId",
            component: reserveDetails,
            name: "reserveDetails",
            props: true,
            meta: { title: "Reserve details" }
        },
        { path: "/rooms", component: roomDetailsComponent, meta: { title: "Rooms" }},
        { path: "/settings", component: configurationComponent, meta: { title: "Configuration" }},
        { path: "/terms-and-conditions", component: termsAndConditionsComponent, meta: { title: "Terms and Conditions" }}

    ]
});

router.beforeEach((to, from, next) => {
    let baseTitle = 'King Reserve';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    // Call the authentication guard
    authenticationGuard(to, from, next);
});


export default router;