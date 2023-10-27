<script lang="ts">
  import type { Recipe } from "../types";
  import type { IngredientTotals } from "../types";
  import { fly } from "svelte/transition";
  import { quintInOut } from "svelte/easing";
  import { spring } from "svelte/motion";
  import multiplierData from "../data/dish_lvl_strength.json";

  export let removeSelected: () => void;
  export let dish: Recipe;
  export let ingredientCounts: IngredientTotals;

  let dishLevel: number = 1;
  let tastyMultiplier: number = 1;
  const multipliers: number[] = multiplierData.map(item => item.Multiplier)

  let ingredientList = Object.keys(ingredientCounts).filter(key => dish[key] != 0).map((item: string) => {
    return `${dish[item]} ${item}`
  })

  const strScale = spring(1, { stiffness: 0.5, damping: 0.25 });

  let totalStrength: number;
  let totalIngredients: number;

  $: totalIngredients = Object.values(ingredientCounts).reduce((total: number, val) => total + val.count, 0)

  $: totalStrength = Math.round((Object.entries(ingredientCounts).reduce((total: number, ingredient) => {
    return total + ingredient[1].count * ingredient[1].strength
  }, 0) + dish.Base - dish["total base"]) * multipliers[dishLevel - 1]) * tastyMultiplier

  $: strScale.set(1 + totalStrength/10000)
</script>

<div in:fly={{x: 1000, delay: 500 }} out:fly={{x: 1000, duration: 500, easing: quintInOut }} class="flex flex-col gap-4 py-4 w-full">
  <div class=" w-full flex justify-between align-center">
    <h2 class="h2 handwritten">{dish.Dish}
      <span class="badge variant-ringed-secondary" style="font-family: Inter; ">base: {dish.Base}</span>
    </h2>
    <button type="button" class="btn-icon variant-filled-primary" on:click={removeSelected}>←</button>
  </div>
  <div class="grid md:grid-cols-2">
    <div>
      <p class="italic">{ingredientList.join(", ")}</p>
      <label class="label max-w-[80px]">
        <span>level:</span>
        <input type="number" class="input text-center variant-glass-surface" min="1" max="50" bind:value={dishLevel}>
      </label>
      <label class="label max-w-[80px]">
        <span>extra tasty:</span>
        <input type="number" class="input text-center variant-glass-surface" min="1" max="3" bind:value={tastyMultiplier}>
      </label>
      <h3 class="h3">{totalIngredients} ingredients in the pot</h3>
    </div>
    <div class="overflow-x-clip">
      <p>strength:</p>
      <h3 class="h3 font-medium" style="transform: scale({$strScale}); transform-origin: 0 0">{totalStrength}</h3>
    </div>
  </div>
</div>

<style>
  label span {
    font-size: 0.8rem;
    letter-spacing: 1px;
  }

  .handwritten {
    font-family: "Short Stack";
  }
</style>
