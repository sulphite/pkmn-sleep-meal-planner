<script lang="ts">
  import type { Recipe } from "../types";
  import type { IngredientTotals } from "../types";
  import { fly } from "svelte/transition";
  import { quintInOut } from "svelte/easing";

  export let removeSelected: () => void;
  export let dish: Recipe;
  export let ingredientCounts: IngredientTotals;

  let totalStrength: number;
  let totalIngredients: number;

  $: totalIngredients = Object.values(ingredientCounts).reduce((total: number, val) => total + val.count, 0)

  $: totalStrength = Object.entries(ingredientCounts).reduce((total: number, ingredient) => {
    return total + ingredient[1].count * ingredient[1].strength
  }, 0) + dish.Base - dish["total base"]
</script>

<div in:fly={{x: 1000, delay: 500 }} out:fly={{x: 1000, duration: 500, easing: quintInOut }} class="flex flex-col gap-4 py-4 w-full">
  <div class=" w-full flex justify-between">
    <h2 class="h2">{dish.Dish}</h2>
    <button type="button" class="btn-icon variant-filled-primary" on:click={removeSelected}>←</button>
  </div>
  <h3 class="h3">base strength: {dish.Base}</h3>
  <h3 class="h3">strength: {totalStrength}</h3>
  <h3 class="h3">total in pot: {totalIngredients}</h3>
</div>
