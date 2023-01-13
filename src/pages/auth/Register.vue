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
                <h2>join now!</h2>
                <p>Setup a new account in a minute</p>
              </div>
              <!-- signup form -->
              <form class="user-form" @submit.prevent="submitForm">
                <div class="form-group">
                  <input
                    type="text"
                    :class="
                      name.isValid ? 'form-control' : 'form-control is-invalid'
                    "
                    placeholder="Enter your name"
                    v-model.trim="name.val"
                    @blur="clearValidity('name')"
                  />
                  <div v-if="!name.isValid" class="pl-1 invalid-feedback">
                    This name field is required!
                  </div>
                </div>
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
                <div class="form-group">
                  <input
                    type="password"
                    :class="
                      confirmPassword.isValid
                        ? 'form-control'
                        : 'form-control is-invalid'
                    "
                    placeholder="repeat password"
                    v-model.trim="confirmPassword.val"
                    @blur="clearValidity('confirmPassword')"
                  />
                  <div
                    v-if="!confirmPassword.isValid"
                    class="pl-1 invalid-feedback"
                  >
                    The 2 passwords need to be the same
                  </div>
                </div>
                <div class="form-button">
                  <button type="submit">signup</button>
                </div>
              </form>
            </div>
            <div class="user-form-remind">
              <p>already have an account?<a href="/login">login here</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="footer-part">
      <p>Ecomart | &COPY; Copyright <a href="#">{{ new Date().getFullYear() }}</a></p>
    </footer>
  </div>
</template>

<script>
import { global } from "../../config/index.js";

export default {
  data() {
    return {
      email: { val: null, isValid: true },
      name: { val: null, isValid: true },
      password: { val: null, isValid: true },
      confirmPassword: { val: null, isValid: true },
      formIsValid: true
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (!this.name.val) {
        this.formIsValid = this.name.isValid = false;
      }
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
      if (this.confirmPassword.val !== this.password.val) {
        this.formIsValid = this.confirmPassword.isValid = false;
      }
    },
    async submitForm() {
      this.validateForm();
      console.log(this.name);
      if (!this.formIsValid) {
        return false;
      }
      const actionPayload = {
        email: this.email.val,
        password: this.password.val,
        displayName: this.name.val
      };

      try {
        await this.$store.dispatch("signup", actionPayload);

        const redirectUrl = this.$route.query.redirect || "/";
        this.$router.push(redirectUrl);
      } catch (error) {
        console.log(error);
        // this.error = error;
      }
    }
  },
  computed: {
    logo() {
      return global.logo;
    }
  }
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
