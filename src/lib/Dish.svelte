<script lang="ts">
  import type { IngredientTotals, Recipe } from "../types";

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

<tr>
  <td class="text-left">{dish.Dish}</td>
  <td>{ingredientList.join(", ")}</td>
  <td class="table-cell-fit">{dish.Base}</td>
  <!-- <td class="table-cell-fit">{strength}</td> -->
</tr>
