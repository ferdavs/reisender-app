<script type="text/typescript">
  import { User, Place } from "../data/models";
  import { navigate } from "svelte-native";
  import Account from "./Account.svelte";
  import { Api, container } from "~/data/api";
  import Card from "./Card.svelte";
  import {
ListViewEventData,
    ListViewLoadOnDemandMode,
    ListViewViewType,
  } from "nativescript-ui-listview";
  import { Template } from "svelte-native/components";
  import { ObservableArray } from "@nativescript/core";

  const api: Api = container.getNamed("Api", "mock");

  export let user: User = new User();
  let places = new ObservableArray<Place>();
  api.recommend().then((res) => {
    places.push(res.object);
  });

  function onAccount() {
    navigate({ page: Account, props: { user: user } });
  }
  function selectTemplate(item, index, items) {
    return index % 2 == 0 ? "even" : "odd";
  }
  function onPullToRefreshInitiated({ object }) {
    // places.unshift(places.getItem(0));
    object.notifyPullToRefreshFinished();
  }
  function onItemTap({ index }) {
    alert(`Item tapped: ${places.getItem(index).name}`);
  }
</script>

<page>
  <actionBar flat="true">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label text={"Reisender"} fontSize="24" horizontalAlignment="center" />
    <actionItem
      on:tap={onAccount}
      ios.systemIcon="8"
      ios.position="right"
      android.systemIcon="ic_menu_myplaces"
      android.position="actionBar"
    />
  </actionBar>

  <radListView
    items={places}
    loadOnDemandMode={ListViewLoadOnDemandMode.None}
    pullToRefresh="true"
    itemTemplateSelector={selectTemplate}
    on:pullToRefreshInitiated={onPullToRefreshInitiated}
    on:itemTap={onItemTap}
  >
    <radListView.listViewLayout>
      <listViewGridLayout />
    </radListView.listViewLayout>

    <Template type={ListViewViewType.ItemView} key="even" let:item>
      {#if item !== undefined}
        <Card imageUrl={item.imageUrl} name={item.name} />
      {/if}
    </Template>

    <Template type={ListViewViewType.ItemView} key="odd" let:item>
      {#if item !== undefined}
        <Card imageUrl={item.imageUrl} name={item.name} />
      {/if}
    </Template>
  </radListView>
</page>
