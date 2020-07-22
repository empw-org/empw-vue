<template>
  <div class="gradient-container">
    <h1 class="page-title">Sign in</h1>
    <div class="form-card">
      <form id="sign-in-form" @submit.prevent="onSubmit">
        <div class="form-group">
          <label>Your email / phone number</label>
          <input type="text" placeholder="Enter your email or phone number" />
          <router-link to="/reset-password" class="forget-password-link">
            Forget your password?
          </router-link>
        </div>

        <div class="form-group">
          <label>Your password</label>
          <input type="password" placeholder="Enter your password" />
        </div>

        <GradientButton type="submit">Sign in</GradientButton>
      </form>
    </div>
    <div class="no-account-text">
      No account?
      <router-link to="/signup" class="register-link">Register now</router-link>
    </div>
  </div>
</template>

<script>
import GradientButton from "@/components/GradientButton.vue";

export default {
  components: {
    GradientButton,
  },
};
</script>

<style scoped lang="less">
@light-blue: #00bdce;
@dark-blue: #0071d2;
@light-gray: #ebeff2;
@label-color: darken(@light-gray, 50%);
@header-height: 80px;

.gradient {
  background: linear-gradient(to right, @light-blue 6%, @dark-blue);
}

.gradient-container {
  .gradient();
  min-height: calc(100% - @header-height);
  display: flex;
  flex-direction: column;
  align-items: center;

  .page-title {
    color: white;
    margin: 50px 0 70px 0;
    font-size: 30pt;
  }

  .form-card {
    background: white;
    padding: 35px;
    border-radius: 0.5rem;
    width: 35%;
    min-width: 350px;

    .form-group {
      margin: 30px 0;

      label {
        display: block;
        color: @label-color;
      }

      input {
        display: block;
        width: 100%;
        border: none;
        border-radius: 30px;
        background-color: @light-gray;
        padding: 15px;
        margin-top: 10px;

        &::placeholder {
          color: darken(@light-blue, 10%);
          opacity: 0.6;
        }

        &:focus {
          outline: none;
          border: 1px solid darken(@light-blue, 10%);
          box-sizing: border-box;
        }
      }
    }

    .forget-password-link {
      text-decoration: none;
      font-size: 9pt;
      display: block;
      text-align: right;
      margin-top: 10px;
      color: @label-color;
    }
  }

  .no-account-text {
    color: white;
    margin: 15px 0;

    .register-link {
      color: darken(@label-color, 20%);
    }
  }
}
</style>
