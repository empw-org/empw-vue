<template>
  <div class="">
    <h1 class="ui center aligned icon header">
      <i class="circular address card icon"></i>
      Contact Us
    </h1>
    <div class="ui dimmable">
      <div class="ui active inverted dimmer" v-if="isLoading">
        <div class="ui text loader">Loading</div>
      </div>
      <table class="ui celled padded unstackable table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>From</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(msg, index) in contactUsMessages" :key="index">
            <td>{{ msg._id }}</td>
            <td>{{ msg.name }}</td>
            <td>{{ msg.email }}</td>
            <td>{{ msg.message }}</td>
            <td>{{ msg.from }}</td>
            <td>{{ msg.created_at }}</td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <th colspan="9">
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
import { mapState } from "vuex";
import api from "@/services/api";

@Component({
  computed: mapState(["isLoading"]),
})
export default class AdminCompanies extends Vue {
  contactUsMessages = [] as any;

  created() {
    api.admins
      .getContactUsMessages()
      .then((r) => (this.contactUsMessages = r.data));
  }
}
</script>
