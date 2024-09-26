import {createRouter, createWebHistory} from "vue-router";
import homeComponent from "@/public/page/home.component.vue";
import notFoundComponent from "@/public/page/not-found.component.vue";
import reserveManagmentComoponent from "@/king-reserve/admin-reserve/pages/reserve-managment.comoponent.vue";
import reserveDetails from "@/king-reserve/admin-reserve/components/reserve-details.vue";
/**
 * Vue Router instance
 * @type {Router} Vue Router instance creation with default configs
 * @property {Object} history - Vue Router history
 * @property {Array} routes - Vue Router routes
 */
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/home", component: homeComponent, meta: { title: "Home"} },
        // Root path
        { path: "/", component: homeComponent, meta: { title: "home"} },
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
        {
            path: "/reservation/:reservationId/rooms/:roomsId",
            component:reserveDetails ,
            name: "batchDetails",
            props: true,
            meta: { title: "Batch Details" }
        },

    ]
});

router.beforeEach((to, from, next) => {
    let baseTitle = 'ACME Learning Center';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});

export default router;