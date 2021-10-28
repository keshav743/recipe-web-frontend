<template>
  <div class="w-1/2 mx-8 p-16 my-20 shadow-lg rounded-lg">
    <div class="absolute z-10 backdrop" v-if="loading">
      <loading-spinner class="center mt-48"></loading-spinner>
    </div>
    <h1
      class="text-2xl font-semibold pb-4 text-center text-indigo-900 font-sans"
    >
      Auth
    </h1>
    <div class="absolute z-10 backdrop" v-if="$store.getters['err/loginError']">
      <dialog open class="rounded-lg my-36 p-10 text-center">
        <p class="text-xl font-normal p-2 w-56 mb-5">
          {{ $store.getters["err/loginError"] }}
        </p>
        <button
          @click="clearErr"
          class="px-4 py-2 text-white bg-indigo-900 mx-auto rounded-lg cursor-pointer"
        >
          Okay
        </button>
      </dialog>
    </div>
    <div class="flex flex-col">
      <input
        class="p-2 font-sans border-2 rounded-lg"
        type="email"
        v-model="loginEmail"
        placeholder="Email Address"
        style="outline-color: indigo"
      />
      <div class="h-5"></div>
      <input
        class="p-2 font-sans border-2 rounded-lg"
        type="password"
        v-model="loginPassword"
        placeholder="Password"
        style="outline-color: indigo"
      />
      <div class="h-5"></div>
      <button
        @click="triggerLoginAction"
        class="text-white bg-indigo-900 px-5 py-2 mx-auto rounded-lg cursor-pointer"
      >
        Login
      </button>
      <p class="text-center mt-5">
        or
        <router-link to="/auth/signup" class="text-indigo-900 underline"
          >Signup</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from "./UI/LoadingSpinner.vue";
export default {
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      loginEmail: "",
      loginPassword: "",
      errorMsg: "",
      loginFormValid: true,
      loading: false,
    };
  },
  methods: {
    clearErr() {
      this.$store.commit("err/setLoginError", { err: null });
    },
    async triggerLoginAction() {
      if (this.loginPassword.trim() == "" || this.loginEmail.trim() == "") {
        this.loginFormValid = false;
        this.errorMsg = "All fields are required! Enter some valid data.";
        return;
      }
      this.loading = true;
      this.loginFormValid = true;
      await this.$store.dispatch("performLogin", {
        email: this.loginEmail,
        password: this.loginPassword,
      });
      this.loading = false;
      this.$router.replace("/");
    },
  },
};
</script>
