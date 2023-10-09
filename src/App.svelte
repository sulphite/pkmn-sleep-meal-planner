<script lang="ts">
  import recipes from "./data/recipes.json"
  import ingredients from "./data/ingredients.json"
  import { TabGroup, Tab, AppBar } from '@skeletonlabs/skeleton';
  import Dish from './lib/Dish.svelte';
  import IngredientCounter from "./lib/IngredientCounter.svelte";

  let tabSet: number = 0;
</script>

<AppBar>
  <svelte:fragment slot="lead">(icon)</svelte:fragment>
  <span>Pokemon Sleep dish strength calculator</span>
  <svelte:fragment slot="trail"><a href="http://github.com/sulphite">gh</a></svelte:fragment>
</AppBar>
<main>
  <h2>Ingredient input</h2>
  <div class="grid gap-4 md:grid-cols-5">
    {#each ingredients as ingredient}
      <IngredientCounter {ingredient} />
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
        {#if tabSet === 0}
          <tbody>
            {#each recipes.curries as curry}
                <Dish dish={curry} />
            {/each}
          </tbody>
        {:else if tabSet === 1}
          <tbody>
            {#each recipes.salads as salad}
              <Dish dish={salad} />
            {/each}
          </tbody>
        {:else if tabSet === 2}
          <tbody>
            {#each recipes.desserts as dessert}
              <Dish dish={dessert} />
            {/each}
          </tbody>
        {/if}
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
