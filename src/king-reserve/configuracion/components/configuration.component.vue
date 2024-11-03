<script>
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { colorStore } from '@/store/colorStore';
import LanguageSwitcher from "@/public/components/language-swicher.component.vue";

export default {
  name: "ConfigurationComponent",
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
  <div :style="{ backgroundColor: color }" class="full-screen d-flex align-items-center justify-content-center">
    <div class="configuration-card p-shadow-3">
      <label class="subtitlehigh">{{ t('Configuration') }}</label>
      <div class="header text-center mb-4">
        <img src="https://i.imgur.com/hfmmUAR.png" alt="King Reserve Logo" class="logo" />
      </div>

      <div class="card-content">
        <div class="form-group">
          <label for="locale" class="subtitle">{{ t('SelectLanguage') }}</label>
          <language-switcher />
        </div>
        <div class="form-group">
          <label for="color" class="subtitle">{{ t('Select Theme') }}</label>
          <div class="color-display" :style="{ backgroundColor: color }"></div>
          <pv-button :label="t('Open Color Picker')" class="p-button-primary custom-button" @click="showColorModal = true" />
        </div>

        <div class="form-group">
          <pv-button :label="t('Log Out')" class="p-button-success custom-button" @click="logOut" />
        </div>
        <div class="form-group">
          <pv-button :label="t('Terms And Conditions')" class="p-button-success custom-button" @click="$router.push('/terms-and-conditions')" />
        </div>
      </div>
    </div>

    <!-- Color Options Modal -->
    <div v-if="showColorModal" class="modal-overlay">
      <div class="modal-content">
        <h3>{{ t('Select a Color') }}</h3>
        <div class="color-palette">
          <div v-for="option in colorOptions" :key="option" :style="{ backgroundColor: option }" class="color-option" @click="changeColor(option)"></div>
        </div>
        <div class="modal-buttons">
          <pv-button :label="t('Close')" class="p-button-secondary" @click="showColorModal = false" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.subtitlehigh{
  font-size: 1.5rem;
  color: saddlebrown;
  margin-bottom: 0.5rem;
}
.full-screen {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000; /* Set default background to black */
}

.configuration-card {
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  background-color: #f4a261; /* Card background color */
  color: #333;
}

.header {
  margin-bottom: 20px;
}

.logo {
  width: 150px;
}

.card-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left; /* Aligns text to the left */
}

.subtitle {
  font-size: 1.2rem; /* Increase font size for subtitles */
  color: saddlebrown; /* Change subtitle color for better contrast */
  margin-bottom: 0.5rem; /* Spacing below subtitle */
}

.color-display {
  height: 30px;
  width: 100%;
  border: 1px solid saddlebrown;
  margin-bottom: 10px;
}

.custom-button {
  width: 100%;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8); /* Slightly darker for modal */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #333; /* Darker background for modal */
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  color: #f3cc92;
  max-width: 350px;
  width: 100%;
  position: relative; /* Allow the modal to be positioned correctly */
  z-index: 1001; /* Ensure modal is above the overlay */
}

.color-palette {
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;
}

.color-option {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid sandybrown;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}
</style>