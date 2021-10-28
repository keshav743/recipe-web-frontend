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
  <div class="mx-8 my-4 flex flex-col" v-else>
    <div class="absolute z-10 backdrop" v-if="loading">
      <loading-spinner class="center mt-48"></loading-spinner>
    </div>
    <div
      class="absolute z-10 backdrop"
      v-if="recipe['userId'] !== $store.getters['user/id']"
    >
      <dialog open class="rounded-lg my-36 p-10 text-center">
        <p class="text-xl font-normal p-2 w-56 mb-5">
          You are not allowed to edit this food
        </p>
        <button
          @click="goBack"
          class="px-4 py-2 text-white bg-indigo-900 mx-auto rounded-lg cursor-pointer"
        >
          Go Back to Recipes Page
        </button>
      </dialog>
    </div>
    <div v-else>
      <div class="flex flex-row justify-between">
        <p class="text-2xl font-bold text-indigo-900">Edit Recipe</p>
        <button
          @click="editRecipe"
          class="w-52 h-7 bg-indigo-900 text-white rounded-md"
        >
          Edit Recipe
        </button>
      </div>
      <div v-if="errMsg" class="absolute z-10 backdrop">
        <dialog open class="rounded-lg my-36 p-10 text-center">
          <p class="text-xl font-normal p-2 w-56 mb-5">
            {{ errMsg }}
          </p>
          <button
            @click="clearErr"
            class="px-4 py-2 text-white bg-indigo-900 mx-auto rounded-lg cursor-pointer"
          >
            Okay
          </button>
        </dialog>
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
        <label for="recipeDescription" class="w-1/5"
          >Recipe Description:
        </label>
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
          <label for="recipeIngredients">Recipe Procedure: </label>
        </div>
        <div class="w-full">
          <div
            v-for="(input, index) in recipeProcedure"
            :key="`Procedure-${index}`"
            class="input flex flex-col w-full"
          >
            <div class="flex flex-row pb-2">
              <input
                type="text"
                class="border-2 rounded-md p-1 w-full"
                placeholder=" Enter Procedure"
                v-model="input.proc"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                class="ml-2 cursor-pointer"
                @click="addProcField(index)"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  fill="green"
                  d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
                />
              </svg>
              <svg
                v-if="index > 0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                class="ml-2 cursor-pointer"
                @click="removeProcField(index)"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  fill="#EC4899"
                  d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-2 w-full flex flex-row">
        <div class="w-1/5">
          <label for="recipeIngredients">Recipe Ingredients: </label>
        </div>
        <div class="w-full">
          <div
            v-for="(input, index) in recipeIngredients"
            :key="`Ingredient-${index}`"
            class="input flex flex-col w-full"
          >
            <div class="flex flex-row pb-2">
              <input
                type="text"
                class="border-2 rounded-md p-1 w-full"
                placeholder=" Enter Ingredient"
                v-model="input.ingr"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                class="ml-2 cursor-pointer"
                @click="addIngField(index)"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  fill="green"
                  d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
                />
              </svg>
              <svg
                v-if="index > 0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                class="ml-2 cursor-pointer"
                @click="removeIngField(index)"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  fill="#EC4899"
                  d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
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
  props: ["recipeId"],
  data() {
    return {
      recipe: null,
      recipeName: "",
      recipeDescription: "",
      recipeImage: "",
      recipeProcedure: [],
      type: "Veg",
      cookingTime: 90,
      loading: false,
      recipeIngredients: [],
      errMsg: null,
    };
  },
  methods: {
    goBack() {
      this.$router.push("/recipes/all");
    },
    clearErr() {
      this.errMsg = null;
    },
    addIngField(index) {
      this.recipeIngredients = [
        ...this.recipeIngredients.slice(0, index + 1),
        { ingr: "" },
        ...this.recipeIngredients.slice(index + 1),
      ];
    },
    removeIngField(index) {
      this.recipeIngredients.splice(index, 1);
    },
    addProcField(index) {
      this.recipeProcedure = [
        ...this.recipeProcedure.slice(0, index + 1),
        { proc: "" },
        ...this.recipeProcedure.slice(index + 1),
      ];
    },
    removeProcField(index) {
      this.recipeProcedure.splice(index, 1);
    },
    async editRecipe() {
      this.loading = true;
      let recipeIngArr = this.recipeIngredients.map((e) => {
        if (e.ingr.trim() != "") {
          return e.ingr.trim();
        }
      });
      let recipeProcArr = this.recipeProcedure.map((e) => {
        if (e.proc.trim() != "") {
          return e.proc.trim();
        }
      });
      let finalIngArr = [];
      let finalProcArr = [];
      for (let i = 0; i < recipeIngArr.length; i++) {
        if (recipeIngArr[i]) {
          finalIngArr.push(recipeIngArr[i]);
        }
      }
      for (let i = 0; i < recipeProcArr.length; i++) {
        if (recipeProcArr[i]) {
          finalProcArr.push(recipeProcArr[i]);
        }
      }
      if (
        this.recipeName.trim() == "" ||
        this.recipeDescription.trim() == "" ||
        this.recipeImage.trim() == "" ||
        finalProcArr.length == 0 ||
        finalIngArr.length == 0
      ) {
        this.errMsg = "All fields are required..";
        this.loading = false;
        return;
      }
      await this.$store.dispatch("recipes/editRecipe", {
        recipeName: this.recipeName,
        recipeDescription: this.recipeDescription,
        recipeImage: this.recipeImage,
        recipeType: this.type,
        cookingTime: this.cookingTime,
        recipeProcedure: finalProcArr,
        recipeId: this.recipeId,
        ingredients: finalIngArr,
      });
      this.loading = false;
      this.$router.replace("/recipes/all");
    },
  },
  created() {
    fetch(
      `https://radiant-ridge-40570.herokuapp.com/api/recipes/${this.recipeId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: this.$store.getters.token,
        },
      }
    ).then((result) => {
      if (result.status >= 200 && result.status < 400) {
        console.log("Recipes Recieved");
        result.json().then((recipe) => {
          recipe = recipe.data.recipe;
          console.log(recipe);
          this.recipeName = recipe.recipeName;
          this.recipeDescription = recipe.recipeDescription;
          this.recipeImage = recipe.recipeImage;
          this.recipeProcedure = recipe.recipeProcedure.map((e) => {
            return {
              proc: e,
            };
          });
          this.cookingTime = recipe.cookingTime;
          this.type = recipe.recipeType;
          this.recipeIngredients = recipe.ingredients.map((e) => {
            return {
              ingr: e,
            };
          });
          this.recipe = recipe;
          console.log(recipe["userId"], this.$store.getters["user/id"]);
        });
      } else {
        this.recipe = false;
      }
    });
  },
};
</script>
