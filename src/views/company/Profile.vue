<template>
  <div class="profile-container">
    <div class="profile-info-and-navigation">
      <div class="info-section">
        <img src="@/assets/logo/logo.png" />
        <h2>Company Name</h2>
        <p>company.email@example.com</p>
      </div>

      <div class="navigation-section">
        <ul>
          <li>
            <ProfileNavigationItem isActive="true">
              <i slot="icon" class="fas fa-hand-holding-water"></i>
              <span slot="text">Water requests</span>
            </ProfileNavigationItem>
          </li>

          <li>
            <ProfileNavigationItem>
              <i slot="icon" class="fas fa-chart-bar"></i>
              <span slot="text">Statistics</span>
            </ProfileNavigationItem>
          </li>

          <li>
            <ProfileNavigationItem>
              <i slot="icon" class="fas fa-map-marked-alt"></i>
              <span slot="text">Map</span>
            </ProfileNavigationItem>
          </li>

          <li>
            <ProfileNavigationItem>
              <i slot="icon" class="fas fa-edit"></i>
              <span slot="text">Edit profile</span>
            </ProfileNavigationItem>
          </li>

          <li>
            <ProfileNavigationItem>
              <i slot="icon" class="fas fa-door-open"></i>
              <span slot="text">Sign out</span>
            </ProfileNavigationItem>
          </li>
        </ul>
      </div>
    </div>

    <div class="selection-container"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProfileNavigationItem from "@/components/ProfileNavigationItem.vue";

@Component({
  components: {
    ProfileNavigationItem,
  },
})
export default class Profile extends Vue {}
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
}
</style>
