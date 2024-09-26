<script>
import { Reservation } from "@/king-reserve/admin-reserve/model/reserve.entity.js";

export default {
  name: "reserve-view",
  props: {
    reserve: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      items: [
        {
          label: 'Update',
          icon: 'pi pi-pencil',
          command: () => {
            this.$emit('Edit', this.reserve);
          }
        },
        {
          label: 'Delete',
          icon: 'pi pi-trash',
          command: () => {
            this.$emit('Delete', this.reserve);
          }
        }
      ]
    };
  },
  methods: {
    viewMore() {
      this.$emit('viewMore', this.reserve);
    },
    formatDate(date) {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    },
    getConditionClass(condition) {
      if (condition === 'Good') {
        return 'good';
      } else if (condition === 'Warning') {
        return 'warning';
      } else {
        return 'bad';
      }
    }

  }
};
</script>

<template>
  <div :style="{ position: 'relative'} ">
    <pv-toast/>
    <pv-speed-dial :model="items" direction="down" mask :style="{ right: '-10px', top: '-15px' }"/>

    <pv-card class="custom-card">
      <template #title>
        <p class="card-title" v-if="reserve"> {{ reserve.name }}</p>
      </template>

      <template #content>
        <div class="card-content" v-if="reserve">
          <!-- Primera fila -->
          <div class="row">
            <div>
              <p>Start</p>
              <p>{{ formatDate(reserve.dateStart) }}</p>
            </div>

            <div>
              <p>End</p>
              <p>{{ formatDate(reserve.dateEnd) }}</p>
            </div>
          </div>

          <!-- Segunda fila -->
          <div class="row">
            <div>
              <p>Duration</p>
              <p>{{ reserve.duration }} days</p>
            </div>
          </div>


          <div class="state" :class="getConditionClass(reserve.condition)">
            <p>Condition</p>
            <p>{{ reserve.condition }}</p>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="card-footer" v-if="reserve">
          <pv-button label="View More" class="w-full" @click="viewMore"/>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.custom-card {
  width: 20rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem;
}

.card-title {
  font-size: 20px;
}

.card-content {
  flex-grow: 1;
  overflow-y: auto;
  margin-top: 0.1rem;
}

.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.card-footer {
  margin-top: auto;
}

.pv-button {
  margin-top: 1rem;
  width: 100%;
}

.state p {
  margin: 0;
}

.state.good {
  color: green;
}

.state.warning {
  color: orange;
}

.state.bad {
  color: red;
}

@media (min-width: 750px) {
  .custom-card {
    width: 20rem;
    height: 20rem;
  }
}
</style>
