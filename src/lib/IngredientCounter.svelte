<script lang="ts">
  import type { Ingredient } from "../types";

  export let ingredient: Ingredient;
  export let count: number;

  const buttonClasses = "input-group-shim variant-glass-surface rounded-none"

  const increment = (): void => {
    count++;
  }

  const decrement = (): void => {
    if (count > 0) {
      count--;
    }
  }
</script>


<label class="label max-w-[80%] sm:max-w-full"  >
  <span class:opacity-50={count == 0} >{ingredient.Name}
    <span class:opacity-50={count == 0} class="badge variant-ringed-surface">{ingredient.Strength}</span>
  </span>
  <div class="input-group variant-glass-surface grid-cols-3">
    <button class={buttonClasses}
      aria-label="decrement value"
      on:click={decrement} >-</button>
    <input type="text" inputmode="numeric" class="input text-center variant-glass-surface rounded-none" class:opacity-50={count == 0} bind:value={count} />
    <button class={buttonClasses}
      aria-label="increment value"
      on:click={increment}>+</button>
  </div>
</label>

<style>
  button {
    font-size: 1.5rem;
    padding: 0;
    justify-content: center;
    margin-top: -0.25em;
    border: 0
  }

  button:hover {
    border:0;
  }

  label > span {
    letter-spacing: 1px;
    font-size: 0.75rem;
  }

  span > span {
    font-weight: 600;
    font-style: italic;
    letter-spacing: 0;
    font-size: 0.6rem;

  }

  input {
    background: transparent;
  }
</style>
