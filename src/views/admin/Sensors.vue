<template>
  <div>
    <h1 class="ui center aligned icon header">
      <i class="circular microchip icon"></i>
      Sensors
    </h1>
    <div class="dimmable">
      <div class="ui active inverted dimmer" v-if="isLoading">
        <div class="ui text loader">Loading</div>
      </div>

      <div class="ui top attached tabular menu">
        <a
          class="item"
          :class="{ active: view === 'ALL_SENSORS' }"
          @click="view = 'ALL_SENSORS'"
        >
          All Sensors
        </a>
        <a
          class="item"
          :class="{ active: view === 'NEW_SENSOR' }"
          @click="view = 'NEW_SENSOR'"
        >
          Add Sensor
        </a>
      </div>
      <div class="ui bottom attached segment">
        <!-- ALL SENSORS TABLE -->
        <div v-if="view === 'ALL_SENSORS'">
          <table
            class="ui celled padded unstackable table"
            v-if="sensors.length"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Created at</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(sensor, index) in sensors" :key="index">
                <td>{{ sensor._id }}</td>
                <td>{{ sensor.user_id }}</td>
                <td>{{ date(sensor.created_at) }}</td>
                <td>
                  <div class="ui center aligned">
                    <button
                      class="ui negative button"
                      @click="onDeleteSensor(sensor._id, index)"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else>No Sensors Available</div>
        </div>
        <!-- NEW SENSOR FORM -->
        <div v-else>
          <form class="ui form" @submit.prevent="onNewSensor">
            <div class="field">
              <label>User ID</label>
              <input
                type="text"
                name="user_id"
                placeholder="e.g. 5f2aa072baee3b0001edfca3"
                required
                v-model="user_id"
              />
            </div>
            <button
              class="ui button"
              type="submit"
              :disabled="user_id === null"
            >
              Create a new sensor
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProfileNavigationItem from "@/components/ProfileNavigationItem.vue";
import { mapState } from "vuex";
import api from "@/services/api";
import moment from "moment";

@Component({
  components: {
    ProfileNavigationItem,
  },
  computed: mapState(["isLoading"]),
})
export default class AdminSensors extends Vue {
  sensors = [] as any[];
  view = "ALL_SENSORS";
  user_id = null;

  created() {
    api.admins.getSensors().then((r) => (this.sensors = r.data));
  }

  onNewSensor() {
    const { user_id } = this;
    api.admins
      .createNewSensor({ user_id })
      .then((r) => {
        this.sensors.push(r.data);
        (this as any).$swal("Okay!", "Sensor has been added", "success");
      })
      .catch((e) => {
        const error = e.response?.data || e.response?.statusText || e.message;

        (this as any).$swal("Error!", error, "error");
      });
  }

  onDeleteSensor(sensor_id: string, index: number) {
    console.log("deleting sensor", sensor_id);
    api.admins
      .deleteSensor(sensor_id)
      .then((r) => {
        console.log(r.data);
        this.sensors.splice(index, 1);
        (this as any).$swal("Okay!", "Sensor Deleted", "success");
      })
      .catch((e) => {
        const error = e.response.data || e.response.statusText;
        (this as any).$swal("Error!", error, "error");
      });
  }

  date(date: string) {
    return moment(date).format("Do MMMM, h:mm a");
  }
}
</script>
