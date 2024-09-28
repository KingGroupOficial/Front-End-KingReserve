<script>
import { StaffApiService } from "../services/staff-api.service.js";
import { Staff } from "../model/staff.entity.js";
import StaffEdit from "../components/staff-edit.component.vue";
import StaffCreateAndEdit from "../components/staff-create-and-edit.component.vue";

export default {
  name: "staff-management",
  components: { StaffCreateAndEdit, StaffEdit },
  data() {
    return {
      title: {singular: 'Staff', plural: 'Staffs'},
      staffs: [],
      staff: {},
      origin: {},
      selectedStaffs: [],
      staffService: null,
      isVisibleCard: false,
      isEdit: false,
      submitted: false,
      createAndEditDialogIsVisible: false
    };
  },
  created() {
    this.staffService = new StaffApiService();
    this.staffService.getAll().then((response) => {
      let staffs = response.data;
      this.staffs = staffs.map((staff) => Staff.toDisplayableStaff(staff));
    });

    // Show warning message when entering the page
    this.showWarningMessage();
  },
  methods: {
    showWarningMessage() {
      alert(this.$t('staffManagement.warningMessage'));
    },

    notifySuccessfulAction(message) {
      this.$toast.add({severity: "success", summary: this.$t('success'), detail: message, life: 3000});
    },

    findIndexById(id) {
      return this.staffs.findIndex((staff) => staff.id === id);
    },

    onNewItemEventHandler() {
      this.staff = {};
      this.submitted = false;
      this.isEdit = false;
      this.createAndEditDialogIsVisible = true;
    },

    onEditItemEventHandler(item) {
      this.staff = item;
      this.submitted = false;
      this.isEdit = true;
      this.createAndEditDialogIsVisible = true;
    },

    onCanceledEventHandler() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },

    onSavedEventHandler(item) {
      this.submitted = true;
      if (this.staff.name && this.staff.email && this.staff.last_name && this.staff.on_job_status && this.staff.job_description) {
        if (this.isEdit) {
          this.updateStaff();
        } else {
          this.createStaff();
        }
      }
      this.createAndEditDialogIsVisible = false;
      this.isEdit = false;
    },

    onDeleteItemEventHandler(item) {
      this.staff = item;
      this.deleteStaff();
    },

    onDeleteSelectedItemsEventHandler(selectedItems) {
      this.selectedStaffs = selectedItems;
      this.deleteSelectedStaffs();
    },

    deleteStaff() {
      this.staffService.delete(this.staff.id)
          .then(() => {
            this.staffs = this.staffs.filter((t) => t.id !== this.staff.id);
            this.staff = {};
            this.notifySuccessfulAction(this.$t('staffManagement.staffDeleted'));
          });
    },

    deleteSelectedStaffs() {
      this.selectedStaffs.forEach((staff) => {
        this.staffService.delete(staff.id).then(() => {
          this.staffs = this.staffs.filter((t) => t.id !== staff.id);
        });
      });
      this.notifySuccessfulAction(this.$t('staffManagement.staffDeleted'));
    },

    createStaff() {
      this.staff = Staff.fromDisplayableStaff(this.staff);
      this.staffService.create(this.staff)
          .then((response) => {
            this.staff = Staff.toDisplayableStaff(response.data);
            this.staffs.push(this.staff);
            this.notifySuccessfulAction(this.$t('staffManagement.staffCreated'));
            this.createAndEditDialogIsVisible = false;
          })
          .catch((error) => {
            console.error('Error creating staff:', error);
          });
    },

    updateStaff() {
      this.staff = Staff.fromDisplayableStaff(this.staff);
      this.staffService.update(this.staff.id, this.staff)
          .then((response) => {
            this.staffs[this.findIndexById(response.data.id)] = Staff.toDisplayableStaff(response.data);
            this.notifySuccessfulAction(this.$t('staffManagement.staffUpdated'));
          })
          .catch((error) => {
            console.error('Error updating staff:', error);
          });
    }
  }
};
</script>

<template>
  <div class="staff-full principal-container">
    <!-- Staff Data Manager -->
    <staff-edit
        class="custom-table"
        :title="title"
        :items="staffs"
        @new-item="onNewItemEventHandler"
        @edit-item="onEditItemEventHandler($event)"
        @delete-item="onDeleteItemEventHandler($event)"
        @delete-selected-items="onDeleteSelectedItemsEventHandler($event)"
    >
      <template #custom-columns>
        <!-- Id Column -->
        <pv-column :sortable="true" field="id" :header="$t('id')" style="min-width: 6rem"/>
        <!-- Email Column -->
        <pv-column :sortable="true" field="email" :header="$t('email')" style="min-width: 6rem"/>
        <!-- Name Column -->
        <pv-column :sortable="true" field="name" :header="$t('name')" style="min-width: 6rem"/>
        <!-- Last Name Column -->
        <pv-column :sortable="true" field="last_name" :header="$t('lastName')" style="min-width: 6rem"/>
        <!-- Status Column -->
        <pv-column :sortable="false" field="on_job_status" :header="$t('status')" style="min-width: 6rem"/>
        <!-- Job Description Column -->
        <pv-column :sortable="false" field="job_description" :header="$t('jobDescription')" style="min-width: 6rem"/>
      </template>
    </staff-edit>

    <staff-create-and-edit
        :item="staff"
        :edit="isEdit"
        :visible="createAndEditDialogIsVisible"
        @canceled="onCanceledEventHandler"
        @saved="onSavedEventHandler($event)"
    />
  </div>
</template>

<style scoped>
.principal-container {
  padding: 10px;
}

/* Color de los botones basado en el proyecto inventory */
.pv-button {
  background-color: #4CAF50; /* Verde usado en inventory */
  border: none;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.pv-button:hover {
  background-color: #388E3C; /* Verde más oscuro al hacer hover */
}

.icon-button {
  background-color: #4CAF50; /* Verde */
  border: none;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.icon-button:hover {
  background-color: #388E3C; /* Hover en verde más oscuro */
}
</style>