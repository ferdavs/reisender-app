<script lang="ts">
  import { User } from "../data/models";
  import { namedApi } from "../data/api";
  import { login as fbLogin } from "nativescript-facebook-7";
  import { getFacebookInfo, storePut, sha } from "../util";
  import { navigate } from "svelte-native";
  import Register from "./Register.svelte";
  import Main from "./Main.svelte";
  import ActionBar from "./ActionBar.svelte";
  import Onboard from "./Onboard.svelte";

  const api = namedApi("mock");
  export let user = new User();
  let password: string;

  function onRegister() {
    navigate({ page: Register });
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

  function onLogin() {
    user.password = sha.Sha256(password);
    api
      .login(user)
      .then((res) => {
        user.loggedIn = res.success;
        storePut("user", JSON.stringify(user))
          .then((stored) => storeHandle(user, stored))
          .catch((error) => console.log("error user store : " + error));
      })
      .catch((err) => alert(err.object.message));
  }

  function onFBLogin() {
    fbLogin((err, fbData) => {
      if (err) {
        alert("Error during login: " + err.message);
      } else {
        getFacebookInfo(fbData.token).then((res) => {
          fbData.id = res.id;
          fbData.name = res.name;
          fbData.username = res.email;
          user.fbData = fbData;
          user.username = res.email;
          user.name = res.name;
          user.loggedIn = true;
          api
            .register(user)
            .then((res) => {
              storePut("user", JSON.stringify(user))
                .then((stored) => storeHandle(user, stored))
                .catch((error) => console.log("error user store : " + error));
            })
            .catch((er) => console.log(er));
        });
      }
    });
  }
</script>

<page actionBarHidden="false">
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <ActionBar title={"Reisender"} />

  <stackLayout class="layout">
    <textField
      bind:text={user.username}
      hint="Username..."
      keyboardType="email"
      class="text"
    />
    <textField
      bind:text={password}
      hint="Password..."
      secure="true"
      class="text"
    />
    <button text="Register" class="link" on:tap={onRegister} />

    <button text="Login" on:tap={onLogin} class="btn" />
    <button
      text="Facebook Login"
      on:tap={onFBLogin}
      class="fb-login-button btn"
    />
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
