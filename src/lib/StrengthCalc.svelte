<script lang="ts">
  import type { Recipe } from "../types";
  import type { IngredientTotals } from "../types";
  import { fly } from "svelte/transition";
  import { quintInOut } from "svelte/easing";
  import { spring } from "svelte/motion";
  import multiplierData from "../data/dish_lvl_strength.json";
  import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";

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
  <div class=" w-full flex justify-between items-center">
    <h3 class="h3"><span class="font-bold text-primary-500">{totalIngredients}</span> ingredients in the pot</h3>
    <button type="button" class="btn-icon variant-filled-primary" on:click={removeSelected}>←</button>
  </div>

  <div class="grid md:grid-cols-2 gap-4">
    <div class="card variant-soft-surface">
      <h2 class="h2 handwritten">{dish.Dish}
        <!-- <span class="badge variant-ringed-secondary" style="font-family: Inter; ">base: {dish.Base}</span> -->
      </h2>
      <label>
        <span class="tracking-wider">level:</span>
        <input type="number" class="text-center w-fit border-0" min="1" max="50" bind:value={dishLevel}>
      </label>
      <p class="italic">{ingredientList.join(", ")}</p>
    </div>

    <div class="overflow-x-clip">
      <span class="tracking-wider">extra tasty?</span>
      <RadioGroup active="variant-filled-primary">
        <RadioItem bind:group={tastyMultiplier} name="justify" value={1}>x1</RadioItem>
        <RadioItem bind:group={tastyMultiplier} name="justify" value={2}>x2</RadioItem>
        <RadioItem bind:group={tastyMultiplier} name="justify" value={3}>x3</RadioItem>
      </RadioGroup>
      <p class="tracking-wider">strength:</p>
      <h3 class="h3 font-semibold" style="transform: scale({$strScale}); transform-origin: 0 0">{totalStrength}</h3>
    </div>
  </div>
</div>

<style>

  .handwritten {
    font-family: "Short Stack";
  }

  input {
    background-color: transparent;
    font-weight: 700;
  }
</style>
