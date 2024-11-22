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
        isSignedIn: false,
        visible:Boolean,
        currentUsername: "",
        showWelcome: false,
        items: [
          {label: 'Inventory', to: '/inventory'}
        ],
        hiddenRoutes: ['/sign-in', '/sign-up']
      }
    },
    methods: {
      toggleDrawer() {
        this.drawer = !this.drawer
      },
      onSignIn() {
        // Simula el inicio de sesión
        this.isSignedIn = true; // Cambia el estado de autenticación
        this.showWelcome = true; // Muestra el banner de bienvenida

        // Oculta el banner después de 3 segundos
        setTimeout(() => {
          this.showWelcome = false;
        }, 3000);
      },
      onSignUp() {
        this.router.push({name: "sign-up"});
        console.log("Sign Up clicked");
      }
    }
  }
  </script>

  <template>
    <div>
      <header>
        <pv-toolbar class="toolbar">
          <template #start>
            <pv-button
                class="menu-button"
                icon="pi pi-bars"
                @click="toggleDrawer()"
                v-if="!hiddenRoutes.includes(route.path)"
            />
          </template>
          <template #center>
            <div style="display: flex;">
              <div style="width: 20em;"></div>
              <h1 class="toolbar-title">{{ $t('kingReserve') }}</h1>
            </div>
          </template>
          <template #end>
              <authentication-section />
          </template>
        </pv-toolbar>


        <!-- Welcome Banner -->
        <div v-if="showWelcome" class="welcome-banner">
          <h2 class="welcome-message">{{ $t('welcome') }} a King Reserve</h2>
          <span class="username">{{ currentUsername }}</span>
        </div>
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
                              <span class="font-semibold text-2xl toolbar-title">{{ $t('kingReserve') }}</span>
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
  /* Toolbar */
  .toolbar {
    background-color: #f4a261;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .toolbar-title {
    color: #4d3b29;
    font-weight: 600;
    font-size: 2rem;
    text-align: center;
  }

  /* Sidebar Button */
  .menu-button {
    background-color: #4d3b29;
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .menu-button:hover {
    background-color: #2a9d8f;
    transform: scale(1.1);
  }

  /* Auth Buttons */
  .auth-buttons {
    display: flex;
    gap: 1rem;
  }

  .action-button {
    background-color: #2a9d8f;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .action-button:hover {
    background-color: #21867a;
    transform: scale(1.05);
  }

  .action-button.sign-in {
    background: linear-gradient(135deg, #2a9d8f, #38ef7d);
  }

  .action-button.sign-up {
    background: linear-gradient(135deg, #e63946, #f4a261);
  }

  /* Welcome Banner */
  .welcome-banner {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fffbea;
    color: #2a9d8f;
    padding: 2rem 3rem;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    text-align: center;
    z-index: 1000;
    animation: fadeIn 0.5s ease, fadeOut 0.5s 2.5s ease;
  }

  .welcome-message {
    font-size: 2rem;
    font-weight: bold;
  }

  .username {
    font-size: 1.5rem;
    font-weight: 600;
    color: #4d3b29;
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }

  </style>