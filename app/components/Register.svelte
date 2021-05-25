<script lang="ts">
  import { User } from "../data/models";
  import { Api, container } from "../data/api/index";
  import { login as fbLogin } from "nativescript-facebook-7";
  import { SecureStorage } from "nativescript-secure-storage";
  import { getFacebookInfo } from "../util";
  import { navigate } from "svelte-native";
  import App from "./App.svelte";
  const store = new SecureStorage();

  const api = container.getNamed<Api>("Api", "mock");
  export let user = new User();
  let pass1: String;
  let pass2: String;

  $: if (checkPass(pass1, pass2)) {
    user.password = pass2;
  }
  function checkPass(pass1, pass2) {
    return pass1 === pass2;
  }
  function onRegister() {
    if (checkPass(pass1, pass2)) api.register(user).then((res) => {console.log(res)});
  }
</script>

<page>
  <actionBar flat="true">
    <label text="Reisender" fontSize="24" horizontalAlignment="center" />
  </actionBar>

  <stackLayout>
    <textField
      bind:text={user.username}
      hint="Username..."
      keyboardType="email"
      class="text"
    />
    <textField
      bind:text={pass1}
      hint="Password..."
      secure="true"
      class="text {checkPass(pass1, pass2) ? '' : 'red'}"
    />
    <textField
      bind:text={pass2}
      hint="Repeat Password..."
      secure="true"
      class="text {checkPass(pass1, pass2) ? '' : 'red'}"
    />

    <button text="Register" on:tap={onRegister} class="btn" />
  </stackLayout>
</page>

<style>
  .text {
    margin: 16;
    margin-top: 24;
    font-size: 18;
    placeholder-color: gray;
  }
  .red {
    border-style: dashed;
    border-color: orangered;
    color: orangered;
  }

  .btn {
    font-size: 18;
    font-weight: bold;
    height: 64;
  }
  .fb-login-button {
    background: #3b5998;
    color: white;
  }
  .link {
    border-color: transparent;
    border-width: 1;
    z-index: 0;
    text-align: right;
  }
</style>
