import { createStore } from "vuex";

import userModule from "./modules/user.js";
import recipesModule from "./modules/recipes.js";
import errorModule from "./modules/error.js";

const store = createStore({
  modules: {
    err: errorModule,
    user: userModule,
    recipes: recipesModule,
  },
  state() {
    return {
      token: null,
      expiration: null,
    };
  },
  mutations: {
    setAuthCreds(state, payload) {
      state.token = payload.token;
      state.expiration = payload.expiration;
    },
    logoutFinal(state) {
      state.token = null;
      state.expiration = null;
    },
  },
  actions: {
    async performLogin(context, payload) {
      const result = await fetch(
        "https://radiant-ridge-40570.herokuapp.com/api/auth/login/",
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (result.status >= 200 && result.status < 400) {
        await context.dispatch("setData", { result: result });
      } else if (result.status >= 400 && result.status < 500) {
        context.commit("err/setLoginError", {
          err: "Credentials that you entered are not Valid!!",
        });
      } else {
        context.commit("err/setLoginError", {
          err: "Something went wrong. Please try again later!!!",
        });
      }
    },
    async performSignup(context, payload) {
      const result = await fetch(
        "https://radiant-ridge-40570.herokuapp.com/api/auth/signup/",
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (result.status >= 200 && result.status < 400) {
        await context.dispatch("setData", { result: result });
      } else if (result.status >= 400 && result.status < 500) {
        context.commit("err/setSignupError", {
          err: "Credentials that you entered are not Valid!!",
        });
      } else {
        context.commit("err/setSignupError", {
          err:
            "Something went wrong. Please try again with a different email later!!!",
        });
      }
    },
    async setData(context, payload) {
      const expiresIn = 86400 * 1000; // turn to milliseconds
      const expirationDate = Date.now() + expiresIn;
      const body = await payload.result.json();

      localStorage.setItem("token", body.data.token);
      localStorage.setItem("userFirstName", body.data.userData.firstName);
      localStorage.setItem("userLastName", body.data.userData.lastName);
      localStorage.setItem("userEmail", body.data.userData.email);
      localStorage.setItem("userId", body.data.userData.id);
      localStorage.setItem("tokenExpiration", expirationDate);

      context.commit("setAuthCreds", {
        token: body.data.token,
        expiration: Date.now(),
      });
      context.commit("user/setUserData", {
        firstName: body.data.userData.firstName,
        lastName: body.data.userData.lastName,
        email: body.data.userData.email,
        id: body.data.userData.id,
      });
    },
    tryLogin(context) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const userFirstName = localStorage.getItem("userFirstName");
      const userLastName = localStorage.getItem("userLastName");
      const userEmail = localStorage.getItem("userEmail");
      const tokenExpiration = localStorage.getItem("tokenExpiration");
      const expiresIn = +tokenExpiration - Date.now();
      if (expiresIn < 10000) {
        context.dispatch("logout");
        return;
      }

      if (token && userId) {
        console.log(userId);
        context.commit("setAuthCreds", {
          token: token,
          expiration: Date.now(),
        });
        context.commit("user/setUserData", {
          id: userId,
          firstName: userFirstName,
          lastName: userLastName,
          email: userEmail,
        });
      }
    },
    logout(context) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("tokenExpiration");
      context.commit("logoutFinal");
      context.commit("user/clearUserData");
    },
  },
  getters: {
    token(state) {
      return state.token;
    },
    expiration(state) {
      return state.expiration;
    },
  },
});

export default store;
