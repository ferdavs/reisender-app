<script async lang="ts">
  /// <reference path="./node_modules/nativescript-effects/tns-effects.d.ts" />
  import { getCurrentPage, ObservableArray } from "@nativescript/core";
  import {
    ListViewLoadOnDemandMode,
    ListViewViewType,
  } from "nativescript-ui-listview";
  import { navigate } from "svelte-native";
  import { Template } from "svelte-native/components";
  import { Api } from "~/data/api";
  import { Feature, User } from "~/data/models";
  import SStorage from "~/data/storage";
  import { named } from "~/util";
  import ActionBar from "./ActionBar.svelte";
  import Card from "./Card.svelte";
  import Main from "./Main.svelte";

  export let user: User = null;
  const api: Api = named("Api", "mock");
  const title = "Choose at least 5";
  const features = new ObservableArray<Feature>();
  const store: SStorage = named("SStorage");

  api
    .getFeatures()
    .then((res) => features.push(res.object))
    .catch((err) => console.log(err));

  function onItemTap({ index, object }) {
    let item = features.getItem(index);
    item.toggle();
    if (item.selected) user.features.push(item);
    else user.features.splice(user.features.indexOf(item), 1);
    object.refresh();
  }

  function onDone() {
    if (user.features.length < 5) {
      getCurrentPage().getViewById("titleText").shake();
      return;
    }
    api
      .sendFeatures(user)
      .then((res) => {
        user.firstLogin = false;
        return store.put("user", user);
      })
      .then((stored) => {
        if (stored)
          navigate({
            page: Main,
            clearHistory: true,
            props: { user: user },
          });
      });
  }
</script>

<page>
  <ActionBar
    {title}
    action={onDone}
    fontClass="fas"
    fontIcon="font://&#xf00c;"
  />
  <radListView
    id="listView"
    recycleNativeView="always"
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
