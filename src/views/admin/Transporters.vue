<template>
  <div>
    <h1 class="ui center aligned icon header">
      <i class="circular car icon"></i>
      Transporters
    </h1>
    <div class="dimmable">
      <div class="ui active inverted dimmer" v-if="isLoading">
        <div class="ui text loader">Loading</div>
      </div>
      <table class="ui celled padded unstackable table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Car</th>
            <th>Phone Number</th>
            <th>Approved?</th>
            <th>Created at</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(transporter, index) in transporters" :key="index">
            <td>{{ transporter._id }}</td>
            <td>{{ transporter.name }}</td>
            <td>{{ transporter.email }}</td>
            <td>{{ `${transporter.car.type} ${transporter.car.model}` }}</td>
            <td>{{ transporter.phone_number }}</td>
            <td>{{ transporter.is_approved }}</td>
            <td>{{ date(transporter.created_at) }}</td>
            <td>
              <div class="ui center aligned">
                <button
                  class="ui positive button"
                  v-if="transporter.is_approved === false"
                  @click.prevent="onApproveTransporter(transporter._id, index)"
                >
                  Approve
                </button>
                <button
                  class="ui negative button"
                  @click.prevent="onDeleteTransporter(transporter._id, index)"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <th colspan="8">
              <div class="ui right floated pagination menu">
                <a class="icon item">
                  <i class="left chevron icon"></i>
                </a>
                <a class="item">1</a>
                <a class="icon item">
                  <i class="right chevron icon"></i>
                </a>
              </div>
            </th>
          </tr>
        </tfoot>
      </table>
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
export default class AdminTransporters extends Vue {
  transporters = [] as any[];

  created() {
    api.admins.getTransporters().then((r) => (this.transporters = r.data));
  }

  onApproveTransporter(transporter_id: string, index: number) {
    console.log("approving transporter", transporter_id);
    api.admins
      .approveTransporter(transporter_id)
      .then((r) => {
        console.log(r.data);

        this.transporters[index].is_approved = true;

        (this as any).$swal("Okay!", "Transporter approved", "success");
      })
      .catch((e) => {
        const error = e.response.data || e.response.statusText;
        (this as any).$swal("Error!", error, "error");
      });
  }

  onDeleteTransporter(transporter_id: string, index: number) {
    console.log("deleting transporter", transporter_id);
    api.admins
      .deleteTransporter(transporter_id)
      .then((r) => {
        console.log(r.data);
        this.transporters.splice(index, 1);
        (this as any).$swal("Okay!", "Transporter Deleted", "success");
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
