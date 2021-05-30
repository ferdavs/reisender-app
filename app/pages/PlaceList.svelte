<script lang="ts">
  import { ObservableArray } from "@nativescript/core";
  import {
    ListViewLoadOnDemandMode,
    ListViewViewType,
  } from "nativescript-ui-listview";
  import { Template } from "svelte-native/components";
  import { Place } from "~/data/models";
  import Card from "./Card.svelte";
  export let text: string;
  export let list: ObservableArray<Place>;
  export let onItemTap = null;
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
    <listViewLinearLayout scrollDirection="Horizontal" />
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
  }
</style>
