<template>
  <div class="gradient-container">
    <h1 class="page-title">Sign up</h1>

    <div class="form-card">
      <div class="errors-array-response">
        <ValidationError v-for="(err, index) in responseErrors" :key="index">
          * {{ err }}
        </ValidationError>
      </div>

      <div>{{ responseMessage }}</div>

      <!-- PHONE VERIFICATION FORM -->
      <form
        id="verification-form"
        v-if="successfulSignup"
        @submit.prevent="onVerify"
      >
        <ValidationObserver v-slot="{ invalid }">
          <div class="form-group">
            <label>The verification code you received on your phone</label>
            <ValidationProvider name="Verification Code" v-slot="{ errors }">
              <input
                v-model="verificationCode"
                name="verification code"
                type="text"
                required
                placeholder="Enter your verfification code"
              />
              <ValidationError> {{ errors[0] }} </ValidationError>
            </ValidationProvider>
            <GradientButton
              class="submit-button"
              type="submit"
              :disabled="invalid"
              :isLoading="loading"
              >Verify</GradientButton
            >
          </div>
        </ValidationObserver>
      </form>

      <!-- SIGNUP FORM -->
      <form id="sign-up-form" @submit.prevent="onSignup" v-else>
        <ValidationObserver v-slot="{ invalid }">
          <div class="sign-up-fields-divisor">
            <div class="form-group">
              <label>Your name</label>
              <ValidationProvider name="Name" v-slot="{ errors }">
                <input
                  v-model="name"
                  name="name"
                  type="text"
                  required
                  minlength="5"
                  placeholder="Enter your name"
                />
                <ValidationError> {{ errors[0] }} </ValidationError>
              </ValidationProvider>
            </div>

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
            </div>

            <div class="form-group">
              <label>Your phone</label>
              <ValidationProvider
                name="Phone"
                :rules="{ regex: REGEX.PHONE }"
                v-slot="{ errors }"
              >
                <input
                  v-model="phone_number"
                  name="phone_number"
                  type="tel"
                  required
                  placeholder="Enter your phone number"
                />

                <ValidationError> {{ errors[0] }} </ValidationError>
              </ValidationProvider>
            </div>

            <div class="form-group">
              <label
                >Your
                <abbr title="Social Security Number / National ID Number"
                  >SSN</abbr
                ></label
              >
              <ValidationProvider
                name="SSN"
                rules="digits:14"
                v-slot="{ errors }"
              >
                <input
                  v-model="ssn"
                  name="ssn"
                  type="text"
                  placeholder="Enter your SSN ID"
                  required
                />

                <ValidationError> {{ errors[0] }} </ValidationError>
              </ValidationProvider>
            </div>

            <div class="form-group">
              <label>Your salary</label>
              <ValidationProvider
                name="Salary"
                rules="required|integer|min_value:100|max_value:10000"
                v-slot="{ errors }"
              >
                <input
                  v-model="salary"
                  name="salary"
                  type="text"
                  placeholder="Enter your salary"
                />
                <ValidationError> {{ errors[0] }} </ValidationError>
              </ValidationProvider>
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
          </div>

          <GradientButton
            class="submit-button"
            type="submit"
            :disabled="invalid"
            :isLoading="loading"
            >Sign up</GradientButton
          >
        </ValidationObserver>
      </form>
    </div>

    <div class="have-account-text">
      Already have account?
      <router-link :to="{ name: 'user-signin' }" class="sign-in-link"
        >Sign in now</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import ValidationError from "@/components/ValidationError.vue";
import GradientButton from "@/components/GradientButton.vue";
import api from "@/services/api";
import REGEX from "@/policies/regex";
import { Component, Vue } from "vue-property-decorator";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import {
  email,
  regex,
  length,
  digits,
  integer,
  required,
  min_value,
  max_value,
} from "vee-validate/dist/rules";

extend("email", email);
extend("regex", regex);
extend("length", length);
extend("digits", digits);
extend("integer", integer);
extend("required", required);
extend("min_value", min_value);
extend("max_value", max_value);

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
    ValidationError,
    GradientButton,
  },
})
export default class SignUp extends Vue {
  REGEX = REGEX;
  name = "";
  email = "";
  phone_number = "";
  ssn = "";
  salary = "";
  password = "";
  verificationCode = "";
  responseMessage = "";
  responseErrors: string[] = [];
  loading = false;
  successfulSignup = false;

  onSignup(): void {
    const { name, email, phone_number, ssn, salary, password } = this;
    const body = {
      name,
      email,
      phone_number,
      ssn,
      salary,
      password,
    };
    this.loading = true;

    api.users
      .signup(body)
      .then(async (r) => {
        const json = r.data;
        if (r.status < 400) {
          // continue to phone validation
          this.responseMessage = json.message;
          this.successfulSignup = true;
        } else {
          this.responseErrors = [];
          for (const e in json) {
            const arr = json[e].map((err: string) => `${e} ${err}.`);
            this.responseErrors.push(...arr);
          }
          // 500!
        }
      })
      .catch(console.error)
      .finally(() => {
        this.loading = false;
      });
    console.log("Submitting: SIGNUP");
  }

  onVerify(): void {
    const { email, phone_number, verificationCode: code, password } = this;

    this.loading = true;
    api.users
      .verify({ email, phone_number, code, password })
      .then(async (r) => {
        const json = await r.data;
        // TODO: save token on succcessfull verification
        // same logic as successfull signup
        this.responseMessage = json;
        console.log(r.status);
        console.log(json);
      })
      .catch(console.error)
      .finally(() => {
        this.loading = false;
      });
    console.log("Submitting: VERIFY");
  }
}
</script>

<style scoped lang="less">
@import "@/assets/variables";

.gradient-container {
  abbr[title] {
    border-bottom: 1px dotted;
  }

  .page-title {
    color: white;
    margin: 10px 0 50px 0;
    font-size: 30pt;
  }

  .form-card {
    width: 45%;
    min-width: 450px;

    .sign-up-fields-divisor {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 130px);
      grid-column-gap: 15px;
    }

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

  .have-account-text {
    color: white;
    margin: 15px 0;

    .sign-in-link {
      color: darken(@dark-gray, 20%);
    }
  }
}
</style>
