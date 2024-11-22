<script>

import {useAuthenticationStore} from "@/IAM/services/authentication.store.js";
import {SignUpRequest} from "@/IAM/model/sign-up.request.js";
import LanguageSwitcher from "@/public/components/language-swicher.component.vue";

export default {
  name: "sign-up",
  components: {LanguageSwitcher},
  data() {
    return {
      username: '',
      password: '',
      hasUpperCase: false,
      hasLowerCase: false,
      hasNumber: false
    };
  },
  methods: {
    onSignUp() {
      let authenticationStore = useAuthenticationStore();
      let signUpRequest = new SignUpRequest(this.username, this.password);
      authenticationStore.signUp(signUpRequest, this.$router);
    },
    checkPasswordStrength() {
      this.hasUpperCase = /[A-Z]/.test(this.password);
      this.hasLowerCase = /[a-z]/.test(this.password);
      this.hasNumber = /[0-9]/.test(this.password);
    }
  }
}
</script>
<template>
  <div class="login-wrapper">
    <div class="login-container">
      <LanguageSwitcher />
      <h3>{{ $t('joinPecuarioPro') }}</h3>
      <p>{{ $t('embarkJourney') }}</p>
      <form @submit.prevent="onSignUp">
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
                <pv-input-text id="password" v-model="password" :class="{'p-invalid': !password}" type="password" @input="checkPasswordStrength"/>
                <label for="password">Password</label>
              </pv-float-label>
            </div>
            <small v-if="!password" class="p-invalid">Password is required</small>
            <ul class="password-requirements">
              <li :class="{ checked: hasUpperCase }">Uppercase letter</li>
              <li :class="{ checked: hasLowerCase }">Lowercase letter</li>
              <li :class="{ checked: hasNumber }">Number</li>
            </ul>
          </div>
          <div class="field mt-5">
            <button type="submit" class="p-button p-button-primary">SIGN UP</button>
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
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
.p-button:hover {
  background-color: #e76f51;
}
.p-invalid {
  color: red;
}
.password-requirements {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
  color: white;
}
.password-requirements li {
  margin-top: 5px;
}
.password-requirements .checked::before {
  content: '✓ ';
  color: green;
}
.password-requirements li:not(.checked)::before {
  content: '✗ ';
  color: red;
}
</style>