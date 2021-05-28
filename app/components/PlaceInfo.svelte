<script lang="ts">
  import { Place, User } from "~/data/models";

  export let place: Place = new Place();
  // export let user: User;
</script>

<page>
  <actionBar flat="true">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label bind:text={place.name} fontSize="24" horizontalAlignment="center" />
  </actionBar>
  <gridLayout columns="*, *" rows="3*, 6*, 2*">
    <imgCache
      src={place.imageUrl}
      stretch="aspectFill"
      row="0"
      col="0"
      widith="75%"
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
      html={place.description}
      row="1"
      col="0"
      colSpan="2"
      class="border-props"
    />
    <button row="2" col="0">
      <formattedString>
        <span text="&#xf067;" class="fas" />
        <span text=" Add to Wishlist" />
      </formattedString>
    </button>
    <button row="2" col="1">
      <formattedString>
        <span text="&#xf00c;" class="fas" />
        <span text=" Add to Visited" />
      </formattedString>
    </button>
  </gridLayout>
</page>

<style>
  .border-props {
    border-width: 1;
    border-color: rgba(187, 187, 187, 0.356);
    border-radius: 3;
    margin: 8;
  }
</style>
