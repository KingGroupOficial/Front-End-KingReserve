<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="language-switcher-container">
        <LanguageSwitcher />
      </div>
      <h3 class="welcome-title">Sign Up to King Reserve</h3>
      <p class="subtitle">Embark on your journey towards efficient management</p>
      <form @submit.prevent="onSignUp" class="form-layout">
        <!-- Username and Password Fields -->
        <div class="fields-container">
          <div class="input-group">
            <i class="pi pi-user"></i>
            <input
                id="username"
                v-model="username"
                class="input-field"
                placeholder="Username"
            />
          </div>
          <div class="input-group">
            <i class="pi pi-lock"></i>
            <input
                id="password"
                v-model="password"
                class="input-field"
                placeholder="Password"
                type="password"
                @input="checkPasswordStrength"
            />
          </div>
        </div>

        <!-- Password Requirements -->
        <div class="password-requirements">
          <div class="requirement">
            <span class="requirement-emoji">{{ hasUpperCase ? "✔️" : "❌" }}</span>
            <span class="requirement-text">Uppercase letter</span>
          </div>
          <div class="requirement">
            <span class="requirement-emoji">{{ hasLowerCase ? "✔️" : "❌" }}</span>
            <span class="requirement-text">Lowercase letter</span>
          </div>
          <div class="requirement">
            <span class="requirement-emoji">{{ hasNumber ? "✔️" : "❌" }}</span>
            <span class="requirement-text">Number</span>
          </div>
          <div class="requirement">
            <span class="requirement-emoji">{{ password.length >= 8 ? "✔️" : "❌" }}</span>
            <span class="requirement-text">At least 8 characters</span>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="submit-container">
          <button type="submit" class="p-button animated-button">SIGN UP</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import LanguageSwitcher from "@/public/components/language-swicher.component.vue";

export default {
  name: "sign-up",
  components: { LanguageSwitcher },
  data() {
    return {
      username: "",
      password: "",
      hasUpperCase: false,
      hasLowerCase: false,
      hasNumber: false,
    };
  },
  methods: {
    onSignUp() {
      alert("Sign Up Successful!");
    },
    checkPasswordStrength() {
      const password = this.password;
      this.hasUpperCase = /[A-Z]/.test(password);
      this.hasLowerCase = /[a-z]/.test(password);
      this.hasNumber = /[0-9]/.test(password);
    },
  },
};
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #4d3b29;
}

.login-container {
  background: linear-gradient(135deg, #6b4423, #4d3b29);
  padding: 2rem 3rem;
  border-radius: 1.5rem;
  text-align: center;
  width: 700px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
}

.language-switcher-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.welcome-title {
  font-size: 2rem;
  font-weight: bold;
  color: #e9c46a;
}

.subtitle {
  font-size: 1.2rem;
  color: #f4a261;
  margin-bottom: 2rem;
}

.fields-container {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.input-group {
  display: flex;
  align-items: center;
  background-color: #e9c46a;
  border-radius: 8px;
  padding: 1rem;
  flex: 1;
  max-width: 280px;
}

.input-group i {
  color: #4d3b29;
  margin-right: 1rem;
}

.input-field {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1.2rem;
  background: none;
}

.password-requirements {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.requirement {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
}

.requirement-emoji {
  font-size: 1.5rem;
}

.submit-container {
  display: flex;
  justify-content: center;
}

.p-button {
  background-color: #f4a261;
  color: white;
  font-weight: bold;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.p-button:hover {
  background-color: #e76f51;
}
</style>
