<script>
import {FilterMatchMode} from "primevue/api";
import Toolbar from 'primevue/toolbar';
import CreateAndEdit from "../../../shared/components/create-and-edit.component.vue";
import InputSwitch from 'primevue/inputswitch';

export default {
  name: "staff-edit",
  components: {CreateAndEdit, InputSwitch},
  inheritAttrs: false,
  props: {
    items: {type: Array, required: true},
    title:  {type: { singular: '', plural: ''}, required: true},
    dynamic: {type: Boolean, default: false},
    columns: {type: Array, default: () => []},
    item: null,
    visible:Boolean,
    statuses: Array
  },
  data() {
    return {
      selectedItems: [],
      // search bar
      filters: { global: { value: null, matchMode: FilterMatchMode.CONTAINS } },
      submitted: false
    }
  },
  created() {
    this.initFilters();
  },

  methods: {
    getSeverity(status) {
      switch (status) {
        case 'Applied':
          return 'success';
        case 'Not applied':
          return 'info';
        default:
          return null;
      }
    },
    canceledEventHandler() {
      this.$emit('canceled');
    },
    savedEventHandler() {
      console.log(this.item);
      this.submitted = true;
      // Verificar si los campos requeridos están llenos
      if (this.item.name && this.item.code && this.item.status) {
        this.$emit('saved', this.item);
      }
    },
    initFilters() {
      this.filters = {global: {value: null, matchMode: FilterMatchMode.CONTAINS}};
    },
    newItem() {
      this.$emit('new-item');
    },
    confirmDeleteSelected() {
      this.$confirm.require({
        message:          `Are you sure you want to delete the selected ${this.title.plural}?`,
        header:           'Confirmation',
        icon:             'pi pi-exclamation-triangle',
        rejectClassName:  'p-button-secondary p-button-outlined',
        rejectLabel:      'Cancel',
        acceptLabel:      'Delete',
        acceptClassName:  'p-button-danger',
        accept:           () => this.$emit('delete-selected-items', this.selectedItems),
        reject:           () => {}
      });
    },
    editItem(item) {
      this.$emit('edit-item', item);
    },
    confirmDeleteItem(item) {
      this.$confirm.require({
        message:          `Are you sure you want to delete this ${this.title.singular}?`,
        header:           'Confirmation',
        icon:             'pi pi-exclamation-triangle',
        rejectClassName:  'p-button-secondary p-button-outlined',
        rejectLabel:      'Cancel',
        acceptLabel:      'Delete',
        acceptClassName:  'p-button-danger',
        accept:           () => this.$emit('delete-item', item),
        reject:           () => {}
      });
    },
  },
}

</script>

<template>
  <pv-toast/>
  <pv-confirm-dialog/>
  <h3>Manage {{ title.singular }}</h3>

  <!-- Toolbar Section -->
  <pv-toolbar class="mb-4">


    <template #start>
      <div class="flex justify-content-end">
        <pv-icon-field iconPosition="left">
          <pv-input-icon>
            <i class="pi pi-search" />
          </pv-input-icon>
          <pv-input-text v-model="filters['global'].value" placeholder="Search Workers" />
        </pv-icon-field>
      </div>
    </template>
    <!-- New Button -->
    <template #end>
      <pv-button class="mr-2" icon="pi pi-plus" label="New" severity="success" @click="newItem"/>
    </template>

    <!-- Global Search -->


  </pv-toolbar>

  <!-- Data Table Section -->
  <pv-data-table
      ref="dt"
      v-model:selection="selectedItems"
      :filters="filters"
      :paginator="true"
      :rows="10"
      :rows-per-page-options="[5, 10, 20]"
      :value="items"
      :globalFilterFields="['id', 'campaigns_id', 'name', 'last_name', 'on_job_status', 'job_description']"
      current-page-report-template="Showing {first} to {last} of {totalRecords} ${{title.plural}}"
      data-key="id"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown">

    <template #empty> No staff found. </template>

    <template #loading> Loading staff data. Please wait. </template>

    <!-- Data Table Columns -->
    <slot name="custom-columns"></slot>
    <pv-column v-if="dynamic" v-for="column in columns" :key="column.field" :field="column.field" :header="column.header"/>
    <pv-column :exportable="false" style="min-width:8rem">
      <template #body="slotProps">
        <pv-button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editItem(slotProps.data)"/>
        <pv-button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteItem(slotProps.data)"/>
      </template>
    </pv-column>

  </pv-data-table>

</template>

<style scoped>

</style>