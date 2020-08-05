<template>
  <div class="profile-container">
    <div class="profile-info-and-navigation">
      <div class="info-section">
        <img src="@/assets/images/company.svg" />
        <h2>{{ company.name }}</h2>
        <p>{{ company.email }}</p>
      </div>

      <div class="navigation-section">
        <ul>
          <li>
            <router-link :to="{ name: 'company-water-orders' }">
              <ProfileNavigationItem path="water-orders">
                <i slot="icon" class="tint icon"></i>
                <span slot="text">Water Orders</span>
              </ProfileNavigationItem>
            </router-link>
          </li>

          <li>
            <router-link :to="{ name: 'company-statistics' }">
              <ProfileNavigationItem path="statistics">
                <i slot="icon" class="chart bar icon"></i>
                <span slot="text">Statistics</span>
              </ProfileNavigationItem>
            </router-link>
          </li>

          <li>
            <router-link :to="{ name: 'company-map' }">
              <ProfileNavigationItem path="map">
                <i slot="icon" class="map icon"></i>
                <span slot="text">Map</span>
              </ProfileNavigationItem>
            </router-link>
          </li>

          <li>
            <router-link :to="{ name: 'company-edit-profile' }">
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
        <img src="@/assets/images/company-dashboard.svg" alt="" width="80%" />
        <h1>Company Dashboard</h1>
      </div>
      <router-view v-else></router-view>
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
  computed: mapState("company", ["company"]),
})
export default class Profile extends Vue {
  onSignOut(): void {
    this.$store.dispatch(`company/${AccountActionTypes.logout}`);
    this.$router.push("/");
  }

  get navigationNotSelected(): boolean {
    const path = this.$route.name;
    return path === "company-profile";
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
    display: grid;
    grid-template-rows: 1fr 2fr;
    border: 1px solid @gray-border-color;

    .info-section {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      border-bottom: 1px solid @gray-border-color;

      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 3px solid @light-blue;
        margin-bottom: 1.5rem;
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
      padding: 3rem;

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
