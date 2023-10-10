<script lang="ts">
  import type { Recipe } from "../types";

  export let dish: Recipe;
</script>

<tr>
  <td class="text-left">{dish.Dish}</td>
  <td class="table-cell-fit">{dish.Base}</td>
</tr>
