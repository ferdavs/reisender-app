<script lang="ts">
  import { User } from "../data/models";
  import { namedApi } from "../data/api/index";
  import { isNull, sha, storePut } from "~/util";
  import { navigate } from "svelte-native";
  import Main from "./Main.svelte";
  import ActionBar from "./ActionBar.svelte";
  import { getCurrentPage, StackLayout } from "@nativescript/core";
  import Onboard from "./Onboard.svelte";

  const api = namedApi("mock");

  export let user = new User();

  let pass1: string;
  let pass2: string;
  let red: string;
  $: red = isValid(pass1, pass2) ? "" : "red";

  function isValid(pass1: string, pass2: string) {
    return (
      !(isNull(pass1) || isNull(pass2)) &&
      pass1 === pass2 &&
      pass1.trim() !== ""
    );
  }

  function storeHandle(user, stored) {
    if (stored && user.firstLogin)
      navigate({
        page: Onboard,
        clearHistory: true,
        props: { user: user },
      });
    else if (stored)
      navigate({ page: Main, clearHistory: true, props: { user: user } });
    else console.log("error storing user");
  }

  function onRegister() {
    if (isValid(pass1, pass2)) {
      user.password = sha.Sha256(pass2);
      api
        .register(user)
        .then((res) => {
          storePut("user", JSON.stringify(user))
            .then((stored) => storeHandle(user, stored))
            .catch((error) => console.log("error user store : " + error));
        })
        .catch((err) => alert("Error: " + err.object.message));
    } else {
      getCurrentPage().getViewById("pass1Text").shake();
      getCurrentPage().getViewById("pass2Text").shake();
    }
  }
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<page>
  <ActionBar title="Reisender" />

  <stackLayout class="layout">
    <textField
      bind:text={user.username}
      hint="Username..."
      keyboardType="email"
      class="text"
    />
    <textField
      id="pass1Text"
      bind:text={pass1}
      hint="Password..."
      secure="true"
      class="text {red}"
    />
    <textField
      id="pass2Text"
      bind:text={pass2}
      hint="Repeat Password..."
      secure="true"
      class="text {red}"
    />

    <button text="Register" on:tap={onRegister} class="btn" />
  </stackLayout>
</page>

<style>
  .layout {
    margin-left: 16;
    margin-right: 16;
  }
  .text {
    margin: 16;
    margin-top: 24;
    font-size: 18;
    placeholder-color: gray;
  }
  .btn {
    font-size: 18;
    font-weight: bold;
    height: 64;
  }
  .red {
    border-style: dashed;
    border-color: orangered;
    color: orangered;
  }
</style>
