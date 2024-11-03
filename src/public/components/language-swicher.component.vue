<script>
export default {
  name: "language-switcher",
  data() {
    return {
      languages: ['en', 'es'],
      language: 'en'
    }
  }
}
</script>

<template>
  <div class="language-switcher">
    <pv-select-button v-model="$i18n.locale" :options="languages" class="custom-select-button">
      <template #option="slotProps">
        <span :class="{ 'selected-language': slotProps.option === $i18n.locale }">
          {{ slotProps.option.toUpperCase() }}
        </span>
      </template>
    </pv-select-button>
  </div>
</template>

<style scoped>
.language-switcher {
  display: flex;
  justify-content: center; /* Center the switcher */
  margin: 1rem 0; /* Add margin for spacing */
}

.custom-select-button {
  background-color: #f4a261; /* Custom background color */
  color: #fff; /* Text color */
  border: none; /* Remove border */
  padding: 0.5rem 1rem; /* Add padding */
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background-color 0.3s ease; /* Smooth transition */
}

.custom-select-button:hover {
  background-color: #e76f51; /* Darker background on hover */
}

.selected-language {
  font-weight: bold; /* Highlight selected language */
  text-decoration: underline; /* Underline selected language */
}
</style>