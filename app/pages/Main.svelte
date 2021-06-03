<script type="text/typescript">
  import { User, Place } from "../data/models";
  import { navigate } from "svelte-native";
  import Account from "./Account.svelte";
  import { namedApi } from "~/data/api";
  import Card from "./Card.svelte";
  import {
    ListViewLoadOnDemandMode,
    ListViewViewType,
  } from "nativescript-ui-listview";
  import { Template } from "svelte-native/components";
  import { ObservableArray } from "@nativescript/core";
  import { fromJson, storeGetSync, storePut, toJson } from "~/util";
  import PlaceInfo from "./PlaceInfo.svelte";
  import ActionBar from "./ActionBar.svelte";

  const api = namedApi("mock");

  export let user: User = new User();
  const places = new ObservableArray<Place>();
  let visited = new ObservableArray<Place>();
  let wishlist = new ObservableArray<Place>();
  
  visited.push(fromJson(storeGetSync("visited", "[]")));
  wishlist.push(fromJson(storeGetSync("wishlist", "[]")));

  api.recommend(user).then((res) => {
    places.push(res.object);
  });

  function onAccount() {
    navigate({
      page: Account,
      props: { user: user, visited: visited, wishlist: wishlist },
    });
  }

  function onPullToRefreshInitiated({ object }) {
    api.recommend(user).then((res) => {
      places.splice(0);
      places.push(res.object);
      object.notifyPullToRefreshFinished();
    });
  }
  function onItemTap({ index }) {
    navigate({
      page: PlaceInfo,
      props: {
        place: places.getItem(index),
        visited: visited,
        wishlist: wishlist,
      },
    });
  }

  // visited.push(fromJson(storeGetSync("visited", "[]")));
  // wishlist.push(fromJson(storeGetSync("wishlist", "[]")));

  visited.on(ObservableArray.changeEvent, (event) => {
    storePut("visited", toJson(visited.concat([])));
  });

  wishlist.on(ObservableArray.changeEvent, (event) => {
    storePut("wishlist", toJson(wishlist.concat([])));
  });
</script>

<page>
  <ActionBar
    title={"Reisender"}
    action={onAccount}
    fontClass="fas"
    fontIcon="font://&#xf406;"
  />

  <radListView
    items={places}
    loadOnDemandMode={ListViewLoadOnDemandMode.None}
    recycleNativeView="always"
    pullToRefresh="true"
    on:pullToRefreshInitiated={onPullToRefreshInitiated}
    on:itemTap={onItemTap}
  >
    <radListView.listViewLayout>
      <listViewGridLayout />
    </radListView.listViewLayout>

    <Template type={ListViewViewType.ItemView} let:item>
      {#if item !== undefined}
        <Card
          imageUrl={item.imageUrl}
          name={item.name}
          height="150"
          width="180"
        />
      {/if}
    </Template>
  </radListView>
</page>