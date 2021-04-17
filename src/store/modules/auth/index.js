let timer;

export default {
  state() {
    return {
      token: null,
      user: null,
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
        return context.dispatch('authenticate', {
          ...payload,
          mode: 'login'
        });
      },
      async signup(context, payload) {
        return context.dispatch('authenticate', {
          ...payload,
          mode: 'signup'
        });
      },
    async authenticate(context, payload) {
        const key = 'AIzaSyD3FCV4Oly1ztwv6OaVDiBWB0Phh2pC_sw';
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
  
        if (payload.mode == 'signup') {
          url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
        }
  
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
          })
        });
  
        const responseData = await response.json();
  
        if (!response.ok) {
          throw new Error(responseData.message || `An error occurres signing${(payload.mode == 'signup' ? ' up' : ' in')}`);
        }
  
        const expiresIn = parseInt(responseData.expiresIn) * 1000,
          expirationDate = new Date().getTime() + expiresIn;
  
        //save to local storage
        localStorage.setItem('token', responseData.idToken);
        localStorage.setItem('user', responseData);
        localStorage.setItem('tokenExpiration', expirationDate);
  
        timer = setTimeout(function() {
          context.dispatch('logout');
        }, expiresIn);
  
        context.commit('setUser', {
          token: responseData.idToken,
          user: responseData
        });
      },
  },
  mutations: {
    setUser(state, {token, user}){
        state.token = token;
        state.user = user;
    },
    logout(state) {
        state.token = null;
        state.userId = null;
      }
    },
  },
};
