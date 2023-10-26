<script lang="ts">
  import recipes from "./data/recipes.json"
  import ingredients from "./data/ingredients.json"
  import { TabGroup, Tab, AppBar, setModeCurrent } from '@skeletonlabs/skeleton';
  import Dish from './lib/Dish.svelte';
  import StrengthCalc from "./lib/StrengthCalc.svelte";
  import IngredientCounter from "./lib/IngredientCounter.svelte";
  import type { Ingredient, IngredientTotals, Recipe } from "./types";

  let filteredRecipes: { curries: Recipe[], salads: Recipe[], desserts: Recipe[]}
  let tabSet: number = 0;
  let potSize: number = 50;
  let ingredientCounts = {} as IngredientTotals;
  ingredients.forEach((item: Ingredient) => {
    ingredientCounts = {...ingredientCounts, [item.Name]: {count: 0, strength: item.Strength}};
  })
  let selectedDish: Recipe | null = null

  const sortFn = (a: Recipe, b: Recipe) => {
    return b.Base - a.Base
  }

  const addTen = ():void => {
    Object.keys(ingredientCounts).forEach(key => {ingredientCounts[key].count += 10})
  }

  const reset = ():void => {
    Object.keys(ingredientCounts).forEach(key => {ingredientCounts[key].count = 0})
  }

  const setSelected = (dish: Recipe): void => {
    selectedDish = dish;
  }

  const removeSelected = ():void => {
    selectedDish = null;
  }

  const filterByIngredients = (recipes: Recipe[], ingredientList: IngredientTotals): Recipe[] => {
    return recipes.filter((recipe: Recipe) => {
      return Object.keys(ingredientList).every(ingredient => {
        return ingredientList[ingredient].count >= recipe[ingredient]
      })
    })
  }

  $: filteredRecipes = {
    curries: filterByIngredients(recipes.curries, ingredientCounts).sort(sortFn),
    salads: filterByIngredients(recipes.salads, ingredientCounts).sort(sortFn),
    desserts: filterByIngredients(recipes.desserts, ingredientCounts).sort(sortFn)
  }

</script>

<AppBar>
  <svelte:fragment slot="lead">(icon)</svelte:fragment>
  <span class="h3">Pokemon Sleep dish strength calculator</span>
  <svelte:fragment slot="trail"><a href="http://github.com/sulphite">gh</a></svelte:fragment>
</AppBar>
<main class="flex flex-col gap-4 py-4">
  <h2 class="h2">Ingredient input</h2>
  <div class="flex w-full justify-between gap-4">
    <div class="flex gap-4 flex-wrap">
      <button type="button" class="btn variant-filled-secondary" on:click={addTen}>+10 All</button>
      <button type="button" class="btn variant-filled-tertiary" on:click={reset}>Reset All</button>
    </div>
    <div class="flex gap-4 hidden">
      <span>Pot Size:</span>
      <input type="number" class="input" bind:value={potSize} >
    </div>
  </div>
  <div class="grid gap-4 grid-cols-2 md:grid-cols-5 justify-items-center">
    {#each ingredients as ingredient}
      <IngredientCounter {ingredient} bind:count={ingredientCounts[ingredient.Name].count} />
    {/each}
  </div>

  {#if selectedDish}
    <StrengthCalc dish={selectedDish} {ingredientCounts} {removeSelected} />

  {:else}
    <TabGroup>
      <Tab bind:group={tabSet} name="Curries" value={0}>
        <span>Curries</span>
      </Tab>
      <Tab bind:group={tabSet} name="Salads" value={1}>Salads</Tab>
      <Tab bind:group={tabSet} name="Desserts" value={2}>Desserts</Tab>
      <!-- Tab Panels --->
      <svelte:fragment slot="panel">
        <div class="table-container">
          <table class="table table-hover table-compact">
            <thead>
              <tr>
                <th>Name</th>
                <th>ingredients</th>
                <th class="table-cell-fit table-sort-dsc">Strength</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {#if tabSet === 0}
                  {#each filteredRecipes.curries as dish (dish["Dish"]) }
                    <Dish {dish} {ingredientCounts} {setSelected} />
                  {/each}
              {:else if tabSet === 1}
                  {#each filteredRecipes.salads as dish (dish["Dish"]) }
                    <Dish {dish} {ingredientCounts} {setSelected} />
                  {/each}
              {:else if tabSet === 2}
                  {#each filteredRecipes.desserts as dish (dish["Dish"]) }
                    <Dish {dish} {ingredientCounts} {setSelected} />
                  {/each}
              {/if}
            </tbody>
          </table>
        </div>
      </svelte:fragment>
    </TabGroup>
  {/if}
</main>


<style>
  main {
    max-width: 100vw;
    padding: 0.5em;
  }

  h2 { font-weight: 200;}

  @media (min-width: 800px) {
    main {
    max-width: 1000px;
    margin: 0 auto;
  }
  }
</style>
