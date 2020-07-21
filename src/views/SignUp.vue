<template>
  <div class="gradient-container">
    <h1 class="page-title">Sign up</h1>

    <div class="form-card">
      <form id="sign-up-form" @submit.prevent="onSubmit">
        <div class="sign-up-fields-divisor">
          <div class="form-group">
            <label>Your name</label>
            <input type="text" placeholder="Enter your name" />
          </div>

          <div class="form-group">
            <label>Your email</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div class="form-group">
            <label>Your phone</label>
            <input type="tel" placeholder="Enter your phone number" />
          </div>

          <div class="form-group">
            <label>Your SNN</label>
            <input type="text" placeholder="Enter your SNN ID" />
          </div>

          <div class="form-group">
            <label>Your average salary</label>
            <input type="text" placeholder="Enter your average salary" />
          </div>

          <div class="form-group">
            <label>Your password</label>
            <input type="password" placeholder="Enter your password" />
          </div>
        </div>

        <GradientButton type="submit">Sign up</GradientButton>
      </form>
    </div>

    <div class="have-account-text">
      Already have account?
      <router-link to="/signin" class="sign-in-link">Sign in now</router-link>
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
    margin: 10px 0 50px 0;
    font-size: 30pt;
  }

  .form-card {
    background: white;
    padding: 35px;
    border-radius: 0.5rem;
    width: 45%;
    min-width: 450px;

    .sign-up-fields-divisor {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      grid-column-gap: 15px;
    }

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
  }

  .have-account-text {
    color: white;
    margin-top: 15px;

    .sign-in-link {
      color: darken(@label-color, 20%);
    }
  }
}
</style>
