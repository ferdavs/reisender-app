<script type="text/typescript">
  import { User, Place } from "../data/models";
  import { container, Api } from "../data/api/index";
  import { navigate } from "svelte-native";
  import Login from "./Login.svelte";
  import PlaceInfo from "./PlaceInfo.svelte";
  import Account from "./Account.svelte";
  import { storeDeleteAll, storeGetSync } from "../util";

  const api = container.getNamed<Api>("Api", "real");
  let user: User = JSON.parse(storeGetSync("user", new User()));

  function onLogout() {
    storeDeleteAll().then((res) => {
      if (res)
        navigate({
          page: Login,
        });
    });
  }

  function onPlace() {
    let place: Place = new Place();
    place.name = "Pyramid of the Sun";
    navigate({ page: PlaceInfo, props: { place: place } });
  }
  function onAccount() {
    navigate({ page: Account, props: { user: user } });
  }
</script>

<page>
  <actionBar flat="true">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label text="Reisender" fontSize="24" horizontalAlignment="center" />
  </actionBar>
  {#if user.loggedIn}
    <stackLayout>
      <button text="Place" on:tap={onPlace} />
      <button text="Account" on:tap={onAccount} />
      <button text="Log out" on:tap={onLogout} />
    </stackLayout>
  {:else}
    <dockLayout>
      <Login bind:user />
    </dockLayout>
  {/if}
</page>
