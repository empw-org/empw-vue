<template>
  <div>
    <h1 class="ui center aligned icon header">
      <i class="circular edit icon"></i>
      Edit Profile
    </h1>
    <div class="ui container">
      <form
        class="ui form"
        :class="{ loading: isLoading }"
        @submit.prevent="onEditCompanyProfile"
      >
        <div class="ui stackable grid container">
          <div class="ui eight wide column">
            <div class="field">
              <label>Name</label>
              <input type="email" v-model="companyData.email" />
            </div>
            <div class="field">
              <label>E-mail</label>
              <input type="text" v-model="companyData.name" />
            </div>
            <div class="field">
              <label>Password</label>
              <input type="password" v-model="companyData.password" />
            </div>
          </div>
          <div class="ui eight wide column">
            <div class="field">
              <label>Location</label>
              <input type="text" v-model="companyData.location" />
            </div>
            <div class="field">
              <label>Phone Number</label>
              <input type="text" v-model="companyData.phone_number" />
            </div>
            <div class="field">
              <div class="ui compact segment">
                <div class="ui toggle checkbox">
                  <input type="checkbox" v-model="companyData.maintenance" />
                  <label>Maintenance mode</label>
                </div>
              </div>
            </div>
          </div>
          <div class="ui six wide column">
            <div class="ui submit button">Save</div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import api from "@/services/api";
import { mapState } from "vuex";
import { CompanyMutationTypes } from "@/store/modules/company/mutation-types";

@Component({
  computed: mapState(["isLoading"]),
})
export default class CompanyEditProfile extends Vue {
  companyData = { ...this.$store.state.company.company };
  created() {
    api.companies.getProfile().then((r) => {
      this.companyData = r.data;
      this.$store.commit(
        `company/${CompanyMutationTypes.SET_COMPANY_DATA}`,
        r.data
      );
    });
  }
  onEditCompanyProfile() {
    api.companies
      .editProfile(this.companyData)
      .then((r) => {
        console.log(r.data);
        this.$store.commit(
          `company/${CompanyMutationTypes.SET_COMPANY_DATA}`,
          r.data
        );
      })
      .catch((e) => console.error(e.toJSON()));
  }
}
</script>

<style></style>
