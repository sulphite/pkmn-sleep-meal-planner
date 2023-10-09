<script lang="ts">
  let count: number = 0
  const increment = () => {
    count += 1
  }

  const decrement = () => {
    if (count > 0) {
      count -= 1
    }
  }
  export let ingredient: any;
</script>

<label class="label">
  <span>{ingredient.Name}</span>
  <div class="input-group grid-cols-3">
    <button class="input-group-shim" on:click={decrement}>-</button>
    <input type="text" inputmode="numeric" class="input" bind:value={count} />
    <button class="input-group-shim" on:click={increment}>+</button>
  </div>
</label>
