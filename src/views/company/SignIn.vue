<template>
  <div class="gradient-container">
    <h1 class="page-title">Company - Sign in</h1>

    <div class="form-card">
      <!-- SIGN IN FORM -->
      <form id="sign-in-form" @submit.prevent="onLogin">
        <ValidationObserver v-slot="{ invalid }">
          <div class="form-group">
            <label>Company email / phone number</label>
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
          </div>

          <div class="form-group">
            <label>Company password</label>
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
          >
            Sign in
          </GradientButton>
        </ValidationObserver>
      </form>
    </div>

    <div class="no-account-text">
      No account?
      <router-link :to="{ name: 'company-signup' }" class="sign-up-link">
        Sign up now
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import ValidationError from "@/components/ValidationError.vue";
import GradientButton from "@/components/GradientButton.vue";
import { Component, Vue } from "vue-property-decorator";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { AccountActionTypes } from "@/store/account-action-types";
import { mapState } from "vuex";

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

  onLogin(): void {
    const { emailOrPhone, password } = this;
    const body = { email: emailOrPhone, phone_number: emailOrPhone, password };
    this.$store
      .dispatch(`company/${AccountActionTypes.login}`, body)
      .then(() => {
        this.$router.push({ name: "company-profile" });
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
