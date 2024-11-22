<template>
  <div class="authentication-section">
    <div v-if="isSignedIn" class="signed-in-container">
      <div class="welcome-container">
        <span class="welcome-icon">👋</span>
        <div class="welcome-text">
          <h3 class="welcome-title">{{ $t("welcome") }}</h3>
          <span class="welcome-message">{{ currentUsername }}</span>
        </div>
      </div>

      <!-- Mostrar términos y condiciones -->
      <terms-and-conditions
          v-if="showTerms"
          @close="hideTerms"
       show-terms/>
    </div>
    <div v-else class="signed-out-container">
      <div class="auth-buttons-container">
        <button class="action-button sign-in" @click="onSignIn">Sign In</button>
        <button class="action-button sign-up" @click="onSignUp">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script>
import TermsAndConditions from "@/public/components/termsAndConditions.component.vue";
import { useRouter } from "vue-router";
import { useAuthenticationStore } from "@/IAM/services/authentication.store.js";

export default {
  name: "authentication-section",
  components: { TermsAndConditions },
  data() {
    return {
      router: useRouter(),
      showTerms: false,
      authenticationStore: useAuthenticationStore(),
    };
  },
  computed: {
    isSignedIn() {
      return this.authenticationStore.isSignedIn;
    },
    currentUsername() {
      return this.authenticationStore.currentUsername;
    },
  },
  watch: {
    isSignedIn(newVal) {
      console.log("isSignedIn changed:", newVal); // Depuración
      if (newVal) {
        this.showTerms = true;
        console.log("showTerms set to true");
      }
    },
  },
  methods: {
    onSignIn() {
      this.router.push({ name: "sign-in" });
    },
    onSignUp() {
      this.router.push({ name: "sign-up" });
    },
    hideTerms() {
      this.showTerms = false; // Ocultar términos y condiciones
      console.log("hideTerms called");
    },
    onSignOut() {
      this.authenticationStore.signOut(this.router);
    },
  },
};
</script>



<style scoped>
/* Toolbar */
.toolbar {
  height: 80px; /* Agranda el toolbar */
  background-color: #f4a261;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
}

/* Contenedor Principal */
.authentication-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
}

/* Bienvenida */
.signed-in-container .welcome-container {
  background-color: white; /* Fondo cálido */
  padding: 0.8rem 1.2rem; /* Hacemos el cuadro más delgado */
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  animation: fadeIn 1s ease;
  max-width: 300px; /* Reducimos el ancho */
  text-align: center;
}

.welcome-icon {
  font-size: 1.5rem;
}

.welcome-text {
  text-align: left;
}

.welcome-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #264653;
}

.welcome-message {
  font-size: 1rem;
  font-weight: 600;
  color: #6b4423;
}

/* Botones de autenticación */
.auth-buttons-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.action-button {
  background-color: #4d3b29;
  color: white;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.action-button:hover {
  background-color: #6b4423;
  transform: scale(1.05);
}

/* Animación de Fade */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* Contenedor principal */
.terms-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8); /* Fondo oscuro semitransparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.terms-container {
  background: #fff; /* Fondo blanco para el contenido */
  padding: 2rem;
  border-radius: 8px;
  max-width: 800px;
  width: 90%;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
  overflow-y: auto; /* Para scroll si el contenido es muy largo */
}

.terms-container h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.terms-container p {
  font-size: 1rem;
  line-height: 1.5;
  color: #555;
}

.terms-container .close-button {
  background: #e63946;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
  transition: background 0.3s ease;
}

.terms-container .close-button:hover {
  background: #c1273b;
}

</style>
