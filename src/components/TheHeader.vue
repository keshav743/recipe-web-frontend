<template>
  <div class="top-nav-bar bg-indigo-50">
    <h1
      class="text-xl font-semibold text-indigo-900 cursor-pointer"
      @click="goToHome"
    >
      Recipe Center
    </h1>
    <div>
      <button
        class="text-indigo-900 rounded-md hover:bg-indigo-300"
        v-if="$store.getters.token !== null"
        @click="goToSearch"
      >
        Search
      </button>
      <button
        class="text-indigo-900 rounded-md hover:bg-indigo-300"
        v-if="$store.getters.token !== null"
        @click="goToNewRecipe"
      >
        Add New Recipe
      </button>
      <button
        class="text-indigo-900 rounded-md hover:bg-indigo-300"
        v-if="$store.getters.token !== null"
        @click="goToMyRecipes"
      >
        My Recipes
      </button>
      <button
        class="text-indigo-900 rounded-md hover:bg-indigo-300"
        v-if="$store.getters.token !== null"
        @click="logout"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/auth");
    },
    goToNewRecipe() {
      this.$router.push("/recipes/new");
    },
    goToSearch() {
      this.$router.push("/recipes/search");
    },
    goToMyRecipes() {
      this.$router.push("/recipes/mine");
    },
    goToHome() {
      this.$router.push("/recipes/all");
    },
  },
};
</script>

<style scoped>
button {
  border-width: 0px;
  padding: 0.2rem 1rem;
  margin-right: 1rem;
  cursor: pointer;
}
.top-nav-bar {
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
