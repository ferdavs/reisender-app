<script type="text/typescript">
  import { User, Place } from "../data/models";
  import { navigate } from "svelte-native";
  import Login from "./Login.svelte";
  import PlaceInfo from "./PlaceInfo.svelte";
  import Account from "./Account.svelte";
  import { storeDeleteAll } from "../util";
  import ActionBar from "./ActionBar.svelte";

  export let user: User = new User();

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

  function onAccount() {
    navigate({ page: Account, props: { user: user } });
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

  <stackLayout>
    <button text="Place" on:tap={onPlace} />
    <button text="Account" on:tap={onAccount} />
    <button text="Log out" on:tap={onLogout} />
  </stackLayout>
</page>
