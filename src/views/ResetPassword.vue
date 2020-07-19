<template>
  <div class="container">
    <div class="bordered-box">
      <div v-if="token">
        <form @submit.prevent="onSubmit">
          <ValidationObserver class="" v-slot="{ invalid }">
            <h1 class="header">Reset Your Password</h1>
            <label for="password">Password</label>
            <ValidationProvider
              name="Password"
              rules="required"
              v-slot="{ errors }"
            >
              <input
                name="password"
                type="password"
                v-model="password"
                minlength="8"
              />
              <div class="errors">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <label for="password">Password Confirmation</label>
            <ValidationProvider
              name="Password Confirmation"
              rules="required|password:@Password"
              v-slot="{ errors }"
            >
              <input
                name="password-confirmation"
                type="password"
                v-model="passwordConfirmation"
              />
              <div class="errors">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <center>
              <button type="submit" :disabled="invalid">
                Reset
              </button>
            </center>
          </ValidationObserver>
          <div>{{ response }}</div>
        </form>
      </div>
      <div class="errors no-token" v-else>
        <h1>No token is provided!</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import api from "@/services/api";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required, min } from "vee-validate/dist/rules";
import { Component, Vue, Prop } from "vue-property-decorator";

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
  },
})
export default class ResetPassword extends Vue {
  password = "";
  passwordConfirmation = "";
  errors = "";
  state = "";
  response = "";

  get token(): string | (string | null)[] {
    return this.$route.query.token;
  }

  onSubmit(): void {
    const { token, password } = this;
    api
      .changePassword({ token, password })
      .then((r) => {
        console.log(r);
        return r.json();
      })
      .then(console.log)
      .catch(console.error);
  }
}
</script>

<style lang="less" scoped>
.errors {
  color: red;
  font-size: 16px;
}

.no-token {
  text-align: center;
}

.bordered-box {
  .gradient();

  padding: 40px;
  margin: 20px;
  border-radius: 2%;
  min-width: 30%;
  border: 2px #777 solid;
}

.header {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: #444;
  text-align: center;
  margin-bottom: 20px;
}

.container {
  height: 100%;
  .centered-container();
}

.centered-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.gradient {
  background: linear-gradient(to top, #00bdce10 50%, #0071d220);
}

form {
  color: #333;
  font-size: 20px;
  label {
    align-self: flex-start;
    margin: 10px 0px;
  }
  input {
    width: 100%;
    margin: 10px 0px;
  }
  button {
    height: 35px;
    width: 200px;
    font-size: 20px;
    margin-top: 25px;
    text-transform: uppercase;
  }
}
</style>
