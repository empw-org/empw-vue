<template>
  <div class="gradient-container">
    <h1 class="page-title">Company - Sign up</h1>

    <div class="form-card">
      <div class="errors-array-response">
        <ValidationError v-for="(err, index) in responseErrors" :key="index">
          * {{ err }}
        </ValidationError>
      </div>

      <!-- SIGNUP FORM -->
      <form id="sign-up-form" @submit.prevent="onSignup">
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

          <div
            class="location-warning"
            :class="{ 'location-error': locationError }"
          >
            * You need to allow access to your location.
            <span @click="onAskForLocation">Click here</span>
          </div>

          <GradientButton
            class="submit-button"
            type="submit"
            :disabled="invalid || !location"
            :isLoading="loading"
            >Sign up</GradientButton
          >
        </ValidationObserver>
      </form>
    </div>

    <div class="have-account-text">
      Already have account?
      <router-link to="/user/signin" class="sign-in-link"
        >Sign in now</router-link
      >
    </div>
  </div>
</template>

<script>
import ValidationError from "@/components/ValidationError.vue";
import GradientButton from "@/components/GradientButton.vue";
import api from "@/services/api";
import REGEX from "@/policies/regex";
import { Component, Vue } from "vue-property-decorator";
import VueSwal from "vue-swal";
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

Vue.use(VueSwal);

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
  password = "";
  responseErrors = [];
  loading = false;
  locationError = false;
  providedLocation = false;
  location = null;

  onAskForLocation() {
    const geoOptions = { enableHighAccuracy: true };
    const geoSuccess = (l) => {
      const { longitude, latitude } = l.coords;
      this.location = { longitude, latitude };
      console.log("got", this.location);
    };
    navigator.geolocation.getCurrentPosition(
      geoSuccess,
      () => (this.locationError = true),
      geoOptions
    );
  }

  onSignup() {
    const { name, email, phone_number, location, password } = this;
    const body = {
      name,
      email,
      phone_number,
      location,
      password,
    };
    this.loading = true;
    this.responseErrors = [];
    api.companies
      .signup(body)
      .then(async (r) => {
        const json = await r.json();
        console.log(json);
        if (r.ok) {
          // continue to phone validation

          this.$swal("Good job!", json.message, "success");
        } else {
          for (const e in json) {
            const arr = json[e].map((err) => `${e} ${err}.`);
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
    width: 45%;
    min-width: 450px;

    .sign-up-fields-divisor {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 130px);
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

  .location-warning {
    color: @label-color;
    font-size: 10pt;

    span {
      color: darken(@light-blue, 10%);
      cursor: pointer;
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }
  }

  .location-error {
    color: red;
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
