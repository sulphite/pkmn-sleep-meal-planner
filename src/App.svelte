<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import recipes from "./data/recipes.json"
  import { TabGroup, Tab, Table } from '@skeletonlabs/skeleton';
  import { AppShell } from '@skeletonlabs/skeleton';
    import Dish from './lib/Dish.svelte';

  let tabSet: number = 0;
</script>

<main>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div> -->
  <h1>Pokemon Sleep dish strength calculator</h1>

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
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
