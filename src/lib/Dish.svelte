<script lang="ts">
  import { scale } from "svelte/transition";
  import type { IngredientTotals, Recipe } from "../types";
    import { quintOut } from "svelte/easing";

  export let ingredientCounts: IngredientTotals;
  export let dish: Recipe;

  let ingredientList = Object.keys(ingredientCounts).filter(key => dish[key] != 0).map((item: string) => {
    return `${dish[item]} ${item}`
  })

</script>

<tr transition:scale={{ duration: 500, delay: 0, opacity: 0, start: 0, easing: quintOut }}>
  <td class="text-left">{dish.Dish}</td>
  <td>{ingredientList.join(", ")}</td>
  <td class="table-cell-fit">{dish.Base}</td>
  <!-- <td class="table-cell-fit">{strength}</td> -->
</tr>
