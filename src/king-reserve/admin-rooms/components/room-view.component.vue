<script>

import {Room} from "@/king-reserve/admin-rooms/model/room.entity.js";

export default {
  name: "room-view",
  components: {},
  props:{
    room: Room
  },
  data() {

    return {
      items: [
        {
          label: 'Update',
          icon: 'pi pi-pencil',
          command: () => {
            this.$emit('Edit', this.room);
          }
        },
        {
          label: 'Delete',
          icon: 'pi pi-trash',
          command: () => {
            this.$emit('Delete', this.room);
          }
        }
      ]
    }

  },
  methods:{
    viewPersons(){
      this.$emit('viewPersons', this.room);
    }
  }
}
</script>

<template>
  <div :style="{ position: 'relative'} ">

    <pv-speed-dial :model="items" direction="down" mask :style="{ right: '-10px', top: '-15px' }" />

    <pv-card class="custom-card">
      <template #title>{{room.name}}</template>

      <template #subtitle>
        <div class="container-subtitle">
          <p style="font-weight:bold">Area:</p>
          <p>{{room.area}}</p>
        </div>
      </template>

      <template #content>
        <div>
          <p style="font-weight:bold">Status</p>
          <p>{{room.status}}</p>
        </div>
      </template>

      <template #footer>
        <div class="flex gap-3 mt-1">
          <pv-button label="View Persons" class="w-full" @click="viewPersons" />
        </div>
      </template>
    </pv-card>

  </div>
</template>

<style scoped>
.custom-card {
  width: 18rem; /* Reduce el ancho para hacerlo más compacto */
  height: auto; /* Permite que la altura se ajuste automáticamente al contenido */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem; /* Añade más padding para dar un poco de espacio interno */
  background-color: black; /* Fondo claro para destacar el contenido */
  border-radius: 10px; /* Bordes redondeados para un aspecto más moderno */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave para darle un efecto elevado */
  transition: transform 0.3s ease; /* Añade una animación suave cuando se interactúa */
}

.custom-card:hover {
  transform: scale(1.05); /* Efecto de ampliación cuando el usuario pasa el ratón */
}

.container-subtitle {
  display: flex;
  gap: 5px;
  align-items: center;
  font-size: 0.9rem; /* Tamaño de fuente más pequeño para subtítulos */
  color: #666666; /* Color de texto más suave para contraste */
}

.custom-card p {
  margin: 0; /* Elimina el margen predeterminado para evitar espacio innecesario */
  font-size: 1rem; /* Ajusta el tamaño del texto para que sea más uniforme */
}

.custom-card p:first-of-type {
  font-weight: bold; /* Destaca los primeros párrafos de cada sección */
}

.flex {
  display: flex;
}

.gap-3 {
  gap: 0.75rem; /* Espaciado entre los botones */
}

.w-full {
  width: 100%; /* Botones a lo largo de todo el ancho */
}

.mt-1 {
  margin-top: 0.25rem; /* Añade un pequeño margen superior a los botones */
}

/* Estilo adicional para los botones */
.pv-button {
  background-color: #007ad9; /* Color de fondo del botón */
  color: white; /* Texto en blanco */
  border-radius: 5px; /* Bordes redondeados */
  transition: background-color 0.3s ease; /* Animación para cambio de color */
}

.pv-button:hover {
  background-color: #005bb5; /* Color del botón cuando se hace hover */
}
</style>

