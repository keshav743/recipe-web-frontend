<template>
  <div class="mx-8 my-4 flex flex-col">
    <div class="absolute z-10 backdrop" v-if="loading">
      <loading-spinner class="center mt-48"></loading-spinner>
    </div>
    <div class="flex flex-row justify-between">
      <p class="text-2xl font-bold text-indigo-900">Create a new Recipe</p>
      <button
        @click="addNewRecipe"
        class="w-52 h-7 bg-indigo-900 text-white rounded-md"
      >
        Add New Recipe
      </button>
    </div>

    <div class="mb-2 w-full flex flex-row justify-between mt-4">
      <label for="recipeName" class="w-1/5">Recipe Name: </label>
      <input
        type="text"
        placeholder="Recipe Name"
        id="recipeName"
        class="border-2 rounded-md p-1 w-full"
        v-model="recipeName"
        style="outline-color: indigo"
      />
    </div>
    <div class="mb-2 w-full flex flex-row justify-between">
      <label for="recipeDescription" class="w-1/5">Recipe Description: </label>
      <input
        type="text"
        placeholder="Recipe Description"
        id="recipeDescription"
        class="border-2 rounded-md p-1 w-full"
        v-model="recipeDescription"
        style="outline-color: indigo"
      />
    </div>
    <div class="mb-2 w-full flex flex-row justify-between">
      <label for="cookingTime" class="w-1/5">Cooking Time (mins): </label>
      <input
        type="number"
        placeholder="Cooking Time in mins"
        id="cookingTime"
        class="border-2 rounded-md p-1 w-full"
        v-model="cookingTime"
        style="outline-color: indigo"
      />
    </div>
    <div class="mb-2 w-full flex flex-row justify-between">
      <label for="recipeImage" class="w-1/5">Recipe Image: </label>
      <input
        type="text"
        placeholder="Recipe Image"
        id="recipeImage"
        class="border-2 rounded-md p-1 w-full"
        v-model="recipeImage"
        style="outline-color: indigo"
      />
    </div>
    <div class="mb-4 w-1/2 flex flex-row">
      <label>Recipe Type: </label>
      <div class="w-24"></div>
      <input
        type="radio"
        id="veg-radio"
        value="Veg"
        v-model="type"
        class="mt-2"
      />
      <label for="veg-radio" class="mx-2 mt-1"> Veg </label>
      <div class="w-10"></div>
      <input
        type="radio"
        id="non-veg-radio"
        value="Non Veg"
        v-model="type"
        class="mt-2"
      />
      <label for="non-veg-radio" class="mx-2 mt-1"> Non Veg </label>
    </div>
    <div class="mb-2 w-full flex flex-row">
      <div class="w-1/5">
        <label for="recipeProcedure">Recipe Procedure: </label>
        <p class="text-gray-400 text-xs">
          Split Procedures by Hashes(#).
        </p>
      </div>
      <textarea
        type="text"
        placeholder="Recipe Procedure"
        id="recipeProcedure"
        class="border-2 rounded-md p-1 w-full"
        v-model="recipeProcedure"
        rows="7"
        style="outline-color: indigo"
      />
    </div>
    <div class="mb-2 w-full flex flex-row">
      <div class="w-1/5">
        <label for="recipeIngredients">Recipe Ingredients: </label>
        <p class="text-gray-400 text-xs">
          Split Ingredients by Hashes(#).
        </p>
      </div>
      <textarea
        type="text"
        placeholder="Recipe Ingredients"
        id="recipeProcedure"
        class="border-2 rounded-md p-1 w-full"
        v-model="recipeIngredients"
        rows="7"
        style="outline-color: indigo"
      />
    </div>
  </div>
</template>

,
<script>
import LoadingSpinner from "./UI/LoadingSpinner.vue";
export default {
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      recipeName: "",
      recipeDescription: "",
      recipeImage: "",
      recipeProcedure: "",
      type: "Veg",
      cookingTime: 90,
      recipeIngredients: "",
      loading: false,
    };
  },
  methods: {
    async addNewRecipe() {
      this.loading = true;
      await this.$store.dispatch("recipes/addNewRecipe", {
        recipeName: this.recipeName,
        recipeDescription: this.recipeDescription,
        recipeImage: this.recipeImage,
        recipeType: this.type,
        cookingTime: this.cookingTime,
        recipeProcedure: this.recipeProcedure.split("#"),
        userId: this.$store.getters["user/id"],
        userName: this.$store.getters["user/fullName"],
        ingredients: this.recipeIngredients.split("#"),
      });
      this.loading = false;
      this.$router.replace("/recipes/all");
    },
  },
};
</script>
