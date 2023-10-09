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
    ingredientCounts = {...ingredientCounts, [item.Name]: 0};
  })

  const handleUpdate = (event: CustomEvent<{count: number; name: string}>) => {
    const {name, count} = event.detail;
    ingredientCounts[name] = count;
  }

  const addTen = () => {
    Object.keys(ingredientCounts).forEach(key => {ingredientCounts[key] += 10})
  }

  const reset = () => {
    Object.keys(ingredientCounts).forEach(key => {ingredientCounts[key] = 0})
  }

  $: filteredRecipes = recipes.curries.filter((recipe: Recipe) => {
      return Object.keys(ingredientCounts).every(ingredient => {
        return ingredientCounts[ingredient] >= recipe[ingredient]
      })
    })

</script>

<AppBar>
  <svelte:fragment slot="lead">(icon)</svelte:fragment>
  <span class="h3">Pokemon Sleep dish strength calculator</span>
  <svelte:fragment slot="trail"><a href="http://github.com/sulphite">gh</a></svelte:fragment>
</AppBar>
<main>
  <h2 class="h2">Ingredient input</h2>
  <button type="button" class="btn variant-filled-primary" on:click={reset}>Reset All</button>
  <button type="button" class="btn variant-filled-primary" on:click={addTen}>+10 All</button>
  <div class="grid gap-4 grid-cols-3 md:grid-cols-5">
    {#each ingredients as ingredient}
      <IngredientCounter on:updateCount={handleUpdate} {ingredient} />
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
</style>
