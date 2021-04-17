<template>
  <div>
    <section class="user-form-part">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div class="user-form-logo">
              <a href="/" aria-label="home"><img :src="logo" alt="logo"/></a>
            </div>
            <div class="user-form-card">
              <div class="user-form-title">
                <h2>Welcome!</h2>
                <p>Use Your Credentials To Access</p>
              </div>
              <!-- Login form -->
              <form class="user-form" @submit.prevent="submitForm">
                <div class="form-group">
                  <input
                    type="email"
                    :class="
                      email.isValid ? 'form-control' : 'form-control is-invalid'
                    "
                    placeholder="Enter your email"
                    v-model.trim="email.val"
                    @blur="clearValidity('email')"
                  />
                  <div v-if="!email.isValid" class="pl-1 invalid-feedback">
                    {{
                      email.val
                        ? "Email is not valid"
                        : "This email field is required!"
                    }}
                  </div>
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    :class="
                      password.isValid
                        ? 'form-control'
                        : 'form-control is-invalid'
                    "
                    placeholder="Enter your password"
                    v-model.trim="password.val"
                    @blur="clearValidity('password')"
                  />
                  <div v-if="!password.isValid" class="pl-1 invalid-feedback">
                    {{
                      password.val
                        ? "Password must be 6 or more characters"
                        : "This pasword field is required!"
                    }}
                  </div>
                </div>

                <div class="form-button">
                  <button type="submit">login</button>
                  <p>Forgot your password?<a href="#">reset here</a></p>
                </div>
              </form>
            </div>
            <div class="user-form-remind">
              <p>dont have an account?<a href="/register">sign up here</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="footer-part">
      <p>Ecomart | &COPY; Copyright by <a href="#">James</a></p>
    </footer>
  </div>
</template>

<script>
//izitoast
import("izitoast/dist/css/iziToast.min.css");
import iziToast from "izitoast";
import { global } from "../../config/index.js";

export default {
  data() {
    return {
      email: { val: null, isValid: true },
      password: { val: null, isValid: true },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (
        !this.email.val ||
        (this.email.val && !this.email.val.includes("@"))
      ) {
        this.formIsValid = this.email.isValid = false;
      }
      if (
        !this.password.val ||
        (this.password.val && this.password.val.length < 6)
      ) {
        this.formIsValid = this.password.isValid = false;
      }
    },
    async submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return false;
      }
      const actionPayload = {
        email: this.email.val,
        password: this.password.val,
      };

      try {
        await this.$store.dispatch("login", actionPayload);
        //set alert
        this.$store.dispatch("alert/setAlert", {
          message: "Logged in successfully",
        });
        //redirect
        const redirectUrl = this.$route.query.redirect || "/";
        this.$router.push(redirectUrl);
      } catch (error) {
        console.log(error);
        this.$store.dispatch("alert/setAlert", {
          message: "Invalid credentials",
          type: "error",
        });
        // this.error = error;
      }
    },
  },
  computed: {
    logo() {
      return global.logo;
    },
    loginError() {
      return !!this.$store.getters["alert/message"];
    },
    loginErrorDetails() {
      return {
        message: this.$store.getters["alert/message"],
        type: this.$store.getters["alert/type"],
      };
    },
  },
  watch: {
      //to do
      //make a mixin
    loginError: {
      handler(loginError) {
          const that = this;
          iziToast.error({
              title: 'Error',
              message: this.loginErrorDetails.message,
              position: 'topRight',
              onClosed: function () {
                that.$store.dispatch("alert/resetState")
              }
          })
        console.log(loginError);
      },
    },
  },
};
</script>

<style scoped>
.user-form-part {
  padding-top: 30px;
}
.user-form-logo {
  text-align: center;
  margin-bottom: 25px;
}
.user-form-logo img {
  width: 200px;
}
.user-form-card {
  padding: 30px;
  border-radius: 8px;
  margin-bottom: 20px;
  background: var(--white);
  border: 1px solid var(--border);
}
.user-form-title {
  text-align: center;
  margin-bottom: 25px;
}
.user-form-title h2 {
  color: var(--primary);
  margin-bottom: 10px;
  font-size: 28px;
  line-height: 36px;
}
.user-form-title p {
  text-transform: capitalize;
}
.user-form .form-group {
  margin-bottom: 20px;
}
.form-button {
  text-align: center;
}
.form-button button {
  width: 100%;
  height: 45px;
  font-size: 14px;
  font-weight: 700;
  line-height: 45px;
  border-radius: 8px;
  letter-spacing: 0.3px;
  margin-bottom: 8px;
  text-align: center;
  text-transform: uppercase;
  color: var(--white);
  background: var(--primary);
}
.form-button p {
  font-size: 15px;
  margin-top: 5px;
  text-transform: capitalize;
}
.form-button p a {
  font-weight: 700;
  margin-left: 5px;
  color: var(--primary);
}
.form-button p a:hover {
  text-decoration: underline;
}
.user-form-remind {
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  background: var(--white);
  border: 1px solid var(--border);
}
.user-form-remind p {
  font-size: 15px;
  text-transform: capitalize;
}
.user-form-remind p a {
  font-weight: 700;
  margin-left: 5px;
  color: var(--primary);
}
.user-form-remind p a:hover {
  text-decoration: underline;
}
</style>
