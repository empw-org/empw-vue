<template>
  <div>
    <h1 class="ui center aligned icon header">
      <i class="circular tint icon"></i>
      WaterOrders
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
            <th>Location</th>
            <th>State</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(waterOrder, index) in waterOrders" :key="index">
            <td>{{ waterOrder._id }}</td>
            <td>{{ waterOrder.amount }}</td>
            <td>{{ waterOrder.created_at }}</td>
            <td>{{ waterOrder.location }}</td>
            <td>
              <div class="ui label" :class="stateColor[waterOrder.state]">
                {{ waterOrder.state }}
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
                <a class="item">2</a>
                <a class="item">3</a>
                <a class="item">4</a>
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

const stateColor = {
  PENDING: "orange",
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
export default class UserWaterOrders extends Vue {
  waterOrders = [] as any;
  stateColor = stateColor;

  created() {
    api.users.getMyWaterOrders().then((r) => (this.waterOrders = r.data));
  }
}
</script>
