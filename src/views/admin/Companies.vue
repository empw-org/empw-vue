<template>
  <div class="">
    <h1 class="ui center aligned icon header">
      <i class="circular table icon"></i>
      Companies
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
            <th>Phone Number</th>
            <th>Approved?</th>
            <th>Maintenance?</th>
            <th>Created at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(company, index) in companies" :key="index">
            <td>{{ company._id }}</td>
            <td>{{ company.name }}</td>
            <td>{{ company.email }}</td>
            <td>{{ company.phone_number }}</td>
            <td>{{ company.is_approved }}</td>
            <td>{{ company.maintenance }}</td>
            <td>{{ date(company.created_at) }}</td>
            <td>
              <div class="ui center aligned">
                <button
                  class="ui positive button"
                  v-if="company.is_approved === false"
                  @click.prevent="onApproveCompany(company._id, index)"
                >
                  Approve
                </button>
                <button
                  class="ui negative button"
                  @click.prevent="onDeleteCompany(company._id, index)"
                >
                  Delete
                </button>
              </div>
            </td>
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
import { GlobalMutationTypes } from "@/store/mutation-types";
import moment from "moment";

@Component({
  components: {
    ProfileNavigationItem,
  },
  computed: mapState(["isLoading"]),
})
export default class AdminCompanies extends Vue {
  companies = [] as any;

  created() {
    api.admins.getCompanies().then((r) => (this.companies = r.data));
  }

  onApproveCompany(company_id: string, index: number) {
    console.log("approving company", company_id);
    api.admins
      .approveCompany(company_id)
      .then((r) => {
        console.log(r.data);

        this.companies[index].is_approved = true;

        (this as any).$swal("Okay!", "Comapny approved", "success");
      })
      .catch((e) => {
        const error = e.response.data || e.response.statusText;
        (this as any).$swal("Error!", error, "error");
      });
  }

  onDeleteCompany(company_id: string, index: number) {
    console.log("deleting company", company_id);
    api.admins
      .deleteCompany(company_id)
      .then((r) => {
        console.log(r.data);
        this.companies.splice(index, 1);
        (this as any).$swal("Okay!", "Comapny Deleted", "success");
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
