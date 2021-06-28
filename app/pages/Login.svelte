<script lang="ts">
  import { User } from "../data/models";
  import { login as fb } from "nativescript-facebook-7";
  import { getFacebookInfo, inject, sha } from "../util";
  import { navigate } from "svelte-native";
  import Register from "./Register.svelte";
  import Main from "./Main.svelte";
  import ActionBar from "./ActionBar.svelte";
  import Onboard from "./Onboard.svelte";
  import SStorage from "~/data/storage";
  import Api from "~/data/api";

  export let user = new User();
  const api: Api = inject("Api");
  const store: SStorage = inject("SStorage");
  let password: string;

  function onRegister() {
    navigate({ page: Register });
  }

  function storeUser(user: User, stored: boolean) {
    if (!stored) {
      error("error storing user");
      return;
    }
    let page = user.firstLogin ? Onboard : Main;
    navigate({ page: page, clearHistory: true, props: { user: user } });
  }

  function onLogin() {
    user.password = sha.Sha256(password);
    api
      .login(user)
      .then(async (res) => {
        user.loggedIn = res.success;

        api.wishListGet(user).then((res) => store.put("wishlist", res.object));
        api
          .visitedListGet(user)
          .then((res) => store.put("visited", res.object));
        store
          .put("user", user)
          .then((stored) => storeUser(user, stored))
          .catch((error) => warn("cannot store user " + error.message));
      })
      .catch((err) => {
        if (err.message.trim() === "") error("user does not exists");
        else error(err.message)
      });
  }

  function onFBLogin() {
    let fbPromise = new Promise((s, r) => fb((e, d) => (e ? r(e) : s(d))));
    fbPromise
      .then((data: any) => {
        user.fbData = data;
        return getFacebookInfo(data.token);
      })
      .then((res: any) => {
        user.fbData.id = res.id;
        user.fbData.name = res.name;
        user.fbData.username = res.email;
        user.username = res.email;
        user.name = res.name;
        return api.register(user);
      })
      .then((res) => {
        user.loggedIn = res.success;
        return store.put("user", user);
      })
      .then((stored) => storeUser(user, stored))
      .catch((e) => error(e.message));
  }

  let infoText: string = null;
  function error(text: string) {
    infoText = "Error: " + text;
  }
  function warn(text: string) {
    infoText = "Warning: " + text;
  }
</script>

<page actionBarHidden="false">
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <ActionBar title={"Reisender"} bind:infoText />

  <stackLayout class="margin-rl-16">
    <textField
      bind:text={user.username}
      hint="Username..."
      keyboardType="email"
      class="input-text"
    />
    <textField
      bind:text={password}
      hint="Password..."
      secure="true"
      class="input-text"
    />
    <button text="Register" class="link" on:tap={onRegister} />

    <button text="Login" on:tap={onLogin} class="btn-large" />
    <!-- <button
      text="Facebook Login"
      on:tap={onFBLogin}
      class="fb-login-button btn-large"
    /> -->
  </stackLayout>
</page>
