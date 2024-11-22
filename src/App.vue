  <script>
  import { useRoute} from "vue-router";
  import LanguageSwitcher from "@/public/components/language-swicher.component.vue";
  import AuthenticationSection from "@/IAM/components/authentication-section.component.vue";

  export default {
    name: 'App',
    components: {AuthenticationSection, LanguageSwitcher},
    setup() {
      const route = useRoute();
      return { route };
    },
    data() {
      return {
        drawer: false,
        visible:Boolean,
        items: [
          {label: 'Inventory', to: '/inventory'}
        ],
        hiddenRoutes: ['/sign-in', '/sign-up']
      }
    },
    methods: {
      toggleDrawer() {
        this.drawer = !this.drawer
      }
    }
  }
  </script>

  <template>
    <div>
      <header>
        <pv-toolbar class="toolbar" fixed>
          <template #start>
            <pv-button
                class="menu-button"
                icon="pi pi-bars"
                @click="toggleDrawer()"
                v-if="!hiddenRoutes.includes(route.path)"
            />
          </template>
          <template #center>
            <h1 class="toolbar-title">{{ $t('kingReserve') }}</h1>
          </template>

          <template #end>
            <authentication-section/>
          </template>

        </pv-toolbar>
      </header>


      <div class="app-content" >

        <template>
          <div class="card flex justify-content-center">
            <pv-sidebar v-model:visible="drawer">
              <template #container="{ closeCallback }">
                <div class="flex flex-column h-full">
                  <div class="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
                          <span class="inline-flex align-items-center gap-2">
                              <img src="/src/public/page/images/icono.png" alt="logo" class="h-8"  width="75" height="75"/>
                              <span class="font-semibold text-2xl text-primary">{{ $t('kingReserve') }}</span>
                          </span>
                    <span>
                              <pv-button type="button" @click="closeCallback" icon="pi pi-times" rounded outlined class="h-2rem w-2rem"></pv-button>
                          </span>
                  </div>
                  <div class="overflow-y-auto">
                    <ul class="list-none p-3 m-0">
                      <li>
                        <div
                            v-ripple
                            v-styleclass="{
                                          selector: '@next',
                                          enterClass: 'hidden',
                                          enterActiveClass: 'slidedown',
                                          leaveToClass: 'hidden',
                                          leaveActiveClass: 'slideup'
                                      }"
                            class="p-3 flex align-items-center justify-content-between text-600 cursor-pointer p-ripple"
                        >
                          <span class="font-medium">{{ $t('myHotel') }}</span>
                          <i class="pi pi-chevron-down"></i>
                        </div>
                        <ul class="list-none p-0 m-0 overflow-hidden">
                          <li>
                            <router-link to="/" @click=toggleDrawer() style="text-decoration: none">
                              <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                <i class="pi pi-home mr-2"></i>
                                <span class="font-medium">{{ $t('home') }}</span>
                              </a>
                            </router-link>
                          </li>
                          <li>
                            <router-link to="/reservation" @click=toggleDrawer() style="text-decoration: none">
                              <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple text-decoration:none" >
                                <i class="pi pi-bookmark mr-2 " ></i>
                                <span class="font-medium">{{ $t('reserve') }}</span>
                              </a>
                            </router-link>
                          </li>
                          <li>
                            <a
                                v-ripple
                                v-styleclass="{
                                                  selector: '@next',
                                                  enterClass: 'hidden',
                                                  enterActiveClass: 'slidedown',
                                                  leaveToClass: 'hidden',
                                                  leaveActiveClass: 'slideup'
                                              }"
                                class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                            >
                              <i class="pi pi-chart-line mr-2"></i>
                              <span class="font-medium">{{ $t('reports') }}</span>
                              <i class="pi pi-chevron-down ml-auto"></i>
                            </a>
                            <ul class="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                              <li>
                                <a
                                    v-ripple
                                    v-styleclass="{
                                                          selector: '@next',
                                                          enterClass: 'hidden',
                                                          enterActiveClass: 'slidedown',
                                                          leaveToClass: 'hidden',
                                                          leaveActiveClass: 'slideup'
                                                      }"
                                    class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                                >
                                  <i class="pi pi-chart-line mr-2"></i>
                                  <span class="font-medium">Habitaciones</span>
                                  <i class="pi pi-chevron-down ml-auto"></i>
                                </a>
                                <ul class="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                                  <li>
                                    <router-link to="/stadistic" @click=toggleDrawer() style="text-decoration: none">
                                      <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                        <i class="pi pi-table mr-2"></i>
                                        <span class="font-medium">{{ $t('statistics') }}</span>
                                      </a>
                                    </router-link>
                                  </li>
                                  <li>
                                    <router-link to="/persons" @click=toggleDrawer() style="text-decoration: none">
                                      <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                        <i class="pi pi-search mr-2"></i>
                                        <span class="font-medium">{{ $t('person') }}</span>
                                      </a>
                                    </router-link>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a
                                v-ripple
                                v-styleclass="{
                                                  selector: '@next',
                                                  enterClass: 'hidden',
                                                  enterActiveClass: 'slidedown',
                                                  leaveToClass: 'hidden',
                                                  leaveActiveClass: 'slideup'
                                              }"
                                class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                            >
                              <i class="pi pi-users mr-2"></i>
                              <span class="font-medium">{{ $t('staff') }}</span>
                              <i class="pi pi-chevron-down ml-auto"></i>
                            </a>
                            <ul class="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                              <li>
                                <router-link to="/staf-view" @click=toggleDrawer() style="text-decoration: none">
                                  <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                    <i class="pi pi-users mr-2"></i>
                                    <span class="font-medium">{{ $t('viewStaff') }}</span>
                                  </a>
                                </router-link>
                              </li>
                              <li>
                                <router-link to="/staff" @click=toggleDrawer() style="text-decoration: none">
                                  <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                    <i class="pi pi-users mr-2"></i>
                                    <span class="font-medium">{{ $t('manageStaff') }}</span>
                                  </a>
                                </router-link>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a>
                              <ul class="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-auto">

                              </ul>
                            </a>
                          </li>
                          <li>
                            <router-link to="/inventory" @click=toggleDrawer() style="text-decoration: none">
                              <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                <i class="pi pi-warehouse mr-2"></i>
                                <span class="font-medium">{{ $t('inventory') }}</span>
                                <!--                            <span class="inline-flex align-items-center justify-content-center ml-auto bg-primary border-circle" style="min-width: 1.5rem; height: 1.5rem">3</span>-->
                              </a>
                            </router-link>
                          </li>

                          <li>
                            <router-link to="/service" @click="toggleDrawer()" style="text-decoration: none">
                              <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                <i class="pi pi-heart mr-2"></i>
                                <span class="font-medium">{{ $t('services') }}</span>
                              </a>
                            </router-link>
                          </li>
                          <li>
                            <router-link to="/settings" @click=toggleDrawer() style="text-decoration: none">
                              <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                <i class="pi pi-spin pi-cog mr-2" ></i>
                                <span class="font-medium">{{ $t('settings') }}</span>
                              </a>
                            </router-link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </template>
            </pv-sidebar>
          </div>
        </template>
      </div>
      <router-view/>
    </div>
  </template>

  <style scoped>
  .toolbar {
    background-color: #f4a261; /* Background color */
    border: none; /* Remove any borders */
    padding: 1rem; /* Add some padding */
  }

  .menu-button {
    background-color: #4d3b29; /* Button color */
    color: #fff; /* Button text color */
  }

  .toolbar-title {
    text-align: center;
    font-size: 2rem;
    color: #4d3b29;
  }
  </style>