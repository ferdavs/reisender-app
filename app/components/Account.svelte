<script lang="ts">
  import { ObservableArray } from "@nativescript/core";
  import { navigate, goBack } from "svelte-native";
  import { isNull, storeDeleteAll, storeGetSync, storePut } from "~/util";
  import { User, Place } from "../data/models";
  import ActionBar from "./ActionBar.svelte";
  import Login from "./Login.svelte";
  import PlaceInfo from "./PlaceInfo.svelte";
  import PlaceList from "./PlaceList.svelte";

  export let user: User;
  export let visited = new ObservableArray<Place>();
  export let wishlist = new ObservableArray<Place>();

  let title = "";
  $: title = isNull(user.name) ? user.username : user.name;
  function onLogout() {
    storeDeleteAll().then((res) => {
      if (res)
        navigate({
          page: Login,
          clearHistory: true,
        });
    });
  }

  function onDelete() {}

  function onVisitedItemTap({ index }) {
    navigate({
      page: PlaceInfo,
      props: {
        place: visited.getItem(index),
        visited: visited,
        wishlist: wishlist,
      },
    });
  }
  function onWishlistItemTap({ index }) {
    navigate({
      page: PlaceInfo,
      props: {
        place: wishlist.getItem(index),
        visited: visited,
        wishlist: wishlist,
      },
    });
  }
</script>

<page>
  <ActionBar
    {title}
    action={goBack}
    fontClass="fas"
    fontIcon="font://&#xf053;"
  />
  <stackLayout>
    <PlaceList
      text="Wishlist"
      bind:list={wishlist}
      onItemTap={onWishlistItemTap}
    />
    <!-- <stackLayout class="hr m-10" /> -->
    <PlaceList
      text="Visited"
      bind:list={visited}
      onItemTap={onVisitedItemTap}
    />
    <button text="Log out" on:tap={onLogout} class="btn" />
    <button text="Delete Account" on:tap={onDelete} class="btn" />
  </stackLayout>
</page>

<style>
  .btn {
    font-size: 18;
    font-weight: bold;
    height: 64;
  }
</style>
