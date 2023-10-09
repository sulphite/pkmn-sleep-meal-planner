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
    <input type="text" inputmode="numeric" class="input text-center" bind:value={count} />
    <button class="input-group-shim" on:click={increment}>+</button>
  </div>
</label>

<style>
  button {
    font-size: 1.5rem;
    border-radius: 0;
    padding: 0;
    justify-content: center;
    margin-top: -0.25em;
    border: 0
  }

  button:hover {
    border:0;
  }
</style>
