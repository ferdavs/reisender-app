<script lang="ts">
  import { Place } from "~/data/models";

  export let place: Place = new Place();
</script>

<page>
  <actionBar flat="true">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label bind:text={place.name} fontSize="24" horizontalAlignment="center" />
  </actionBar>
  <gridLayout columns="*, *" rows="2*, 3*, 1*">
    <image
      src={place.imageUrl}
      stretch="aspectFill"
      row="0"
      col="0"
      class="border-props"
    />
    <htmlView
      editable="false"
      html="<strong>info</strong>"
      row="0"
      col="1"
      class="border-props"
    />
    <htmlView
      editable="false"
      html="<strong>description</strong>"
      row="1"
      col="0"
      colSpan="2"
      class="border-props"
    />

    <button text="Add to Wishlist" row="2" col="0" />
    <button text="Add to Visited" row="2" col="1" />
  </gridLayout>
</page>

<style>
  .border-props {
    border-width: 1;
    border-color: gray;
    border-radius: 3;
    margin: 8;
    margin-left: 16;
    margin-right: 16;
  }
</style>
