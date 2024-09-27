<template>
  <div class="container">
    <!-- Cabecera con logo y título -->
    <div class="header">
      <img src="https://i.imgur.com/hfmmUAR.png" alt="King Reserve Logo" class="logo" />
      <h1 class="animated-title">Management Inventory</h1>
    </div>

    <!-- Contenedor de tarjetas -->
    <div class="cards-container">
      <div class="card" v-for="card in cards" :key="card.title">
        <pv-card class="custom-card">
          <template #title>
            <div class="card-title">
              {{ card.title }}
              <i :class="card.icon" class="card-icon"></i>
            </div>
          </template>
          <template #content>
            <div class="card-description">{{ card.description }}</div>
          </template>
          <template #footer>
            <div class="card-footer">
              <pv-button label="View" class="custom-button" @click="showInventoryDialog(card.title)"></pv-button>
            </div>
          </template>
        </pv-card>
      </div>
    </div>

    <!-- Dialogo para cada inventario -->
    <pv-dialog v-model:visible="displayDialog" :header="selectedInventory" :style="{ width: '50vw' }" :modal="true">
      <div>Inventory For {{ selectedInventory }}</div>

      <!-- Si el inventario es de comida o herramientas, mostramos contenido específico -->
      <div v-if="selectedInventory === 'Food'">
        <h4>Food Inventory Description</h4>
        <pv-toolbar>
          <template #start>
            <pv-button icon="pi pi-plus" class="mr-2 custom-add-button-long" @click="openAddDialog" />
          </template>
          <template #center>
            <pv-icon-field iconPosition="left">
              <pv-input-icon>
                <i class="pi pi-search" />
              </pv-input-icon>
              <pv-input-text placeholder="Search" />
            </pv-icon-field>
          </template>
          <template #end>
            <pv-split-button label="Save" class="custom-save-button" :model="items1"></pv-split-button>
          </template>
        </pv-toolbar>
      </div>

      <div v-else-if="selectedInventory === 'Tools'">
        <h4>Tools Inventory Description</h4>
        <pv-toolbar>
          <template #start>
            <pv-button icon="pi pi-plus" class="mr-2 custom-add-button-long" @click="openAddDialog" />
          </template>
          <template #center>
            <pv-icon-field iconPosition="left">
              <pv-input-icon>
                <i class="pi pi-search" />
              </pv-input-icon>
              <pv-input-text placeholder="Search" />
            </pv-icon-field>
          </template>
          <template #end>
            <pv-split-button label="Save" class="custom-save-button" :model="items1"></pv-split-button>
          </template>
        </pv-toolbar>
      </div>

      <!-- Lista de productos -->
      <div class="product-list">
        <ul>
          <li v-for="item in items" :key="item.id">
            <div class="product-list-item">
              <div class="product-details">
                <h5 class="product-title">{{ item.name }}</h5>
                <div class="product-quantity">Quantity: {{ item.quantity }}</div>
              </div>
              <div class="product-action">
                <pv-button icon="pi pi-pencil" class="p-button-rounded p-button-success custom-button mr-2" @click="openEditDialog(item)"></pv-button>
                <pv-button icon="pi pi-trash" class="p-button-rounded p-button-danger custom-delete-button" @click="deleteItem(item)"></pv-button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <template #footer>
        <pv-button label="Close" class="custom-close-button" @click="closeDialog"></pv-button>
        <pv-button label="Add" class="custom-add-button" @click="openAddDialog"></pv-button>
      </template>
    </pv-dialog>

    <!-- Dialogo para agregar ítems -->
    <pv-dialog v-model:visible="displayAddDialog" :header="'Add ' + selectedInventory" :style="{ width: '30vw' }" :modal="true">
      <div class="form-group">
        <label for="name">Name</label>
        <pv-input-text v-model="newItem.name" id="name" placeholder="Enter item name" />
      </div>
      <div class="form-group">
        <label for="quantity">Quantity</label>
        <pv-input-number v-model="newItem.quantity" id="quantity" placeholder="Enter item quantity" />
      </div>
      <div class="form-group">
        <label for="nroRoom">Nro. of Room</label>
        <pv-input-number v-model="newItem.nroRoom" id="nroRoom" :min="0" mode="decimal" showButtons :step="1" />
      </div>

      <template #footer>
        <pv-button label="Cancel" class="custom-close-button" @click="closeAddDialog"></pv-button>
        <pv-button label="Save" class="custom-save-button" @click="saveNewItem"></pv-button>
      </template>
    </pv-dialog>

    <!-- Dialogo para editar ítems -->
    <pv-dialog v-model:visible="displayEditDialog" :header="'Edit ' + selectedInventory" :style="{ width: '30vw' }" :modal="true">
      <div class="form-group">
        <label for="editName">Name</label>
        <pv-input-text v-model="editItemData.name" id="editName" placeholder="Enter item name" />
      </div>
      <div class="form-group">
        <label for="editQuantity">Quantity</label>
        <pv-input-number v-model="editItemData.quantity" id="editQuantity" placeholder="Enter item quantity" />
      </div>

      <template #footer>
        <pv-button label="Cancel" class="custom-close-button" @click="closeEditDialog"></pv-button>
        <pv-button label="Save" class="custom-save-button" @click="saveEditedItem"></pv-button>
      </template>
    </pv-dialog>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const displayDialog = ref(false);
    const displayAddDialog = ref(false);
    const displayEditDialog = ref(false);
    const selectedInventory = ref('');
    const items = ref([]);
    const newItem = ref({
      name: '',
      quantity: 0,
      nroRoom: 0,
    });
    const editItemData = ref({
      id: null,
      name: '',
      quantity: 0,
      nroRoom: 0,
    });
    const items1 = ref([
      { label: 'Update', icon: 'pi pi-refresh' },
      { label: 'Delete', icon: 'pi pi-times' }
    ]);

    const cards = [
      { title: 'Food', description: 'Food Inventory', icon: 'pi pi-apple' },
      { title: 'Tools', description: 'Tools Inventory', icon: 'pi pi-wrench' }
    ];

    const showInventoryDialog = async (title) => {
      selectedInventory.value = title;
      await loadInventoryData(title);
      displayDialog.value = true;
    };

    const loadInventoryData = async (title) => {
      try {
        const response = await axios.get(`http://localhost:3000/${title.toLowerCase()}`);
        items.value = response.data;
      } catch (error) {
        console.error('Error loading inventory data:', error);
      }
    };

    const openAddDialog = () => {
      newItem.value = { name: '', quantity: 0, nroRoom: 0 };
      displayAddDialog.value = true;
    };

    const saveNewItem = async () => {
      const endpoint = selectedInventory.value.toLowerCase();
      await axios.post(`http://localhost:3000/${endpoint}`, newItem.value);
      await loadInventoryData(selectedInventory.value);
      closeAddDialog();
    };

    const closeAddDialog = () => {
      displayAddDialog.value = false;
    };

    const openEditDialog = (item) => {
      editItemData.value = { ...item };
      displayEditDialog.value = true;
    };

    const saveEditedItem = async () => {
      const endpoint = `http://localhost:3000/${selectedInventory.value.toLowerCase()}/${editItemData.value.id}`;
      await axios.put(endpoint, editItemData.value);
      await loadInventoryData(selectedInventory.value);
      closeEditDialog();
    };

    const closeEditDialog = () => {
      displayEditDialog.value = false;
    };

    const deleteItem = async (item) => {
      const endpoint = selectedInventory.value.toLowerCase();
      await axios.delete(`http://localhost:3000/${endpoint}/${item.id}`);
      await loadInventoryData(selectedInventory.value);
    };

    const closeDialog = () => {
      displayDialog.value = false;
    };

    return {
      displayDialog,
      displayAddDialog,
      displayEditDialog,
      selectedInventory,
      items,
      newItem,
      editItemData,
      cards,
      items1,
      showInventoryDialog,
      closeDialog,
      openAddDialog,
      saveNewItem,
      closeAddDialog,
      openEditDialog,
      saveEditedItem,
      closeEditDialog,
      deleteItem
    };
  }
};
</script>

<style scoped>
/* Estilos generales */
.container {
  background-color: #e7d5b0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.logo {
  width: 250px;
  margin-bottom: 20px;
}

.animated-title {
  font-size: 2.5rem;
  font-weight: bold;
  animation: fadeIn 2s ease-in-out;
  text-align: center;
  color: #4d3b29;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.cards-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 40px;
}

.custom-card {
  border: none;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #fef7e0;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.custom-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
}

.card-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
  color: #4d3b29;
  margin-bottom: 10px;
}

.card-icon {
  font-size: 3rem;
  margin-top: 10px;
  color: #f4a261;
}

.card-description {
  text-align: center;
  margin: 20px 0;
  color: #4d3b29;
}

.custom-button {
  background-color: #f4a261;
  border: none;
  color: white;
  font-weight: bold;
  width: 100%;
}

.custom-button:hover {
  background-color: #e76f51;
}

.card-footer {
  display: flex;
  justify-content: center;
}

.custom-close-button {
  background-color: #ca8342;
  border: none;
  color: white;
  font-weight: bold;
  width: 100px;
}

.custom-close-button:hover {
  background-color: #ae6e3e;
}

.custom-add-button-long {
  background-color: #32cd32;
  border: none;
  color: white;
  font-weight: bold;
  width: 50px;
  height: 40px;
}

.custom-add-button {
  background-color: #f4a261;
  border: none;
  color: white;
  font-weight: bold;
  width: 100px;
}

.custom-add-button:hover {
  background-color: #e76f51;
}

.custom-save-button {
  background-color: #32cd32;
  border: none;
  color: white;
  font-weight: bold;
  width: 100px;
}

.custom-save-button:hover {
  background-color: #28a745;
}

.product-list-item {
  border-bottom: 1px solid var(--surface-d);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.product-quantity {
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.product-action {
  display: flex;
  justify-content: flex-end;
}

.custom-delete-button {
  background-color: #f95e5a;
  border: none;
  color: white;
  font-weight: bold;
  width: 40px;
}

.custom-delete-button:hover {
  background-color: #e63946;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

.form-group input {
  width: 100%;
}
</style>
