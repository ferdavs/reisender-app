<script lang="ts">
  import { to_number } from "svelte/internal";

  export let imageUrl = "~/images/place_holder.png";
  export let name: string;
  export let height = "150";
  export let width = "180";
  export let selected = false;
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<absoluteLayout>
  <imgCache
    class="image"
    {height}
    {width}
    src={imageUrl}
    stretch="aspectFill"
  />
  {#if name}
    <label top="15" left="15" text={name} class="label" />
  {/if}
  {#if selected}
  <label top="{to_number(height) / 2-24}" left="{to_number(width) / 2-24}">
    <formattedString>
      <span text="&#xf00c;" class="fas check" />
    </formattedString>
  </label>
{/if}
</absoluteLayout>

<style>
  .image {
    margin: 8;
    border-radius: 5;
    border-width: 1;
    border-color: rgba(187, 187, 187, 0.356);
  }
  .label {
    background: rgba(92, 92, 92, 0.349);
    border-radius: 5;
    padding: 2;
    margin: 0;
    color: rgb(255, 255, 255);
    text-align: center;
    font-size: 12px;
  }
  .check {
    padding: 2;
    margin: 0;
    color: rgba(123, 255, 0, 0.582);
    text-align: center;
    font-size: 64px;
  }
</style>
