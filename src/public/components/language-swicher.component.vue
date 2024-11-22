<script>
export default {
  name: "language-switcher",
  data() {
    return {
      languages: ['en', 'es'],
      language: 'en'
    };
  }
};
</script>

<template>
  <div class="language-switcher">
    <pv-select-button v-model="$i18n.locale" :options="languages" class="custom-select-button">
      <template #option="slotProps">
        <div class="language-option">
          <img
              v-if="slotProps.option === 'en'"
              src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
              alt="English"
              class="flag-icon"
          />
          <img
              v-if="slotProps.option === 'es'"
              src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg"
              alt="Español"
              class="flag-icon"
          />
          <span :class="{ 'selected-language': slotProps.option === $i18n.locale }">
            {{ slotProps.option.toUpperCase() }}
          </span>
        </div>
      </template>
    </pv-select-button>
  </div>
</template>

<style scoped>
.language-switcher {
  display: flex;
  justify-content: center; /* Center the switcher */
  margin: 1rem 0; /* Add spacing */
}

.custom-select-button {
  background: rgba(75, 42, 18, 0.85); /* Marrón oscuro con 85% de opacidad */
  color: #ffffff; /* Texto blanco */
  border: 2px solid rgba(233, 196, 106, 0.9); /* Borde dorado con algo de transparencia */
  padding: 0.5rem 1rem; /* Espaciado interno */
  border-radius: 10px; /* Esquinas redondeadas */
  cursor: pointer; /* Cursor de puntero al pasar el mouse */
  transition: all 0.3s ease; /* Transición suave */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem; /* Espaciado entre bandera y texto */
}

.custom-select-button:hover {
  background: rgba(233, 196, 106, 0.8); /* Fondo más claro al pasar el cursor */
  transform: scale(1.05); /* Efecto de agrandamiento */
}

.flag-icon {
  width: 20px; /* Tamaño de la bandera */
  height: 14px;
  border-radius: 2px; /* Bordes redondeados */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra ligera para resaltar la bandera */
}

.selected-language {
  font-weight: bold; /* Highlight selected language */
  color: #e9c46a; /* Gold color for selected text */
}

</style>
