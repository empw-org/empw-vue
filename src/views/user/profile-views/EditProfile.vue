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
        @submit.prevent="onEditUserProfile"
      >
        <div class="ui stackable grid container">
          <div class="ui eight wide column">
            <div class="field">
              <label>Name</label>
              <input type="email" v-model="userData.name" />
            </div>
            <div class="field">
              <label>E-mail</label>
              <input type="text" v-model="userData.email" />
            </div>
            <div class="field">
              <label>Password</label>
              <input type="password" v-model="userData.password" />
            </div>
          </div>
          <div class="ui eight wide column">
            <div class="field">
              <label>Salary</label>
              <input type="number" v-model="userData.salary" />
            </div>
            <div class="field">
              <label>Phone Number</label>
              <input type="text" v-model="userData.phone_number" />
            </div>
            <div class="field">
              <label>SSN</label>
              <input type="text" v-model="userData.ssn" />
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
import { UserMutationTypes } from "@/store/modules/user/mutation-types";

@Component({
  computed: mapState(["isLoading"]),
})
export default class UserEditProfile extends Vue {
  userData = { ...this.$store.state.user.user };
  created() {
    api.users.getProfile().then((r) => {
      this.userData = r.data;
      this.$store.commit(`user/${UserMutationTypes.SET_USER_DATA}`, r.data);
    });
  }
  onEditUserProfile() {
    api.users
      .editProfile(this.userData)
      .then((r) => {
        console.log(r.data);
        this.$store.commit(`user/${UserMutationTypes.SET_USER_DATA}`, r.data);
      })
      .catch((e) => console.error(e.toJSON()));
  }
}
</script>

<style></style>
