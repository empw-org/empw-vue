<template>
  <div class="gradient-container">
    <h1 class="page-title">Sign in</h1>

    <div class="form-card">
      <div class="errors-array-response" v-if="responseError.length">
        <ValidationError> * {{ responseError }} </ValidationError>
      </div>

      <!-- FORGET PASSWORD FORM -->
      <form
        id="forget-password-form"
        @submit.prevent="onResetPassword"
        v-if="isForgetPassword"
      >
        <ValidationObserver v-slot="{ invalid }">
          <div class="form-group">
            <label>Your email</label>
            <ValidationProvider name="Email" v-slot="{ errors }">
              <input
                v-model="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
              />
              <ValidationError> {{ errors[0] }} </ValidationError>
            </ValidationProvider>

            <span
              class="forget-password-link"
              @click="isForgetPassword = false"
            >
              Login with your password?
            </span>
          </div>

          <GradientButton type="submit" :disabled="invalid" :isLoading="loading"
            >Reset password</GradientButton
          >
        </ValidationObserver>
      </form>

      <!-- SIGN IN FORM -->
      <form id="sign-in-form" @submit.prevent="onLogin" v-else>
        <ValidationObserver v-slot="{ invalid }">
          <div class="form-group">
            <label>Your email / phone number</label>
            <ValidationProvider name="Email or Phone" v-slot="{ errors }">
              <input
                v-model="emailOrPhone"
                name="emailOrPhone"
                type="text"
                required
                placeholder="Enter your email or phone"
              />
              <ValidationError> {{ errors[0] }} </ValidationError>
            </ValidationProvider>
            <span class="forget-password-link" @click="isForgetPassword = true">
              Forget your password?
            </span>
          </div>

          <div class="form-group">
            <label>Your password</label>
            <ValidationProvider name="Password" v-slot="{ errors }">
              <input
                v-model="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                minlength="8"
                required
              />
              <ValidationError> {{ errors[0] }} </ValidationError>
            </ValidationProvider>
          </div>

          <GradientButton type="submit" :disabled="invalid" :isLoading="loading"
            >Sign in</GradientButton
          >
        </ValidationObserver>
      </form>
    </div>

    <div class="no-account-text">
      No account?
      <router-link :to="{ name: 'user-signup' }" class="sign-up-link"
        >Sign up now</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import ValidationError from "@/components/ValidationError.vue";
import GradientButton from "@/components/GradientButton.vue";
import api from "@/services/api";
import { Component, Vue } from "vue-property-decorator";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { mapState } from "vuex";
import { AccountActionTypes } from "@/store/account-action-types";

extend("required", required);

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
    ValidationError,
    GradientButton,
  },
  computed: mapState(["isLoading"]),
})
export default class SignIn extends Vue {
  email = "";
  emailOrPhone = "";
  password = "";
  isForgetPassword = false;
  loading = false;
  responseError = "";

  onLogin(): void {
    const { emailOrPhone, password } = this;
    this.loading = true;

    api.users
      .login({ email: emailOrPhone, phone: emailOrPhone, password })
      .then(async (r) => {
        const json = r.data;
        if (r.status < 400) {
          // save token in localstorage
          console.log(json);
        } else {
          this.responseError = r.status === 401 ? json.message : json;
          // 500!
        }
      })
      .catch(console.error)
      .finally(() => {
        this.loading = false;
      });
  }

  onResetPassword(): void {
    const { email } = this;
    this.loading = true;
    api.users
      .resetPassword({ email })
      .then(async (r) => {
        this.responseError = r.data;
      })
      .catch(console.error)
      .finally(() => (this.loading = false));
  }
}
</script>

<style scoped lang="less">
@import "@/assets/variables";

.gradient-container {
  .page-title {
    color: white;
    margin: 10px 0 50px 0;
    font-size: 30pt;
  }

  .form-card {
    width: 35%;
    min-width: 350px;

    .form-group {
      margin: 30px 0;

      label {
        display: block;
        color: @dark-gray;
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
      color: @dark-gray;
      cursor: pointer;
    }
  }

  .no-account-text {
    color: white;
    margin: 15px 0;

    .sign-up-link {
      color: darken(@dark-gray, 20%);
    }
  }
}
</style>
