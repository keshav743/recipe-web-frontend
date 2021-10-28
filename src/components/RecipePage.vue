<template>
  <div v-if="recipe == null">
    <div class="h-20"></div>
    <loading-spinner></loading-spinner>
  </div>
  <div v-else-if="recipe == false">
    <div class="h-20"></div>
    <div class="absolute z-10 backdrop">
      <dialog open class="rounded-lg my-36 p-10 text-center">
        <p class="text-xl font-normal p-2 w-56 mb-5">
          No Recipe Found for the given ID.
        </p>
        <button
          @click="goBack"
          class="px-4 py-2 text-white bg-indigo-900 mx-auto rounded-lg cursor-pointer"
        >
          Go Back to Recipes Page
        </button>
      </dialog>
    </div>
  </div>
  <div v-else class="m-8">
    <div class="flex flex-row shadow-md rounded-md">
      <img
        class="w-72 h-56 rounded-tl-md rounded-bl-md"
        :src="recipe.recipeImage"
      />
      <div class="w-6"></div>
      <div class="flex flex-col mx-8 w-full">
        <p class="text-2xl font-bold text-indigo-900">
          {{ recipe.recipeName }}
        </p>
        <div class="h-5"></div>
        <p class="text-gray-500 text-sm font-sans">
          {{ recipe.recipeDescription }}
        </p>
        <div class="h-5"></div>
        <div class="w-full flex flex-row justify-between">
          <p
            :class="
              recipe.recipeType == 'Veg'
                ? 'text-green-600 text-sm font-sans font-bold'
                : 'text-red-600 text-sm font-sans font-bold'
            "
          >
            <!-- {{ recipe.recipeType == "Veg" ? "🟢" : "🟠" }} -->
            {{ recipe.recipeType }}
          </p>
          <p class="text-md text-indigo-900 mr-3">{{ recipe.userName }}</p>
        </div>
        <div class="h-5"></div>
        <div class="w-full flex flex-row justify-between">
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
          <button
            v-if="recipe.userId == this.$store.getters['user/id']"
            class="text-indigo-900 cursor-pointer hover:bg-indigo-300 px-3 py-1 rounded-lg mb-2 mr-0"
            @click="goToEditPage"
          >
            Edit Food
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-row shadow-lg p-4 mt-2 rounded-lg">
      <div class="ml-10 my-5 w-1/2">
        <p class="text-xl font-bold underline text-indigo-900">Ingredients</p>
        <p v-for="(ing, index) in recipe.ingredients" :key="ing" class="mt-1">
          <span class="font-bold text-sm text-indigo-900"
            >{{ index + 1 }}:
          </span>
          <span class="text-sm text-gray-600">{{ ing }}</span>
        </p>
      </div>
      <div class="my-5 w-1/2">
        <p class="text-xl font-bold underline text-indigo-900">Procedure</p>
        <p
          v-for="(step, index) in recipe.recipeProcedure"
          :key="step"
          class="mt-1"
        >
          <span class="font-bold text-sm text-indigo-900"
            >Step {{ index + 1 }}:
          </span>
          <span class="text-sm text-gray-600">{{ step }}</span>
        </p>
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
  props: ["id"],
  data() {
    return {
      recipe: null,
    };
  },
  methods: {
    goBack() {
      this.$router.push("/recipes/all");
    },
    goToEditPage() {
      this.$router.push(`/recipes/edit/${this.id}`);
    },
    async getRecipeById() {
      const result = await fetch(
        `http://localhost:3000/api/recipes/${this.id}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: this.$store.getters.token,
          },
        }
      );
      if (result.status >= 200 && result.status < 400) {
        console.log("Recipes Recieved");
        const recipe = await result.json();
        this.recipe = recipe.data.recipe;
        console.log(this.recipe);
      } else {
        this.recipe = false;
      }
    },
  },
  created() {
    this.getRecipeById();
  },
};
</script>
