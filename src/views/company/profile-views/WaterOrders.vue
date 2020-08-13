<template>
  <div>
    <h1 class="ui center aligned icon header">
      <i class="circular tint icon"></i>
      Water Orders
    </h1>
    <div class="dimmable">
      <div class="ui active inverted dimmer" v-if="isLoading">
        <div class="ui loader"></div>
      </div>
      <table class="ui celled padded unstackable table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Created at</th>
            <th>Transporter</th>
            <th>State</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(waterOrder, index) in waterOrders" :key="index">
            <td>{{ waterOrder._id }}</td>
            <td>{{ waterOrder.amount }}</td>
            <td>{{ date(waterOrder.created_at) }}</td>
            <td>
              {{ waterOrder.transporter ? waterOrder.transporter.name : "N/A" }}
            </td>
            <td>
              <div class="ui label" :class="stateColor[waterOrder.state]">
                {{ waterOrder.state }}
              </div>
            </td>
            <td>
              <div class="ui center aligned">
                <div class="ui buttons">
                  <button
                    class="ui positive button"
                    @click.prevent="onReadyForShipping(waterOrder._id, index)"
                  >
                    Ready!
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <th colspan="6">
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

const stateColor = {
  ASSIGNED_TO_COMPANY: "yellow",
  READY_FOR_SHIPPING: "olive",
  ASSIGNED_TO_TRANSPORTER: "green",
  ON_ITS_WAY: "teal",
  DELIVERED: "blue",
};

@Component({
  components: {
    ProfileNavigationItem,
  },
  computed: mapState(["isLoading"]),
})
export default class CompanyWaterOrders extends Vue {
  waterOrders = [] as any;
  stateColor = stateColor;

  created() {
    api.companies.getAssignedOrders().then((r) => (this.waterOrders = r.data));
  }

  onReadyForShipping(order_id: string, index: number) {
    console.log("setting order", order_id, "as ready for shipping");
    api.companies
      .markOrderAsReadyForShipping(order_id)
      .then(() => {
        this.waterOrders[index].state = "READY_FOR_SHIPPING";
        (this as any).$swal(
          "Okay!",
          "order has been set as ready for shipping",
          "success"
        );
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
