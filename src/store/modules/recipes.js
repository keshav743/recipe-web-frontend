export default {
  namespaced: true,
  state() {
    return {
      recipes: null,
      myRecipes: null,
    };
  },
  mutations: {
    setRecipes(state, payload) {
      state.recipes = payload.recipes;
    },
    setMyRecipes(state, payload) {
      state.myRecipes = payload.recipes;
    },
  },
  actions: {
    async getRecipes(context) {
      const result = await fetch("http://localhost:3000/api/recipes/all/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: context.rootGetters.token,
        },
      });
      if (result.status >= 200 && result.status < 400) {
        console.log("Recipes Recieved");
        const allRecipes = await result.json();
        console.log(allRecipes.data);
        await context.commit("setRecipes", { recipes: allRecipes.data.recipe });
        await context.commit("setMyRecipes", {
          recipes: allRecipes.data.recipe.filter(
            (e) => e.userId == context.rootGetters["user/id"]
          ),
        });
      }
    },

    async addNewRecipe(context, payload) {
      console.log(context.rootGetters["user/id"]);
      const result = await fetch(`http://localhost:3000/api/recipes/new/`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          authorization: context.rootGetters.token,
        },
      });
      if (result.status >= 200 && result.status < 400) {
        console.log("Recipes Recieved");
        const recipe = await result.json();
        console.log(recipe.data);
        await context.commit("setRecipeById", {
          recipe: recipe.data.recipe,
        });
      }
    },
    async editRecipe(context, payload) {
      console.log(context.rootGetters["user/id"]);
      const result = await fetch(
        `http://localhost:3000/api/recipes/edit/${payload.recipeId}/${context.rootGetters["user/id"]}`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            authorization: context.rootGetters.token,
          },
        }
      );
      if (result.status >= 200 && result.status < 400) {
        const recipe = await result.json();
        console.log(recipe.data);
      }
    },
    searchRecipe(context, payload) {
      return fetch(
        `http://localhost:3000/api/recipes/search/${
          payload.searchStr == "" ? "limitAll6" : payload.searchStr
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: context.rootGetters.token,
          },
        }
      );
    },
  },
  getters: {
    recipes(state) {
      return state.recipes;
    },
    myRecipes(state) {
      return state.myRecipes;
    },
  },
};
