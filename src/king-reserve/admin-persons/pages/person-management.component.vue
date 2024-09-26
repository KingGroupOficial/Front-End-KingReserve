<script>
import DataManager from "../../../shared/components/data-manager.component.vue";
import PersonCreateAndEdit from "../components/person-create-and-edit.component.vue";
import {Origin} from "../model/origin.entity.js";
import {Person} from "@/king-reserve/admin-persons/model/person.entity.js";
import {PersonApiService} from "@/king-reserve/admin-persons/services/person-api.services.js";

export default {
  name: "person-management",
  components: { PersonCreateAndEdit, DataManager },
  props: {
    groupId: null
  },
  data() {
    return {
      title: { singular: 'Person', plural: 'Persons' },
      persons: [],
      person: {},
      address: {},
      selectedPersons: [],
      personService: null,
      isVisibleCard: false,
      isEdit: false,
      submitted: false,
      screenSize: window.innerWidth
    };
  },
  created() {
    this.origin=new Origin;
    this.personService = new PersonApiService();
    this.personService.getAll().then((response) => {
      let persons = response.data;
      this.persons = persons.filter(person => person.groupId == this.groupId)
          .map((person) => Person.toDisplayablePerson(person));
    });
  },
  methods: {
    notifySuccessfulAction(message) {
      this.$toast.add({ severity: "success", summary: "Success", detail: message, life: 3000 });
    },

    findIndexById(id) {
      return this.persons.findIndex((person) => person.id === id);
    },

    onNewItemEventHandler() {
      this.person = {};
      this.submitted = false;
      this.isEdit = false;
      this.isVisibleCard = true;
      this.address = {};
    },

    onEditItemEventHandler(item) {
      this.person = item;
      this.submitted = false;
      this.isEdit = true;
      this.isVisibleCard = true;
      this.address = this.person.address;
    },

    onDeleteItemEventHandler(item) {
      this.person = item;
      this.deletePerson();
    },

    onDeleteSelectedItemsEventHandler(selectedItems) {
      this.selectedPersons = selectedItems;
      this.deleteSelectedPersons();
    },

    onCanceledEventHandler() {
      this.submitted = false;
      this.isEdit = false;
      this.isVisibleCard = false;
    },

    onSavedEventHandler(item) {
      this.submitted = true;
      if (this.person.name) {
        if (this.isEdit) {
          this.updatePerson();
        } else {
          this.createPerson();
        }
      }
      this.isVisibleCard = false;
      this.isEdit = false;
    },

    createPerson() {
      this.person.id = 0;
      this.person = Person.fromDisplayablePerson(this.person);
      this.personService.create(this.person)
          .then((response) => {
            this.person = Person.toDisplayablePerson(response.data);
            this.persons.push(this.person);
            this.notifySuccessfulAction("Person Created");
          })
          .catch((error) => {
            console.error("Error creating person:", error);
          });
    },

    updatePerson() {
      this.person = Person.fromDisplayablePerson(this.person);
      this.personService.update(this.person.id, this.person)
          .then((response) => {
            this.persons[this.findIndexById(response.data.id)] = Person.toDisplayablePerson(response.data);
            this.notifySuccessfulAction("Person Updated");
          });
    },

    deletePerson() {
      this.personService.delete(this.person.id)
          .then(() => {
            this.persons = this.persons.filter((t) => t.id !== this.person.id);
            this.person = {};
            this.notifySuccessfulAction("Person Deleted");
          });
    },

    deleteSelectedPersons() {
      this.selectedPersons.forEach((person) => {
        this.personService.delete(person.id).then(() => {
          this.persons = this.persons.filter((t) => t.id !== person.id);
        });
      });
      this.notifySuccessfulAction("Persons Deleted");
    }
  }
};
</script>

<template>
  <div class="w-full principal-container">
    <!-- Person Data Manager -->
    <div class="container-data-table">
      <data-manager
          :title="title"
          v-bind:items="persons"
          v-on:new-item="onNewItemEventHandler"
          v-on:edit-item="onEditItemEventHandler($event)"
          v-on:delete-item="onDeleteItemEventHandler($event)"
          v-on:delete-selected-items="onDeleteSelectedItemsEventHandler($event)"
      >
        <template #custom-columns>
          <!-- Columna ID -->
          <pv-column :sortable="true" field="id" header="ID" style="min-width: 6rem" />

          <!-- Columna Nombre -->
          <pv-column :sortable="true" field="name" header="Name" style="min-width: 10rem" />

          <!-- Columna Edad -->
          <pv-column :sortable="true" field="age" header="Age" style="min-width: 8rem" />

          <!-- Columna Ciudad -->
          <pv-column :sortable="true" field="address.city" header="City" style="min-width: 8rem" />
        </template>
        <template #actions="{ slotProps }">
          <pv-button icon="pi pi-pencil" text class="mr-2" @click="onEditItemEventHandler(slotProps.data)" />
          <pv-button icon="pi pi-trash" text severity="danger" @click="onDeleteItemEventHandler(slotProps.data)" />
        </template>
      </data-manager>
    </div>

    <!-- Person Create and Edit Component -->
    <person-create-and-edit
        :item="person"
        :item2="address"
        :edit="isEdit"
        :visible="isVisibleCard"
        v-on:canceled="onCanceledEventHandler"
        v-on:saved="onSavedEventHandler($event)"
    />
  </div>
</template>

<style scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.principal-container {
  padding: 20px;
}

@media screen and (max-width: 960px) {
  :deep(.p-toolbar) {
    flex-wrap: wrap;
  }
}

@media (min-width: 1024px) {
  .tutorials {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
