<script lang="ts">
  import type { Ingredient } from "../types";

  export let ingredient: Ingredient;
  export let count: number;
  export let src: string;

  const buttonClasses = "btn-icon btn-icon-sm variant-soft-surface"

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
    <img src={src} alt="{ingredient.Name}" class="opacity-80" class:opacity-30={count == 0}>
  <span class:opacity-50={count == 0} >{ingredient.Name}
    <span class:opacity-50={count == 0} class="badge variant-ringed-surface">{ingredient.Strength}</span>
  </span>
  <input type="number" class="input text-center rounded-none" class:opacity-50={count == 0} bind:value={count} />
  <div class="">
    <button class={buttonClasses}
      aria-label="decrement value"
      on:click={decrement} >-</button>
    <button class={buttonClasses}
      aria-label="increment value"
      on:click={increment}>+</button>
  </div>
</label>

<style>
  button {
    font-size: 1.5rem;
    z-index: 11;
    border: 0;
  }

  img {
    max-width: 80px;
    position: absolute;
    z-index: 1;
    margin-top: 0.5em;
  }

  button:hover {
    border:0;
  }

  label > span {
    letter-spacing: 1px;
    font-size: 0.75rem;
    z-index: 10;
    position: relative;
  }

  span > span {
    font-weight: 600;
    font-style: italic;
    letter-spacing: 0;
    font-size: 0.6rem;

  }

  input {
    background: transparent;
    border: none;
    font-size: 1.5rem;
  }
</style>
