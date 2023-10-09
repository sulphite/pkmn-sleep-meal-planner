<script lang="ts">
  import recipes from "./data/recipes.json"
  import ingredients from "./data/ingredients.json"
  import { TabGroup, Tab, AppBar } from '@skeletonlabs/skeleton';
  import Dish from './lib/Dish.svelte';
  import IngredientCounter from "./lib/IngredientCounter.svelte";
  import type { Ingredient, Recipe } from "./types";

  let filteredRecipes: Recipe[]
  let tabSet: number = 0;
  let ingredientCounts: any = {};
  ingredients.forEach((item: Ingredient) => {
    ingredientCounts = {...ingredientCounts, [item.Name]: {count: 0, strength: item.Strength}};
  })

  const addTen = ():void => {
    Object.keys(ingredientCounts).forEach(key => {ingredientCounts[key].count += 10})
  }

  const reset = ():void => {
    Object.keys(ingredientCounts).forEach(key => {ingredientCounts[key].count = 0})
  }

  $: filteredRecipes = recipes.curries.filter((recipe: Recipe) => {
      return Object.keys(ingredientCounts).every(ingredient => {
        return ingredientCounts[ingredient].count >= recipe[ingredient]
      })
    })

</script>

<AppBar>
  <svelte:fragment slot="lead">(icon)</svelte:fragment>
  <span class="h3">Pokemon Sleep dish strength calculator</span>
  <svelte:fragment slot="trail"><a href="http://github.com/sulphite">gh</a></svelte:fragment>
</AppBar>
<main class="flex flex-col gap-4 py-4">
  <h2 class="h2">Ingredient input</h2>
  <div class="flex gap-4">
    <button type="button" class="btn variant-filled-secondary" on:click={addTen}>+10 All</button>
    <button type="button" class="btn variant-filled-tertiary" on:click={reset}>Reset All</button>
  </div>
  <div class="grid gap-4 grid-cols-3 md:grid-cols-5">
    {#each ingredients as ingredient}
      <IngredientCounter {ingredient} bind:count={ingredientCounts[ingredient.Name].count} />
    {/each}
  </div>

  <TabGroup>
    <Tab bind:group={tabSet} name="Curries" value={0}>
      <!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
      <span>Curries</span>
    </Tab>
    <Tab bind:group={tabSet} name="Salads" value={1}>Salads</Tab>
    <Tab bind:group={tabSet} name="Desserts" value={2}>Desserts</Tab>
    <!-- Tab Panels --->
    <svelte:fragment slot="panel">
      <div class="table-container">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th class="table-cell-fit">Strength</th>
            </tr>
          </thead>
          <tbody>
            {#if tabSet === 0}
                {#each filteredRecipes as curry}
                    <Dish dish={curry} />
                {/each}
            {:else if tabSet === 1}
                {#each recipes.salads as salad}
                  <Dish dish={salad} />
                {/each}
            {:else if tabSet === 2}
                {#each recipes.desserts as dessert}
                  <Dish dish={dessert} />
                {/each}
            {/if}
          </tbody>
        </table>
      </div>
    </svelte:fragment>
  </TabGroup>
</main>


<style>
  main {
    max-width: 1000px;
    margin: 0 auto;
  }

  h2 { font-weight: 200;}
</style>
