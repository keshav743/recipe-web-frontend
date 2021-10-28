<template>
  <div class="w-1/2 mx-8 p-12 my-10 shadow-lg rounded-lg">
    <div class="absolute z-10 backdrop" v-if="loading">
      <loading-spinner class="center mt-48"></loading-spinner>
    </div>
    <h1
      class="text-2xl font-semibold pb-4 text-center text-indigo-900 font-sans"
    >
      Auth
    </h1>
    <div
      class="absolute z-10 backdrop"
      v-if="$store.getters['err/signupError']"
    >
      <dialog open class="rounded-lg my-36 p-10 text-center">
        <p class="text-xl font-normal p-2 w-56 mb-5">
          {{ $store.getters["err/signupError"] }}
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
        type="text"
        v-model="signupFirstName"
        placeholder="First Name"
        style="outline-color: indigo"
      />
      <div class="h-5"></div>
      <input
        class="p-2 font-sans border-2 rounded-lg"
        type="text"
        v-model="signupLastName"
        placeholder="Last Name"
        style="outline-color: indigo"
      />
      <div class="h-5"></div>
      <input
        class="p-2 font-sans border-2 rounded-lg"
        type="email"
        v-model="signupEmail"
        placeholder="Email Address"
        style="outline-color: indigo"
      />
      <div class="h-5"></div>
      <input
        class="p-2 font-sans border-2 rounded-lg"
        type="password"
        v-model="signupPassword"
        placeholder="Password"
        style="outline-color: indigo"
      />
      <div class="h-5"></div>
      <button
        @click="triggerSignupAction"
        class="text-white bg-indigo-900 px-5 py-2 mx-auto rounded-lg cursor-pointer"
      >
        Signup
      </button>
      <p class="text-center mt-5">
        or
        <router-link to="/auth/login" class="text-indigo-900 underline"
          >Login</router-link
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
      signupFirstName: "",
      signupLastName: "",
      signupEmail: "",
      signupPassword: "",
      signupFormValid: true,
      errorMsg: "",
      loading: false,
    };
  },
  methods: {
    clearErr() {
      this.$store.commit("err/setSignupError", { err: null });
    },
    async triggerSignupAction() {
      if (
        this.signupFirstName.trim() == "" ||
        this.signupLastName.trim() == "" ||
        this.signupPassword.trim() == "" ||
        this.signupEmail.trim() == "" ||
        this.signupPassword.length < 8
      ) {
        this.signupFormValid = false;
        this.errorMsg = "All fields are required! Enter some valid data.";
        return;
      }
      this.loading = true;
      this.regFormValid = true;
      await this.$store.dispatch("performSignup", {
        firstName: this.signupFirstName,
        lastName: this.signupLastName,
        email: this.signupEmail,
        password: this.signupPassword,
      });
      this.loading = false;
      if (this.$store.getter.token) {
        this.$router.replace("/recipes/all");
      }
    },
  },
};
</script>
