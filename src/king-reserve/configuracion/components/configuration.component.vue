<script>
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { colorStore } from '@/store/colorStore';
import LanguageSwitcher from "@/public/components/language-swicher.component.vue";
import {useRouter} from "vue-router";
import {useAuthenticationStore} from "@/IAM/services/authentication.store.js";

export default {
  name: "ConfigurationComponent",
  data() {
    return {
      router: useRouter(),
      authenticationStore: useAuthenticationStore()
    }
  },
  methods:{
    onSignOut() {
      this.authenticationStore.signOut(this.router);
    }
  },
  components: { LanguageSwitcher },
  setup() {
    const { t, locale } = useI18n();
    const selectedLocale = ref(locale.value);
    const color = ref(colorStore.color || '#000000'); // Default to black
    const showColorModal = ref(false); // Modal visibility
    const colorOptions = ['#000000','#f3cc92', '#FF5733', '#33FF57', '#3357FF']; // Predefined colors

    const changeLocale = (newLocale) => {
      locale.value = newLocale.value;
    };

    const changeColor = (newColor) => {
      if (typeof newColor === 'string' && /^#[0-9A-F]{6}$/i.test(newColor)) {
        color.value = newColor;
        colorStore.setColor(newColor);
      } else {
        console.error('Invalid color value:', newColor);
      }
      showColorModal.value = false; // Close the modal
    };

    const logOut = () => {
      console.log('Logged out');
    };

    return {
      t,
      selectedLocale,
      color,
      showColorModal,
      colorOptions,
      changeLocale,
      changeColor,
      logOut
    };
  }
}
</script>

<template>
  <div class="configuration-page">
    <div class="configuration-card">
      <h2 class="configuration-title">{{ t('Configuration') }}</h2>
      <div class="logo-container">
        <img src="https://i.imgur.com/hfmmUAR.png" alt="King Reserve Logo" class="logo" />
      </div>
      <div class="settings-section">
        <!-- Language Switcher -->
        <div class="setting-item">
          <label class="setting-label">{{ t('SelectLanguage') }}</label>
          <language-switcher />
        </div>
        <!-- Theme Picker -->
        <div class="setting-item">
          <label class="setting-label">{{ t('Select Theme') }}</label>
          <div class="color-display" :style="{ backgroundColor: color }"></div>
          <button class="custom-button theme-button" @click="showColorModal = true">{{ t('Open Color Picker') }}</button>
        </div>
        <!-- Sign Out -->
        <div class="setting-item">
          <button class="custom-button sign-out-button" @click="onSignOut">{{ t('Sign Out') }}</button>
        </div>
        <!-- Terms and Conditions -->
        <div class="setting-item">
          <button class="custom-button terms-button" @click="$router.push('/terms-and-conditions')">{{ t('Terms And Conditions') }}</button>
        </div>
      </div>
    </div>
    <!-- Modal for Color Picker -->
    <div v-if="showColorModal" class="modal-overlay">
      <div class="modal-content">
        <h3 class="modal-title">{{ t('Select a Color') }}</h3>
        <div class="color-palette">
          <div
              v-for="option in colorOptions"
              :key="option"
              :style="{ backgroundColor: option }"
              class="color-option"
              @click="changeColor(option)"
          ></div>
        </div>
        <button class="modal-close" @click="showColorModal = false">{{ t('Close') }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.configuration-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4a261; /* Fondo cálido */
}

.configuration-card {
  background: #4d3b29;
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.configuration-title {
  font-size: 2rem;
  font-weight: bold;
  color: WHITE; /* Marrón cálido */
  margin-bottom: 1rem;
}

.logo-container {
  margin-bottom: 2rem;
}

.logo {
  width: 120px;
}

.settings-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.setting-item {
  text-align: left;
}

.setting-label {
  font-size: 1.2rem;
  font-weight: bold;
  color: #4d3b29;
  margin-bottom: 0.5rem;
  display: block;
}

.color-display {
  width: 100%;
  height: 40px;
  border: 2px solid #4d3b29;
  border-radius: 8px;
  margin-bottom: 10px;
}

.custom-button {
  width: 100%;
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-button {
  background-color: #2a9d8f; /* Verde */
  color: white;
}

.theme-button:hover {
  background-color: #21867a;
}

.sign-out-button {
  background-color: #e63946; /* Rojo */
  color: white;
}

.sign-out-button:hover {
  background-color: #c62f39;
}

.terms-button {
  background-color: #f4a261; /* Naranja */
  color: white;
}

.terms-button:hover {
  background-color: #e76f51;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  text-align: center;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4d3b29;
  margin-bottom: 1rem;
}

.color-palette {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1.5rem;
}

.color-option {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #4d3b29;
  transition: transform 0.3s ease;
}

.color-option:hover {
  transform: scale(1.2);
}

.modal-close {
  background-color: #e63946;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.modal-close:hover {
  background-color: #c62f39;
}

</style>