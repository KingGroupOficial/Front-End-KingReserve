<script>
import { StaffApiService } from "../services/staff-api.service.js";
import { Staff } from "../model/staff.entity.js"
import StaffEdit from "../components/staff-edit.component.vue"
import StaffCreateAndEdit from "../components/staff-create-and-edit.component.vue";
export default {
  name: "staff-management",
  components: {StaffCreateAndEdit, StaffEdit },
  data(){
    return {
      title:{ singular: 'Staff', plural: 'Staffs' },
      staffs:[],
      staff:{},
      origin:{},
      selectedStaffs:[],
      staffService:null,
      isVisibleCard: false,
      isEdit: false,
      submitted: false,
      createAndEditDialogIsVisible:false
    }
  },
  created(){
    this.staffService = new StaffApiService();
    this.staffService.getAll().then((response) => {
      console.log(response.data);
      let staffs = response.data;
      console.log(staffs);
      this.staffs = staffs.map((staff) => Staff.toDisplayableStaff(staff));
    });
    console.log(`flag: ${this.isVisibleCard}`);

    // Show advertising
    this.showWarningMessage();

  },
  methods:{

    showWarningMessage() {
      // Alert to show advertising
      alert("Warning! You are entering the page to manage sensitive information.");
    },

    notifySuccessfulAction(message){
      this.$toast.add({severity:"success", summary: "Success", detail: message, life: 3000});
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
      if (this.staff.name && this.staff.campaigns_id && this.staff.last_name && this.staff.email && this.staff.on_job_status && this.staff.job_description) {
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
      this.selectedStaffs= selectedItems;
      this.deleteSelectedStaffs();
    },

    deleteStaff(){
      this.staffService.delete(this.staff.id)
          .then(()=>{
            this.staffs=this.staffs.filter((t)=>t.id !==this.staff.id);
            this.staff = {};
            this.notifySuccessfulAction("Staff Deleted");
          })
    },

    deleteSelectedStaffs(){
      this.selectedStaffs.forEach((staff)=>{
        this.staffService.delete(staff.id).then(() =>{
          this.staffs = this.staffs.filter((t) => t.id !==this.staff.id);
        });
      });
      this.notifySuccessfulAction("Staff Deleted");
    },

    createStaff() {
      this.staff = Staff.fromDisplayableStaff(this.staff);
      this.staffService.create(this.staff)
          .then((response) => {
            this.staff = Staff.toDisplayableStaff(response.data);
            this.staffs.push(this.staff);
            this.notifySuccessfulAction("Staff Created");
            this.createAndEditDialogIsVisible=false;
          })
          .catch((error) => {
            console.error('Error creating staff:', error);
          });
    },

    updateStaff() {
      this.staff = Staff.fromDisplayableStaff(this.staff);
      this.staffService
          .update(this.staff.id, this.staff)
          .then((response) => {
            this.staffs[this.findIndexById(response.data.id)] =
                Staff.toDisplayableStaff(response.data);
            this.notifySuccessfulAction("Staff Updated");
          })
          .catch((error) => {
            console.error('Error updating staff:', error);
          });
    }
  }
}

</script>

<template>
  <div class="staff-full principal-container">
    <!-- Staff Data Manager -->
    <staff-edit
        class="custom-table"
        :title=title
        v-bind:items="staffs"
        v-on:new-item="onNewItemEventHandler"
        v-on:edit-item="onEditItemEventHandler($event)"
        v-on:delete-item="onDeleteItemEventHandler($event)"
        v-on:delete-selected-items="onDeleteSelectedItemsEventHandler($event)">

      <template #custom-columns>
        <!-- Id Column -->
        <pv-column :sortable="true" field="id" header="Id" style="min-width: 6rem"/>
        <!-- Campaigns Column -->
        <pv-column :sortable="true" field="campaigns_id" header="Campaigns" style="min-width: 6rem"/>
        <!-- Name Column -->
        <pv-column :sortable="true" field="name" header="Name" style="min-width: 6rem"/>
        <!-- Last Name Column -->
        <pv-column :sortable="true" field="last_name" header="Last Name" style="min-width: 6rem"/>
        <!-- Status Column -->
        <pv-column :sortable="false" field="on_job_status" header="Status" style="min-width: 6rem"/>
        <!-- Job Description Column -->
        <pv-column :sortable="false" field="job_description" header="Job" style="min-width: 6rem"/>
        <!-- Date Start Column -->
        <!--<pv-column :sortable="false" field="date_start" header="Date Start" style="min-width: 6rem"/>-->
        <!-- Date End Column -->
        <!--<pv-column :sortable="false" field="date_end" header="Date End" style="min-width: 6rem"/>-->
      </template>
    </staff-edit>

    <staff-create-and-edit
        :item="staff"
        :edit="isEdit"
        :visible="createAndEditDialogIsVisible"
        v-on:canceled="onCanceledEventHandler"
        v-on:saved="onSavedEventHandler($event)"/>
  </div>
</template>

<style scoped>
.principal-container{
  padding:10px;
}
</style>