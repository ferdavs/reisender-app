<script lang="ts">
  import { navigate } from "svelte-native";
  import { isNull, storeDeleteAll } from "~/util";
  import { User, Place } from "../data/models";
  import Login from "./Login.svelte";
  import PlaceInfo from "./PlaceInfo.svelte";
  export let user: User;
  let title = "";
  $: title = !isNull(user.name) ? user.name : user.username;

  function onLogout() {
    storeDeleteAll().then((res) => {
      if (res)
        navigate({
          page: Login,
          clearHistory: true,
        });
    });
  }

  function onPlace() {
    let place: Place = new Place();
    place.name = "Pyramid of the Sun";
    place.imageUrl =
      "https://upload.wikimedia.org/wikipedia/commons/2/22/Sun_Pyramid_05_2015_Teotihuacan_3304.JPG";
    navigate({ page: PlaceInfo, props: { place: place } });
  }
</script>

<page>
  <actionBar flat="true">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label bind:text={title} fontSize="24" horizontalAlignment="center" />
  </actionBar>
  <stackLayout>
    <textView editable="false" bind:text={user.username} />
    <button text="Log out" on:tap={onLogout} />
    <button text="Place" on:tap={onPlace} />
  </stackLayout>
</page>
