<template>
  <div class="gradient-container">
    <h1 class="page-title">Reset Password</h1>

    <div class="form-card">
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
            :isLoading="isLoading"
          >
            Reset password
          </GradientButton>
        </ValidationObserver>
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
import { mapState } from "vuex";

extend("min", min);

extend("required", required);

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
  computed: mapState(["isLoading"]),
})
export default class ResetPassword extends Vue {
  password = "";
  passwordConfirmation = "";
  token = this.$route.query.token;

  onSubmit(): void {
    const { token, password } = this;
    api.users
      .changePassword({ token, password })
      .then((r) => {
        (this as any)
          .$swal("Password Changed!", r.data.message, "success")
          .finally(() => {
            this.$router.push({ name: "user-signin" });
          });
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
}
</style>
