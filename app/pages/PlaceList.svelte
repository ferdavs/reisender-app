<script lang="ts">
  import { ObservableArray } from "@nativescript/core";
  import {
    ListViewLoadOnDemandMode,
    ListViewViewType,
    ListViewScrollDirection,
  } from "nativescript-ui-listview";
  import { navigate } from "svelte-native";
  import { Template } from "svelte-native/components";
  import { Place } from "~/data/models";
  import Card from "./Card.svelte";
  import PlaceInfo from "./PlaceInfo.svelte";
  export let text: string;
  export let list: ObservableArray<Place>;
  export let visited = new ObservableArray<Place>();
  export let wishlist = new ObservableArray<Place>();

  export let onItemTap = ({ index, object }) => {
    navigate({
      page: PlaceInfo,
      props: {
        place: list.getItem(index),
        visited: visited,
        wishlist: wishlist,
      },
    });
    object.refresh();
  };
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label {text} class="text" />
<radListView
  height="150"
  items={list}
  loadOnDemandMode={ListViewLoadOnDemandMode.None}
  on:itemTap={onItemTap}
>
  <radListView.listViewLayout>
    <listViewLinearLayout
      scrollDirection={ListViewScrollDirection.Horizontal}
    />
  </radListView.listViewLayout>

  <Template type={ListViewViewType.ItemView} let:item>
    {#if item !== undefined}
      <Card
        imageUrl={item.imageUrl}
        name={item.name}
        height="120"
        width="140"
      />
    {/if}
  </Template>
</radListView>

<style>
  .text {
    font-size: 24;
    font-weight: bold;
    text-align: center;
    margin: 8;
    margin-top: 16;
  }
</style>
