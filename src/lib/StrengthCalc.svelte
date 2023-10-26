<script lang="ts">
  import type { Recipe } from "../types";
  import type { IngredientTotals } from "../types";

  export let dish: Recipe;
  export let ingredientCounts: IngredientTotals;

  let totalStrength: number;
  let totalIngredients: number;

  $: totalIngredients = Object.values(ingredientCounts).reduce((total: number, val) => total + val.count, 0)

  $: totalStrength = Object.entries(ingredientCounts).reduce((total: number, ingredient) => {
    return total + ingredient[1].count * ingredient[1].strength
  }, 0) + dish.Base - dish["total base"]
</script>

<button type="button" class="btn variant-filled-secondary">back</button>
<h2 class="h2">{dish.Dish}</h2>
<h3 class="h3">base strength: {dish.Base}</h3>
<h3 class="h3">strength: {totalStrength}</h3>
<h3 class="h3">total in pot: {totalIngredients}</h3>
