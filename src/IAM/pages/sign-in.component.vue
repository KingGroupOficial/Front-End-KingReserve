<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="language-switcher-container">
        <LanguageSwitcher />
      </div>
      <h3 class="welcome-title">{{ $t("welcomeBack") }}</h3>
      <p class="subtitle">{{ $t("continueJourney") }}</p>

      <!-- Notificación de error -->
      <div v-if="error" class="error-notification">
        {{ error }}
      </div>

      <form @submit.prevent="onSignIn" class="form-layout">
        <div class="fields-container">
          <!-- Username Field -->
          <div class="input-group" :class="{ 'input-error': error }">
            <i class="pi pi-user"></i>
            <input
                id="username"
                v-model="username"
                class="input-field"
                placeholder="Username"
            />
          </div>

          <!-- Password Field -->
          <div class="input-group" :class="{ 'input-error': error }">
            <i class="pi pi-lock"></i>
            <input
                id="password"
                v-model="password"
                class="input-field"
                placeholder="Password"
                type="password"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <div class="submit-container">
          <button type="submit" class="p-button animated-button">LOGIN</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthenticationStore } from "@/IAM/services/authentication.store.js";
import { SignInRequest } from "@/IAM/model/sign-in.request.js";
import LanguageSwitcher from "@/public/components/language-swicher.component.vue";

export default {
  name: "sign-in",
  components: { LanguageSwitcher },
  data() {
    return {
      username: "",
      password: "",
      error: null, // Manejo de errores
    };
  },
  methods: {
    async onSignIn() {
      let authenticationStore = useAuthenticationStore();
      let signInRequest = new SignInRequest(this.username, this.password);

      try {
        const response = await authenticationStore.signIn(signInRequest, this.$router);

        if (response && response.token) {
          localStorage.setItem("authToken", response.token);
          console.log("Token stored successfully:", response.token);
          localStorage.setItem("userIDSIGN", response.id);
          console.log("User ID stored successfully:", response.id);
        } else {
          console.error("No token received");
        }
      } catch (error) {
        console.error("Sign-in failed:", error);
        this.error = "Invalid username or password."; // Mensaje de error
      }
    },
  },
};
</script>

<style scoped>
/* Wrapper del formulario */
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #4d3b29; /* Fondo marrón oscuro */
}

/* Contenedor principal */
.login-container {
  background: linear-gradient(135deg, #6b4423, #4d3b29); /* Gradiente marrón */
  padding: 2rem 3rem;
  border-radius: 1.5rem;
  text-align: center;
  width: 700px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
}

/* Switcher de idioma */
.language-switcher-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

/* Títulos y subtítulos */
.welcome-title {
  font-size: 2rem;
  font-weight: bold;
  color: #e9c46a;
  margin-bottom: 0.5rem;
}
.subtitle {
  font-size: 1.2rem;
  color: #f4a261;
  margin-bottom: 2rem;
}

/* Contenedor de los campos */
.fields-container {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;
}

/* Grupo de entrada */
.input-group {
  display: flex;
  align-items: center;
  background-color: #e9c46a; /* Fondo claro */
  border-radius: 8px;
  padding: 1rem;
  flex: 1;
  max-width: 280px;
  transition: all 0.3s ease;
}

/* Efecto de hover */
.input-group:hover {
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
}

/* Campo con error */
.input-group.input-error {
  background-color: #e63946; /* Fondo rojo */
  animation: shake 0.5s ease-in-out;
}

/* Iconos */
.input-group i {
  color: #4d3b29;
  margin-right: 1rem;
}

/* Estilo de los campos */
.input-field {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1.2rem;
  background: none;
}

/* Botón */
.p-button {
  background-color: #f4a261; /* Fondo crema */
  color: white;
  font-weight: bold;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.p-button:hover {
  background-color: #e76f51; /* Hover rojo suave */
  transform: scale(1.05);
}

/* Notificación de error */
.error-notification {
  background-color: #e63946; /* Rojo */
  color: white;
  padding: 0.8rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  animation: fadeIn 0.5s ease-in-out;
}

/* Animaciones */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes shake {
  0% {
    transform: translateX(-10px);
  }
  50% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
