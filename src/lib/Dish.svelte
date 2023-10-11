<script lang="ts">
  import { scale } from "svelte/transition";
  import type { IngredientTotals, Recipe } from "../types";
    import { quintOut } from "svelte/easing";

  export let ingredientCounts: IngredientTotals;
  export let dish: Recipe;

  let ingredientList = Object.keys(ingredientCounts).filter(key => dish[key] != 0).map((item: string) => {
    return `${dish[item]} ${item}`
  })

  // let strength: number;

  // $: strength = Object.entries(ingredientCounts).reduce((total: number, ingredient) => {
  //   return total + ingredient[1].count * ingredient[1].strength
  // }, 0) + dish.Base - dish["total base"]
</script>

<tr transition:scale={{ duration: 500, delay: 0, opacity: 0, start: 0, easing: quintOut }}>
  <td class="text-left">{dish.Dish}</td>
  <td>{ingredientList.join(", ")}</td>
  <td class="table-cell-fit">{dish.Base}</td>
  <!-- <td class="table-cell-fit">{strength}</td> -->
</tr>
