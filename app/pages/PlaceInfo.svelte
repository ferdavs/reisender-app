<script lang="ts">
  import { ObservableArray } from "@nativescript/core";
  import { goBack } from "svelte-native";
  import { Place, User } from "~/data/models";
  import ActionBar from "./ActionBar.svelte";
  import Wiki from "../data/wiki";
  import { inject } from "~/util";
  import { log } from "@nativescript/core/profiling";
  import Api from "~/data/api";

  export let user: User = new User();
  export let place: Place = new Place();
  export let visited = new ObservableArray<Place>();
  export let wishlist = new ObservableArray<Place>();

  let wiki: Wiki = inject("Wiki");
  let api: Api = inject("Api");
  let description = place.description;
  let info = "";

  let inVisited = visited.filter((value) => value.id == place.id).length > 0;
  let inWishlist = wishlist.filter((value) => value.id == place.id).length > 0;

  function addWishlist() {
    api
      .wishListAdd(user, place)
      .then((res) => {
        wishlist.push(place);
        inWishlist = true;
      })
      .catch((e) => {
        log(e);
      });
  }

  function deleteWishlist() {
    api
      .wishListDelete(user, place)
      .then((res) => {
        wishlist.splice(wishlist.indexOf(place), 1);
        inWishlist = false;
      })
      .catch((e) => {
        log(e);
      });
  }

  function addVisited() {
    api
      .visitedListAdd(user, place)
      .then((res) => {
        visited.push(place);
        inVisited = true;
      })
      .catch((e) => {
        log(e);
      });
  }
  
  function deleteVisited() {
    api
      .visitedListDelete(user, place)
      .then((res) => {
        visited.splice(visited.indexOf(place), 1);
        inVisited = false;
      })
      .catch((e) => {
        log(e);
      });
  }

  wiki
    .summary(place.name)
    .then((s) => {
      description = s;
      place.description = s;
    })
    .catch((e) => log(e));
</script>

<page>
  <ActionBar
    title={place.name}
    action={goBack}
    fontClass="fas"
    fontIcon="font://&#xf053;"
  />

  <gridLayout columns="*, *" rows="3*, 6*, 2*">
    <imgCache
      src={place.imageUrl}
      stretch="aspectFill"
      row="0"
      col="0"
      widith="75%"
      class="border-props"
      roundedCornerRadius="12"
      roundBottomRight="true"
      roundBottomLeft="true"
      roundTopLeft="true"
      roundTopRight="true"
    />
    <htmlView editable="false" html={info} row="0" col="1" class="desc" />
    <htmlView
      editable="false"
      html={description}
      row="1"
      col="0"
      colSpan="2"
      class="desc border-props"
    />
    <button
      row="2"
      col="0"
      class="btn"
      on:tap={inWishlist ? deleteWishlist : addWishlist}
    >
      <formattedString>
        {#if !inWishlist}
          <span text="&#xf067;" class="fas" />
          <span text=" Add to Wishlist" />
        {:else}
          <span text="&#xf00d;" class="fas" />
          <span text=" Remove from Wishlist" />
        {/if}
      </formattedString>
    </button>

    <button
      row="2"
      col="1"
      class="btn"
      on:tap={inVisited ? deleteVisited : addVisited}
    >
      <formattedString>
        {#if !inVisited}
          <span text="&#xf00c;" class="fas" />
          <span text=" Add to Visited" />
        {:else}
          <span text="&#xf00d;" class="fas" />
          <span text=" Remove from Visited" />
        {/if}
      </formattedString>
    </button>
  </gridLayout>
</page>

<style>
  .border-props {
    border-width: 1;
    border-color: rgba(187, 187, 187, 0.356);
    border-radius: 5;
    margin: 8;
  }
  .btn {
    font-weight: bold;
    font-size: 18;
    height: 64;
  }
  .desc {
    font-size: 20;
  }
</style>
