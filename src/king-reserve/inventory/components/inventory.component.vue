<template>
  <div class="container">
    <!-- Cabecera con logo y título -->
    <div class="header">
      <img src="https://i.imgur.com/hfmmUAR.png" alt="King Reserve Logo" class="logo" />
      <h1 class="animated-title">{{ $t('inventoryManagement.title') }}</h1>
    </div>

    <!-- Contenedor de tarjetas -->
    <div class="cards-container">
      <div class="card" v-for="card in cards" :key="card.title">
        <pv-card class="custom-card">
          <template #title>
            <div class="card-title">
              {{ $t(`inventoryManagement.cards.${card.title}.title`) }}
              <i :class="card.icon" class="card-icon"></i>
            </div>
          </template>
          <template #content>
            <div class="card-description">{{ $t(`inventoryManagement.cards.${card.title}.description`) }}</div>
          </template>
          <template #footer>
            <div class="card-footer">
              <pv-button :label="$t('inventoryManagement.view')" class="custom-button" @click="showInventoryDialog(card.title)"></pv-button>
            </div>
          </template>
        </pv-card>
      </div>
    </div>

    <!-- Dialogo para cada inventario -->
    <pv-dialog v-model:visible="displayDialog" :header="selectedInventory" :style="{ width: '50vw' }" :modal="true">
      <div>{{ $t('inventoryManagement.inventoryFor') }} {{ selectedInventory }}</div>

      <!-- Si el inventario es de comida o herramientas, mostramos contenido específico -->
      <div v-if="selectedInventory === 'Food'">
        <h4>{{ $t('inventoryManagement.foodDescription') }}</h4>
        <pv-toolbar>
          <template #start>
            <pv-button icon="pi pi-plus" class="custom-plus-button mr-2" @click="openAddDialog" />
          </template>
          <template #center>
            <pv-icon-field iconPosition="left">
              <pv-input-icon>
                <i class="pi pi-search" />
              </pv-input-icon>
              <pv-input-text v-model="searchQuery" :placeholder="$t('inventoryManagement.search')" />
            </pv-icon-field>
          </template>
        </pv-toolbar>
      </div>

      <div v-else-if="selectedInventory === 'Tools'">
        <h4>{{ $t('inventoryManagement.toolsDescription') }}</h4>
        <pv-toolbar>
          <template #start>
            <pv-button icon="pi pi-plus" class="custom-plus-button mr-2" @click="openAddDialog" />
          </template>
          <template #center>
            <pv-icon-field iconPosition="left">
              <pv-input-icon>
                <i class="pi pi-search" />
              </pv-input-icon>
              <pv-input-text v-model="searchQuery" :placeholder="$t('inventoryManagement.search')" />
            </pv-icon-field>
          </template>
        </pv-toolbar>
      </div>

      <!-- Lista de productos filtrados -->
      <div class="product-list">
        <ul>
          <li v-for="item in filteredItems" :key="item.id">
            <div class="product-list-item">
              <div class="product-details">
                <h5 class="product-title">{{ item.name }}</h5>
                <div class="product-quantity">{{ $t('inventoryManagement.quantity') }}: {{ item.quantity }}</div>
              </div>
              <div class="product-action">
                <pv-button icon="pi pi-pencil" class="p-button-rounded custom-edit-button mr-2" @click="openEditDialog(item)" />
                <pv-button icon="pi pi-trash" class="p-button-rounded custom-delete-button" @click="deleteItem(item)" />
              </div>
            </div>
          </li>
        </ul>
      </div>

      <template #footer>
        <pv-button :label="$t('inventoryManagement.close')" @click="closeDialog" class="custom-close-button"></pv-button>
        <pv-button :label="$t('inventoryManagement.add')" @click="openAddDialog" class="custom-add-button"></pv-button>
      </template>
    </pv-dialog>

    <!-- Dialogo para agregar ítems -->
    <pv-dialog v-model:visible="displayAddDialog" :header="$t('inventoryManagement.add') + ' ' + selectedInventory" :style="{ width: '30vw' }" :modal="true">
      <div class="form-group">
        <label for="name">{{ $t('inventoryManagement.name') }}</label>
        <pv-input-text v-model="newItem.name" id="name" :placeholder="$t('inventoryManagement.enterName')" />
      </div>
      <div class="form-group">
        <label for="quantity">{{ $t('inventoryManagement.quantity') }}</label>
        <pv-input-number v-model="newItem.quantity" id="quantity" :placeholder="$t('inventoryManagement.enterQuantity')" />
      </div>
      <div class="form-group">
        <label for="nroRoom">{{ $t('inventoryManagement.nroRoom') }}</label>
        <pv-input-number v-model="newItem.nroRoom" id="nroRoom" :min="0" mode="decimal" showButtons :step="1" />
      </div>

      <template #footer>
        <pv-button :label="$t('inventoryManagement.cancel')" @click="closeAddDialog" class="custom-close-button"></pv-button>
        <pv-button :label="$t('inventoryManagement.save')" @click="saveNewItem" class="custom-add-button"></pv-button>
      </template>
    </pv-dialog>

    <!-- Dialogo para editar ítems -->
    <pv-dialog v-model:visible="displayEditDialog" :header="$t('inventoryManagement.edit') + ' ' + selectedInventory" :style="{ width: '30vw' }" :modal="true">
      <div class="form-group">
        <label for="editName">{{ $t('inventoryManagement.name') }}</label>
        <pv-input-text v-model="editItemData.name" id="editName" :placeholder="$t('inventoryManagement.enterName')" />
      </div>
      <div class="form-group">
        <label for="editQuantity">{{ $t('inventoryManagement.quantity') }}</label>
        <pv-input-number v-model="editItemData.quantity" id="editQuantity" :placeholder="$t('inventoryManagement.enterQuantity')" />
      </div>

      <template #footer>
        <pv-button :label="$t('inventoryManagement.cancel')" @click="closeEditDialog" class="custom-close-button"></pv-button>
        <pv-button :label="$t('inventoryManagement.save')" @click="saveEditedItem" class="custom-add-button"></pv-button>
      </template>
    </pv-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, computed } from 'vue';

const http = axios.create({
  baseURL: 'https://66f72cbdb5d85f31a3422dc2.mockapi.io',
});

export default {
  setup() {
    const displayDialog = ref(false);
    const displayAddDialog = ref(false);
    const displayEditDialog = ref(false);
    const selectedInventory = ref('');
    const items = ref([]);
    const searchQuery = ref('');
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

    const cards = [
      { title: 'Food', description: 'Food Inventory', icon: 'pi pi-apple' },
      { title: 'Tools', description: 'Tools Inventory', icon: 'pi pi-wrench' }
    ];

    const filteredItems = computed(() => {
      if (searchQuery.value === '') {
        return items.value;
      } else {
        return items.value.filter(item =>
            item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
    });

    const showInventoryDialog = async (title) => {
      selectedInventory.value = title;
      await loadInventoryData(title);
      displayDialog.value = true;
    };

    const loadInventoryData = async (title) => {
      try {
        const response = await http.get(`/${title.toLowerCase()}`);
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
      await http.post(`/${endpoint}`, newItem.value);
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
      const endpoint = `/${selectedInventory.value.toLowerCase()}/${editItemData.value.id}`;
      await http.put(endpoint, editItemData.value);
      await loadInventoryData(selectedInventory.value);
      closeEditDialog();
    };

    const closeEditDialog = () => {
      displayEditDialog.value = false;
    };

    const deleteItem = async (item) => {
      const endpoint = selectedInventory.value.toLowerCase();
      await http.delete(`/${endpoint}/${item.id}`);
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
      searchQuery,
      filteredItems,
      newItem,
      editItemData,
      cards,
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

.custom-plus-button {
  background-color: #63d99e;
  border-color: #63d99e;
}

.custom-delete-button {
  background-color: #d1655d;
  border-color: #d1655d;
}

.custom-edit-button {
  background-color: #63d99e;
  border-color: #63d99e;
}

.custom-close-button, .custom-add-button {
  background-color: #c97b47;
  border-color: #c97b47;
  color: white;
  margin-right: 10px;
}

.custom-close-button:hover, .custom-add-button:hover {
  background-color: #b3683a;
  border-color: #b3683a;
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