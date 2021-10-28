<template>
  <div>
    <div class="flex flex-row mt-4 mx-8">
      <input
        type="text"
        name="search"
        id="search"
        v-model="searchString"
        class="border-2 rounded-md p-1 flex-grow"
        placeholder="Search"
      />
      <div class="w-5"></div>
      <button
        @click="search"
        class="text-indigo-900 rounded-md hover:bg-indigo-300 p-2 flex-shrink"
      >
        Search
      </button>
    </div>
    <div v-if="loading">
      <div class="h-20"></div>
      <loading-spinner></loading-spinner>
    </div>
    <div v-else-if="init">
      <div class="text-center py-10 shadow-lg m-8 rounded-lg mt-10">
        <p class="text-2xl font-sans font-semibold p-2">
          Type a Word to get relevant results.
        </p>
      </div>
    </div>
    <div v-else-if="recipesFound.length == 0">
      <div class="py-10 shadow-lg text-center rounded-lg mt-10 m-8">
        <p class="text-2xl font-sans font-semibold p-2">
          No Recipes found!!!
        </p>
      </div>
    </div>
    <div v-else>
      <div
        class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mx-5 p-3"
      >
        <div
          class="cursor-pointer w-full h-120 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row hover:shadow-2xl transition-all"
          v-for="recipe in recipesFound"
          :key="recipe['_id']"
          @click="goToRecipePage(recipe['_id'])"
        >
          <div class="w-full h-full">
            <img
              class="object-center object-cover w-full h-60"
              :src="recipe.recipeImage"
              alt="recipe-photo"
            />
            <p class="text-lg font-semibold mx-2 mt-2">
              {{ recipe.recipeName }}
            </p>
            <p
              class="text-sm text-gray-400 mx-2 my-2 h-20 overflow-ellipsis overflow-hidden"
              style="white-space: initial;"
            >
              {{ recipe.recipeDescription }}
            </p>
            <div class="w-full flex flex-row px-2 mb-2 justify-between">
              <div class="flex flex-row mt-2">
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
                    ? 'text-green-600 text-sm font-sans font-bold mt-2'
                    : 'text-red-600 text-sm font-sans font-bold mt-2'
                "
              >
                {{ recipe.recipeType }}
              </p>
            </div>
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
  data() {
    return {
      recipesFound: [],
      init: true,
      loading: false,
      searchString: "",
    };
  },
  methods: {
    goToRecipePage(id) {
      this.$router.push(`/recipes/${id}`);
    },
    async search() {
      this.init = false;
      this.loading = true;
      const result = await this.$store.dispatch("recipes/searchRecipe", {
        searchStr: this.searchString,
      });
      let recipes = await result.json();
      recipes = recipes.data.recipe;
      console.log(recipes);
      this.loading = false;
      this.recipesFound = recipes;
    },
  },
};
</script>
