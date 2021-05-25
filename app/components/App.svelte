<script type="text/typescript">
  import { User, Place } from "../data/models";
  import { container, Api } from "../data/api/index";
  import { SecureStorage } from "nativescript-secure-storage";
  import { navigate } from "svelte-native";
  import Login from "./Login.svelte";
  import PlaceInfo from "./PlaceInfo.svelte";
  import Account from "./Account.svelte";
  import { DockLayout } from "@nativescript/core";

  const api = container.getNamed<Api>("Api", "real");
  const store = new SecureStorage();
  let user: User = JSON.parse(store.getSync({ key: "user" })) || new User();

  function onLogin() {
    navigate({
      page: Login,
    });
  }
  function onLogout() {
    store.removeAll().then((res) => {
      if (res)
        navigate({
          page: Login,
        });
    });
  }
  function onRegister() {
    api
      .login(user)
      .then((v) => console.log(v))
      .catch((r) => console.log(r));
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
      <!-- <button text="Login" on:tap={onLogin} /> -->
      <!-- <button text="Register" on:tap={onRegister} /> -->
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
