<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let count: number = 0;
  const increment = () => {
    count++
    updateCount()
  }

  const updateCount = () => {
    dispatch("updateCount", { name: ingredient.Name, count: Number(count) } )
  }

  const decrement = () => {
    if (count > 0) {
      count--
    }
    updateCount()
  }
  export let ingredient: any;
</script>


<label class="label">
  <span>{ingredient.Name}</span>
  <div class="input-group grid-cols-3">
    <button class="input-group-shim"
      aria-label="decrement value"
      on:click={decrement} >-</button>
    <input type="text" inputmode="numeric" class="input text-center" bind:value={count}
      on:change={updateCount} />
    <button class="input-group-shim"
      aria-label="increment value"
      on:click={increment}>+</button>
  </div>
</label>

<style>
  button {
    font-size: 1.5rem;
    border-radius: 0;
    padding: 0;
    justify-content: center;
    margin-top: -0.25em;
    border: 0
  }

  button:hover {
    border:0;
  }
</style>
