<script>
import {useAuthenticationStore} from "@/IAM/services/authentication.store.js";
import {SignInRequest} from "@/IAM/model/sign-in.request.js";
import LanguageSwitcher from "@/public/components/language-swicher.component.vue";

export default {
  name: "sign-in",
  components: {LanguageSwitcher},
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async onSignIn() {
      let authenticationStore = useAuthenticationStore();
      let signInRequest = new SignInRequest(this.username, this.password);

      try {
        // Llama al store y espera la respuesta
        const response = await authenticationStore.signIn(signInRequest, this.$router);

        // Si el token está presente, lo guardamos en localStorage
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
          console.log('Token stored successfully:', response.token);
          localStorage.setItem('userIDSIGN', response.id);
          console.log('ID USER stored successfully:', response.id);
        } else {
          console.error('No token received');
        }
      } catch (error) {
        // Maneja el error si ocurre
        console.error('Sign-in failed:', error);
      }
    }
  }
}
</script>
<template>
  <div class="login-wrapper">
    <div class="login-container">
      <LanguageSwitcher />
      <h3>{{ $t('welcomeBack') }}</h3>
      <p>{{ $t('continueJourney') }}</p>
      <form @submit.prevent="onSignIn">
        <div class="p-fluid">
          <div class="field mt-5">
            <div class="input-group">
              <i class="pi pi-user"></i>
              <pv-float-label>
                <pv-input-text id="username" v-model="username" :class="{'p-invalid': !username}"/>
                <label for="username">Username</label>
              </pv-float-label>
            </div>
            <small v-if="!username" class="p-invalid">Username is required</small>
          </div>
          <div class="field mt-5">
            <div class="input-group">
              <i class="pi pi-lock"></i>
              <pv-float-label>
                <pv-input-text id="password" v-model="password" :class="{'p-invalid': !password}" type="password"/>
                <label for="password">Password</label>
              </pv-float-label>
            </div>
            <small v-if="!password" class="p-invalid">Password is required</small>
          </div>
          <div class="field mt-5">
            <button type="submit" class="p-button p-button-primary">LOGIN</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e76f51;
}
.login-container {
  background-color: #A52A2A;
  padding: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  color: white;
  width: 400px;
}
.field {
  width: 100%;
  margin-top: 1rem;
}
.input-group {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  padding: 0.5rem;
}
.input-group i {
  color: #e76f51;
  margin-right: 0.5rem;
}
.p-button {
  width: 100%;
  background-color: #e76f51;
  color: #A52A2A;
  text-align: center;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}
.p-button:hover {
  background-color: #e76f51;
}
.p-invalid {
  color: red;
}
</style>