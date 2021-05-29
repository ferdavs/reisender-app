<script async lang="ts">
  /// <reference path="./node_modules/nativescript-effects/tns-effects.d.ts" />
  import { getCurrentPage, ObservableArray } from "@nativescript/core";
  import {
    ListViewLoadOnDemandMode,
    ListViewViewType,
  } from "nativescript-ui-listview";
  import { navigate } from "svelte-native";
  import { Template } from "svelte-native/components";
  import { namedApi } from "~/data/api";
  import { Feature, User } from "~/data/models";
  import { storePut } from "~/util";
  import ActionBar from "./ActionBar.svelte";
  import Card from "./Card.svelte";
  import Main from "./Main.svelte";

  export let user: User = null;
  const api = namedApi("mock");
  let features = new ObservableArray<Feature>();
  api
    .getFeatures()
    .then((res) => {
      features.push(res.object);
    })
    .catch((err) => console.log(err));

  function onItemTap({ index, object }) {
    let item = features.getItem(index);
    item.toggle();
    // item.toggle() ? object.selectItemAt(index) : object.deselectItemAt(index);
    if (item.selected) user.features.push(item);
    else user.features.splice(user.features.indexOf(item), 1);
  }

  function onDone() {
    if (user.features.length < 5)
      getCurrentPage().getViewById("actionBarText").shake();
    else
      api.sendFeatures(user).then((res) => {
        user.firstLogin = false;
        storePut("user", JSON.stringify(user)).then((stored) => {
          if (stored)
            navigate({ page: Main, clearHistory: true, props: { user: user } });
        });
      });
  }
</script>

<page>
  <ActionBar
    title={"Choose at least 5"}
    action={onDone}
    fontClass="fas"
    fontIcon="font://&#xf00c;"
  />
  <radListView
    id="listView"
    items={features}
    loadOnDemandMode={ListViewLoadOnDemandMode.None}
    multipleSelection="true"
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
          selected={item.selected}
        />
      {/if}
    </Template>
  </radListView>
</page>
