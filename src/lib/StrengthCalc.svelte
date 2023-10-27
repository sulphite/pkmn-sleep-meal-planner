<script lang="ts">
  import type { Recipe } from "../types";
  import type { IngredientTotals } from "../types";
  import { fly } from "svelte/transition";
  import { quintInOut } from "svelte/easing";
  import { spring } from "svelte/motion";

  export let removeSelected: () => void;
  export let dish: Recipe;
  export let ingredientCounts: IngredientTotals;

  let ingredientList = Object.keys(ingredientCounts).filter(key => dish[key] != 0).map((item: string) => {
    return `${dish[item]} ${item}`
  })

  const strScale = spring(1,{
			stiffness: 0.1,
			damping: 0.1
		})

  let totalStrength: number;
  let totalIngredients: number;

  $: totalIngredients = Object.values(ingredientCounts).reduce((total: number, val) => total + val.count, 0)

  $: totalStrength = Object.entries(ingredientCounts).reduce((total: number, ingredient) => {
    return total + ingredient[1].count * ingredient[1].strength
  }, 0) + dish.Base - dish["total base"]

  $: strScale.set(1 + totalStrength/10000)
</script>

<div in:fly={{x: 1000, delay: 500 }} out:fly={{x: 1000, duration: 500, easing: quintInOut }} class="flex flex-col gap-4 py-4 w-full">
  <div class=" w-full flex justify-between align-center">
    <h2 class="h2">{dish.Dish} <span class="badge variant-soft-primary">base: {dish.Base}</span></h2>
    <button type="button" class="btn-icon variant-filled-primary" on:click={removeSelected}>←</button>
  </div>
  <div class="grid md:grid-cols-2">
    <div>
      <p class="italic">{ingredientList.join(", ")}</p>
      <p>level: TODO</p>
      <h3 class="h3">total in pot: {totalIngredients}</h3>
    </div>
    <div class="overflow-x-clip">
      <p>strength:</p>
      <h3 class="h3" style="transform: scale({$strScale}); transform-origin: 0 0">{totalStrength}</h3>
    </div>
  </div>
</div>
