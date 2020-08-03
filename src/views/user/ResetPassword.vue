<template>
  <div class="gradient-container">
    <h1 class="page-title">Reset Password</h1>

    <div class="form-card">
      <div class="errors-array-response" v-if="responseError.length">
        <ValidationError> * {{ responseError }} </ValidationError>
      </div>

      <!-- RESET PASSWORD FORM -->
      <form id="reset-password-form" v-if="token" @submit.prevent="onSubmit">
        <ValidationObserver v-slot="{ invalid }">
          <div class="form-group">
            <label>New password</label>
            <ValidationProvider name="Password" v-slot="{ errors }">
              <input
                v-model="password"
                name="Password"
                type="password"
                placeholder="Enter your new password"
                minlength="8"
                required
              />
              <ValidationError> {{ errors[0] }} </ValidationError>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="password">Password Confirmation</label>
            <ValidationProvider
              name="Password Confirmation"
              rules="required|password:@Password"
              v-slot="{ errors }"
            >
              <input
                name="password-confirmation"
                type="password"
                placeholder="Confirm new password"
                v-model="passwordConfirmation"
              />
              <ValidationError> {{ errors[0] }} </ValidationError>
            </ValidationProvider>
          </div>
          <GradientButton
            type="submit"
            :disabled="invalid"
            :isLoading="loading"
          >
            Reset password
          </GradientButton>
        </ValidationObserver>
        <div>{{ response }}</div>
      </form>

      <div class="no-token" v-else>
        <h1>No token is provided!</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import api from "@/services/api";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required, min } from "vee-validate/dist/rules";
import { Component, Vue } from "vue-property-decorator";
import GradientButton from "@/components/GradientButton.vue";
import ValidationError from "@/components/ValidationError.vue";

extend("min", {
  ...min,
  message: "{_field_} must be at least {length} characters",
});

extend("required", {
  ...required,
  message: "{_field_} is required",
});

extend("password", {
  params: ["target"],
  validate(value, { target }: any) {
    return value === target;
  },
  message: "Password confirmation does not match",
});

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
    GradientButton,
    ValidationError,
  },
})
export default class ResetPassword extends Vue {
  password = "";
  passwordConfirmation = "";
  responseError = "";
  errors = "";
  state = "";
  response = "";
  loading = false;
  token = this.$route.query.token;

  onSubmit(): void {
    const { token, password } = this;
    this.loading = true;
    api.users
      .changePassword({ token, password })
      .then((r) => {
        console.log(r);
        return r.data;
      })
      .then(console.log)
      .catch(console.error)
      .finally(() => (this.loading = false));
  }
}
</script>

<style scoped lang="less">
@import "@/assets/variables";

.gradient-container {
  .gradient();
  min-height: calc(100% - @header-height);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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
  }
}
</style>
