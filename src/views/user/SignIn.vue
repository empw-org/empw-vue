<template>
  <div class="gradient-container">
    <h1 class="page-title">Sign in</h1>

    <div class="form-card">
      <!-- FORGET PASSWORD FORM -->
      <form
        id="forget-password-form"
        @submit.prevent="onResetPassword"
        v-if="isForgetPassword"
      >
        <div
          v-if="forgetPasswordResponse.length"
          class="ui equal width centered grid"
        >
          <div class="row">
            <img
              src="@/assets/images/email-sent.svg"
              alt="email sent"
              width="80%"
            />
          </div>
          <div class="row">
            <p class="ui large message">{{ forgetPasswordResponse }}</p>
          </div>

          <span class="custom-link" @click="backToSignin">
            Back to Sign in</span
          >
        </div>
        <ValidationObserver v-slot="{ invalid }" v-else>
          <div class="form-group">
            <label>Your email</label>
            <ValidationProvider name="Email" v-slot="{ errors }">
              <input
                v-model="emailOrPhone"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
              />
              <ValidationError> {{ errors[0] }} </ValidationError>
            </ValidationProvider>

            <span class="custom-link" @click="isForgetPassword = false">
              Login with your password?
            </span>
          </div>

          <GradientButton
            type="submit"
            :disabled="invalid"
            :isLoading="isLoading"
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
            <span class="custom-link" @click="isForgetPassword = true">
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

          <GradientButton
            type="submit"
            :disabled="invalid"
            :isLoading="isLoading"
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
  emailOrPhone = "";
  password = "";
  isForgetPassword = false;
  forgetPasswordResponse = "";

  backToSignin(): void {
    this.isForgetPassword = false;
    this.forgetPasswordResponse = "";
  }

  onLogin(): void {
    const { emailOrPhone, password } = this;
    const body = { email: emailOrPhone, phone: emailOrPhone, password };

    this.$store
      .dispatch(`user/${AccountActionTypes.login}`, body)
      .then(() => {
        this.$router.push({ name: "user-profile" });
      })
      .catch(({ response: r }) => {
        const responseError = r.status === 401 ? r.data.message : r.data;
        (this as any).$swal("We are sorry!", responseError, "error");
      });
  }

  onResetPassword(): void {
    api.users
      .resetPassword({ email: this.emailOrPhone })
      .then((r) => {
        this.forgetPasswordResponse = r.data.message;
      })
      .catch(({ response: r }) => {
        const responseError = r.status === 401 ? r.data.message : r.data;
        (this as any).$swal("We are sorry!", responseError, "error");
      });
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
          color: @gray;
          opacity: 0.6;
        }

        &:focus {
          outline: none;
          border: 1px solid @gray;
          box-sizing: border-box;
        }
      }
    }
  }
  .custom-link {
    text-decoration: none;
    font-size: 9pt;
    display: block;
    text-align: right;
    margin-top: 10px;
    color: @dark-gray;
    cursor: pointer;
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
