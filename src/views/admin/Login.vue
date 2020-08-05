<template>
  <div class="gradient-container">
    <h1 class="page-title">Sign in</h1>

    <div class="form-card">
      <!-- SIGN IN FORM -->
      <form id="sign-in-form" @submit.prevent="onLogin">
        <ValidationObserver v-slot="{ invalid }">
          <div class="form-group">
            <label>Your email</label>
            <ValidationProvider name="Email or Phone" v-slot="{ errors }">
              <input
                v-model="email"
                name="email"
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

          <GradientButton
            type="submit"
            :disabled="invalid"
            :isLoading="isLoading"
            >Sign in</GradientButton
          >
        </ValidationObserver>
      </form>
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
  password = "";
  responseError = "";

  onLogin(): void {
    const { email, password } = this;
    const body = { email, password };

    this.$store
      .dispatch(`admin/${AccountActionTypes.login}`, body)
      .then(() => {
        this.$router.push({ name: "admin-dashboard" });
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
