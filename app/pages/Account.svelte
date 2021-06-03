<script lang="ts">
  import { ObservableArray } from "@nativescript/core";
  import { isNullOrUndefined } from "@nativescript/core/utils/types";
  import { navigate, goBack } from "svelte-native";
  import SStorage from "~/data/storage";
  import { named } from "~/util";
  import { User, Place } from "../data/models";
  import ActionBar from "./ActionBar.svelte";
  import Login from "./Login.svelte";
  import PlaceList from "./PlaceList.svelte";

  export let user: User;
  export let visited = new ObservableArray<Place>();
  export let wishlist = new ObservableArray<Place>();
  const store: SStorage = named("SStorage");

  let title = "";
  $: title = isNullOrUndefined(user.name) ? user.username : user.name;
  function onLogout() {
    store.clear().then((res) => {
      if (res)
        navigate({
          page: Login,
          clearHistory: true,
        });
    });
  }

  function onDelete() {}
</script>

<page>
  <ActionBar
    {title}
    action={goBack}
    fontClass="fas"
    fontIcon="font://&#xf053;"
  />
  <stackLayout>
    <PlaceList text="Wishlist" list={wishlist} {visited} {wishlist} />
    <!-- <stackLayout class="hr m-10" /> -->
    <PlaceList text="Visited" list={visited} {visited} {wishlist} />
    <button text="Log out" on:tap={onLogout} class="btn-large" />
    <button text="Delete Account" on:tap={onDelete} class="btn-large" />
  </stackLayout>
</page>
