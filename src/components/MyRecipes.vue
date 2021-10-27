<template>
  <div v-if="this.$store.getters['recipes/myRecipes'] == null">
    <div class="h-full"></div>
    <loading-spinner></loading-spinner>
  </div>
  <div v-else-if="this.$store.getters['recipes/myRecipes'].length == 0">
    <div class="p-20 shadow-lg m-20 rounded-lg">
      <p class="text-2xl font-sans font-semibold p-2">
        No Recipes at to show at the moment!!!
      </p>
      <p class="text-md text-gray-400 font-sans font-normal p-2">
        Add one now.....
      </p>
    </div>
  </div>
  <div v-else>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mx-5 p-3"
    >
      <div
        class="cursor-pointer w-full h-120 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row hover:shadow-2xl transition-all"
        v-for="recipe in $store.getters['recipes/myRecipes']"
        :key="recipe['_id']"
        @click="goToRecipePage(recipe['_id'])"
      >
        <div class="w-full h-full">
          <img
            class="object-center object-cover w-full h-60"
            :src="recipe.recipeImage"
            alt="recipe-photo"
          />
          <p class="text-lg font-semibold mx-2 mt-2">{{ recipe.recipeName }}</p>
          <p
            class="text-sm text-gray-400 mx-2 my-2 h-20 overflow-ellipsis overflow-hidden"
            style="white-space: initial;"
          >
            {{ recipe.recipeDescription }}
          </p>
          <div class="w-full flex flex-row px-2 mb-2 justify-between">
            <div class="flex flex-row">
              <svg
                class="w-6 h-6 text-indigo-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <div class="w-2"></div>
              <p>{{ recipe.cookingTime }} mins</p>
            </div>
            <p
              :class="
                recipe.recipeType == 'Veg'
                  ? 'text-green-600 text-sm font-sans font-bold'
                  : 'text-red-600 text-sm font-sans font-bold'
              "
            >
              {{ recipe.recipeType }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from "./UI/LoadingSpinner.vue";
export default {
  components: {
    LoadingSpinner,
  },
  methods: {
    goToRecipePage(id) {
      this.$router.push(`/recipes/${id}`);
    },
  },
  created() {
    this.$store.dispatch("recipes/getRecipes").then(() => {
      console.log(this.$store.getters["recipes/recipes"]);
    });
  },
};
</script>
