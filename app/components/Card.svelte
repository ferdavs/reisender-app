<script lang="ts">
  // import {Img} from "@nativescript-community/ui-image"
  export let imageUrl = "~/images/place_holder.png";
  export let name: string;
  export let height = "150";
  export let width = "180";
</script>

<absoluteLayout>
  <imgCache
    class="image"
    {height}
    {width}
    src={imageUrl}
    stretch="aspectFill"
  />
  <!-- svelte-ignore a11y-label-has-associated-control -->
  {#if name}
    <label top="15" left="15" text={name} class="label" />
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
    background: rgba(187, 187, 187, 0.288);
    padding: 2;
    margin: 0;
    color: rgb(0, 0, 0);
    text-align: center;
    font-size: 12px;
  }
</style>
