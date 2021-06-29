<script lang="ts">
  import { User } from "../data/models";
  import { inject, sha } from "~/util";
  import { navigate } from "svelte-native";
  import { getCurrentPage } from "@nativescript/core";
  import { isNullOrUndefined } from "@nativescript/core/utils/types";
  import Main from "./Main.svelte";
  import ActionBar from "./ActionBar.svelte";
  import Onboard from "./Onboard.svelte";
  import SStorage from "~/data/storage";
  import Api from "~/data/api";

  const api: Api = inject("Api");
  const store: SStorage = inject("SStorage");

  export let user = new User();

  let pass1: string;
  let pass2: string;
  let red: string;
  $: red = isValid(pass1, pass2) ? "" : "red";

  function isValid(pass1: string, pass2: string) {
    return (
      !(isNullOrUndefined(pass1) || isNullOrUndefined(pass2)) &&
      pass1 === pass2 &&
      pass1.trim() !== ""
    );
  }

  function storeHandle(user: User, stored: boolean) {
    if (!stored) {
      console.log("error storing user");
      return;
    }
    let page = user.firstLogin ? Onboard : Main;
    navigate({ page: page, clearHistory: true, props: { user: user } });
  }

  function onRegister() {
    if (!isValid(pass1, pass2)) {
      getCurrentPage().getViewById("pass1Text").shake();
      getCurrentPage().getViewById("pass2Text").shake();
      return;
    }
    if (user.username.trim().length == 0) {
      getCurrentPage().getViewById("username").shake();
      return;
    }
    user.password = sha.Sha256(pass2);
    api
      .register(user)
      .then((_) => {
        user.loggedIn = true;
        return store.put("user", user);
      })
      .then((stored) => storeHandle(user, stored))
      .catch((e) => {error(e.message);})
      .catch((e) => warn("error user store : " + e.message));
  }

  let infoText: string = null;
  function error(text: string) {
    infoText = "Error: " + text;
  }
  function warn(text: string) {
    infoText = "Warning: " + text;
  }
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<page>
  <ActionBar title="Reisender" bind:infoText />

  <stackLayout class="layout margin-rl-16">
    <textField
      id="username"
      bind:text={user.username}
      hint="Username..."
      keyboardType="email"
      class="input-text"
    />
    <textField
      id="pass1Text"
      bind:text={pass1}
      hint="Password..."
      secure="true"
      class="input-text {red}"
    />
    <textField
      id="pass2Text"
      bind:text={pass2}
      hint="Repeat Password..."
      secure="true"
      class="input-text {red}"
    />

    <button text="Register" on:tap={onRegister} class="btn-large" />
  </stackLayout>
</page>

<style>
  .red {
    border-style: dashed;
    border-color: orangered;
    color: orangered;
  }
</style>
