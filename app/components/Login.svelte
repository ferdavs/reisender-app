<script lang="ts">
  import { User } from "../data/models";
  import { Api, container } from "../data/api/index";
  import { login as fbLogin } from "nativescript-facebook-7";
  import { SecureStorage } from "nativescript-secure-storage";
  import { getFacebookInfo } from "../util";
  import { navigate } from "svelte-native";
  import App from "./App.svelte";
  import Register from "./Register.svelte";
  const store = new SecureStorage();

  const api = container.getNamed<Api>("Api", "mock");
  export let user = new User();

  function onRegister() {
    navigate({ page: Register });
  }
  function onLogin() {}

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
          store
            .set({ key: "user", value: JSON.stringify(user) })
            .then((result) => {
              console.log("user store " + result);
              if (result) navigate({ page: App });
            })
            .catch((error) => console.log("error user store : " + error));
        });
      }
    });
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
      bind:text={user.password}
      hint="Password..."
      secure="true"
      class="text"
    />
    <button text="Register" class="link" on:tap={onRegister} />

    <button text="Login" on:tap={onLogin} class="btn" />
    <button text="Facebook Login" on:tap={onFBLogin} class="fb-login-button btn" />
  </stackLayout>
</page>

<style>
  .text {
    margin: 16;
    margin-top: 24;
    font-size: 18;
    placeholder-color: gray;
  }
  .btn{
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
