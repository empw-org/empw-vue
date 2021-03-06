<template>
  <div class="profile-container">
    <div class="profile-info-and-navigation">
      <div class="info-section">
        <i class="user icon"></i>
        <h2>{{ loginData.name }}</h2>
        <p>{{ loginData.email }}</p>
      </div>

      <div class="navigation-section">
        <ul>
          <li>
            <router-link :to="{ name: 'user-new-water-order' }">
              <ProfileNavigationItem path="new-water-order">
                <i slot="icon" class="wpforms icon"></i>
                <span slot="text">New Water Order</span>
              </ProfileNavigationItem>
            </router-link>
          </li>

          <li>
            <router-link :to="{ name: 'user-water-orders' }">
              <ProfileNavigationItem path="water-orders">
                <i slot="icon" class="tint icon"></i>
                <span slot="text">Water Orders</span>
              </ProfileNavigationItem>
            </router-link>
          </li>

          <li>
            <router-link :to="{ name: 'user-consumption-reports' }">
              <ProfileNavigationItem path="consumption-reports">
                <i slot="icon" class="chart bar icon"></i>
                <span slot="text">Consumption Reports</span>
              </ProfileNavigationItem>
            </router-link>
          </li>

          <li>
            <router-link :to="{ name: 'user-edit-profile' }">
              <ProfileNavigationItem path="edit-profile">
                <i slot="icon" class="edit icon"></i>
                <span slot="text">Edit profile</span>
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
        <img src="@/assets/images/user-dashboard.svg" />
        <h1>User Dashboard</h1>
      </div>
      <router-view class="ui container" v-else></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProfileNavigationItem from "@/components/ProfileNavigationItem.vue";
import { mapState } from "vuex";
import { AccountActionTypes } from "@/store/account-action-types";

@Component({
  components: {
    ProfileNavigationItem,
  },
  computed: mapState(["loginData"]),
})
export default class Profile extends Vue {
  onSignOut(): void {
    this.$store.dispatch(AccountActionTypes.logout);
  }

  get navigationNotSelected(): boolean {
    const path = this.$route.name;
    return path === "user-profile";
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
