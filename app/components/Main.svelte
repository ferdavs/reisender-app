<script type="text/typescript">
  import { User, Place } from "../data/models";
  import { navigate } from "svelte-native";
  import Account from "./Account.svelte";
  import { Api, container } from "~/data/api";
  import Card from "./Card.svelte";
  import {
    ListViewLoadOnDemandMode,
    ListViewViewType,
  } from "nativescript-ui-listview";
  import { Template } from "svelte-native/components";
  import { ObservableArray } from "@nativescript/core";
  import PlaceInfo from "./PlaceInfo.svelte";
  import ActionBar from "./ActionBar.svelte";

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
    // alert(`Item tapped: ${places.getItem(index).name}`);
    navigate({
      page: PlaceInfo,
      props: { place: places.getItem(index), user: user },
    });
  }
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
    pullToRefresh="true"
    itemTemplateSelector={selectTemplate}
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
