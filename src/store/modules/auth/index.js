let timer;

export default {
  state() {
    return {
      token: null,
      user: null
    };
  },
  getters: {
    user(state) {
      return state.user;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    }
  },
  actions: {
    async login(context, payload) {
      return context.dispatch("authenticate", {
        ...payload,
        mode: "login"
      });
    },
    async signup(context, payload) {
      return context.dispatch("authenticate", {
        ...payload,
        mode: "signup"
      });
    },
    async authenticate(context, payload) {
      const key = "AIzaSyBgoWKSYqCNqG82BkYm8ogLzJs0_adDV5c";
      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;

      let body = {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      };

      if (payload.mode == "signup") {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
        body = { ...body, displayName: payload.displayName };
      }

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message ||
            `An error occurres signing${
              payload.mode == "signup" ? " up" : " in"
            }`
        );
      }

      const expiresIn = parseInt(responseData.expiresIn) * 1000,
        expirationDate = new Date().getTime() + expiresIn;

      //save to local storage
      localStorage.setItem("token", responseData.idToken);
      localStorage.setItem("user", JSON.stringify(responseData));
      localStorage.setItem("tokenExpiration", expirationDate);

      timer = setTimeout(function() {
        context.dispatch("logout");
      }, expiresIn);

      context.commit("setUser", {
        token: responseData.idToken,
        user: responseData
      });

      console.log(timer);
    },
    tryLogin(context) {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      const tokenExpiration = localStorage.getItem("tokenExpiration");

      const expiresIn = +tokenExpiration - new Date().getTime();

      if (expiresIn < 0) {
        return;
      }

      timer = setTimeout(function() {
        context.dispatch("logout");
      }, expiresIn);

      if (token && user) {
        context.commit("setUser", {
          token,
          user
        });
      }
    },
    logout(context) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("tokenExpiration");

      clearTimeout(timer);

      context.commit("logout");
    }
  },
  mutations: {
    setUser(state, { token, user }) {
      state.token = token;
      state.user = user;
    },
    logout(state) {
      state.token = null;
      state.userId = null;
    }
  }
};
