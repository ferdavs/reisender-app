<script setup type="text/typescript">
  import { User, Place } from "../data/models";
  import { navigate } from "svelte-native";
  import Account from "./Account.svelte";
  import Card from "./Card.svelte";
  import {
    ListViewLoadOnDemandMode,
    ListViewViewType,
    RadListView,
  } from "nativescript-ui-listview";
  import { Template } from "svelte-native/components";
  import { Frame, ObservableArray } from "@nativescript/core";
  import { inject } from "~/util";
  import PlaceInfo from "./PlaceInfo.svelte";
  import ActionBar from "./ActionBar.svelte";
  import SStorage from "~/data/storage";
  import Api from "~/data/api";
  import SearchBox from "./SearchBox.svelte";
  import { log } from "@nativescript/core/profiling";

  const store: SStorage = inject("SStorage");
  const api: Api = inject("Api");
  export let user: User = new User();
  let oldPlaces = [];
  const places = new ObservableArray<Place>();
  const visited = new ObservableArray<Place>();
  const wishlist = new ObservableArray<Place>();

  let placeGrid: RadListView = null;
  let searchActive = false;

  api
    .wishListGet(user)
    .then((res) => {
      store.put("wishlist", res.object);
      return res.object;
    })
    .then((val) => wishlist.push(val))
    .catch((err) => console.log(err));
  api
    .visitedListGet(user)
    .then((res) => {
      store.put("visited", res.object);
      return res.object;
    })
    .then((val) => visited.push(val))
    .catch((err) => console.log(err));


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
    if (!searchActive)
      api
        .recommend(user)
        .then((res) => {
          places.splice(0);
          places.push(res.object);
          object.notifyPullToRefreshFinished();
        })
        .catch((e) => {
          log(e);
          object.notifyPullToRefreshFinished();
        });
    else object.notifyPullToRefreshFinished();
  }

  function onItemTap({ index }) {
    navigate({
      page: PlaceInfo,
      props: {
        user: user,
        place: places.getItem(index),
        visited: visited,
        wishlist: wishlist,
      },
    });
  }

  function updateGrid(p) {
    let removed = places.splice(0);
    places.push(p);
    placeGrid.refresh();
    return removed;
  }

  function clearGrid() {
    let removed = places.splice(0);
    placeGrid.refresh();
    return removed;
  }

  visited.on(ObservableArray.changeEvent, (event) => {
    store.put("visited", visited.concat([]));
  });

  wishlist.on(ObservableArray.changeEvent, (event) => {
    store.put("wishlist", wishlist.concat([]));
  });

  function onShow() {
    searchActive = true;
    placeGrid = Frame.topmost().getViewById<RadListView>("placeGrid");
    oldPlaces = clearGrid();
  }

  function onHide() {
    searchActive = false;
    updateGrid(oldPlaces);
  }
  function onSubmit(q: string) {
    if (q.length > 2)
      api.search(q).then((val) => {
        updateGrid(val.object);
      });
  }
  function onClear() {
    clearGrid();
  }
</script>

<page>
  <ActionBar
    title={"Reisender"}
    action={onAccount}
    fontClass="fas"
    fontIcon="font://&#xf406;"
  />
  <gridLayout rows="auto, *">
    <radListView
      id="placeGrid"
      row="1"
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

    <SearchBox row="1" {onShow} {onHide} {onSubmit} {onClear} />
  </gridLayout>
</page>
