<template>
  <div class="profile-container">
    <div class="profile-info-and-navigation">
      <div class="info-section">
        <i class="user icon"></i>
        <h2>Admin</h2>
        <p>{{ loginData.email }}</p>
      </div>

      <div class="navigation-section">
        <ul>
          <li>
            <router-link :to="{ name: 'admin-companies' }">
              <ProfileNavigationItem path="companies">
                <i slot="icon" class="table icon"></i>
                <span slot="text">Companies</span>
              </ProfileNavigationItem>
            </router-link>
          </li>

          <li>
            <router-link :to="{ name: 'admin-transporters' }">
              <ProfileNavigationItem path="transporters">
                <i slot="icon" class="car icon"></i>
                <span slot="text">Transporters</span>
              </ProfileNavigationItem>
            </router-link>
          </li>

          <li>
            <router-link :to="{ name: 'admin-sensors' }">
              <ProfileNavigationItem path="sensors">
                <i slot="icon" class="microchip icon"></i>
                <span slot="text">Sensors</span>
              </ProfileNavigationItem>
            </router-link>
          </li>

          <li>
            <router-link :to="{ name: 'admin-contact-us' }">
              <ProfileNavigationItem path="contact-us">
                <i slot="icon" class="address card icon"></i>
                <span slot="text">Contact Us</span>
              </ProfileNavigationItem>
            </router-link>
          </li>

          <li @click="onSignOut">
            <ProfileNavigationItem path="sign-out">
              <i slot="icon" class="sign-out icon"></i>
              <span slot="text">Sign out</span>
            </ProfileNavigationItem>
          </li>
        </ul>
      </div>
    </div>

    <div class="selection-container">
      <div class="not-selected-image" v-if="navigationNotSelected">
        <img src="@/assets/images/admin-dashboard.svg" alt="" width="80%" />
        <h1>Admin Dashboard</h1>
      </div>
      <router-view class="full-width" v-else></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProfileNavigationItem from "@/components/ProfileNavigationItem.vue";
import { AccountActionTypes } from "@/store/account-action-types";
import { mapState } from "vuex";

@Component({
  components: {
    ProfileNavigationItem,
  },
  computed: mapState(["loginData"]),
})
export default class AdminDashboard extends Vue {
  onSignOut(): void {
    this.$store.dispatch(AccountActionTypes.logout);
  }

  get navigationNotSelected(): boolean {
    const path = this.$route.name;
    return path === "admin-profile";
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/variables";

.profile-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  min-height: calc(100% - @header-height);

  .profile-info-and-navigation {
    border: 1px solid @gray-border-color;

    .info-section {
      height: 300px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      border-bottom: 1px solid @gray-border-color;

      i {
        font-size: 3em;
      }

      h2 {
        margin-bottom: 0.5rem;
        color: @light-blue;
      }

      p {
        color: @dark-gray;
      }
    }

    .navigation-section {
      padding: 2rem;

      ul {
        list-style: none;

        li {
          margin: 1rem 0;
        }
      }
    }
  }

  .selection-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;

    .not-selected-image {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;

      img {
        width: 50%;
      }

      h1 {
        margin-top: 3rem;
        font-size: 30pt;
        font-weight: bold;
        color: @light-blue;
        text-shadow: 1.2px 1.2px 4px #b9bbc7;
      }
    }
  }
}
</style>
