<template>
  <div class="gradient-container">
    <h1 class="page-title">Sign up</h1>

    <div class="form-card">
      <form id="sign-up-form" @submit.prevent="onSubmit">
        <div class="sign-up-fields-divisor">
          <div class="form-group">
            <label>Your name</label>
            <input
              v-model="name"
              name="name"
              type="text"
              placeholder="Enter your name"
            />
          </div>

          <div class="form-group">
            <label>Your email</label>
            <input
              v-model="email"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div class="form-group">
            <label>Your phone</label>
            <input
              v-model="phone_number"
              name="phone_number"
              type="tel"
              placeholder="Enter your phone number"
            />
          </div>

          <div class="form-group">
            <label>Your SNN</label>
            <input
              v-model="ssn"
              name="ssn"
              type="text"
              placeholder="Enter your SNN ID"
            />
          </div>

          <div class="form-group">
            <label>Your average salary</label>
            <input
              v-model="salary"
              name="salary"
              type="text"
              placeholder="Enter your average salary"
            />
          </div>

          <div class="form-group">
            <label>Your password</label>
            <input
              v-model="password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
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

<script lang="ts">
import GradientButton from "@/components/GradientButton.vue";
import api from "@/services/api";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    GradientButton,
  },
})
export default class SignUp extends Vue {
  name = "";
  email = "";
  phone_number = "";
  ssn = "";
  salary = "";
  password = "";

  onSubmit(): void {
    const { name, email, phone_number, ssn, salary, password } = this;
    const body = {
      name,
      email,
      phone_number,
      ssn,
      salary,
      password,
    };
    console.log(body);
    api
      .signup(body)
      .then((r) => {
        console.log(r);
        return r.json();
      })
      .then(console.log)
      .catch(console.error);
    console.log("Submitting");
  }
}
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
    margin: 15px 0;

    .sign-in-link {
      color: darken(@label-color, 20%);
    }
  }
}
</style>
