<template>
  <div>
    <section class="user-form-part">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div class="user-form-logo">
              <a href="/" aria-label="home"><img :src="logo" alt="logo" /></a>
            </div>
            <div class="user-form-card">
              <div class="user-form-title">
                <h2>join now!</h2>
                <p>Setup a new account in a minute</p>
              </div>
              <!-- signup form -->
              <form class="user-form">
                  <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter your name"
                    v-model.trim="name"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Enter your email"
                    v-model.trim="email"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Enter your password"
                    v-model.trim="password"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="repeat password"
                    v-model.trim="confirmPassword"
                  />
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
      <p>Ecomart | &COPY; Copyright by <a href="#">James</a></p>
    </footer>
  </div>
</template>

<script>
import { global } from "../../config/index.js";

export default {
  data() {
    return {
        email: null,
        name: null,
        password: null,
        confirmPassword: null,
        formIsValid: true,
    };
  },
  computed: {
    logo() {
      return global.logo;
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