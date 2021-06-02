<script type="text/typescript">
  import { User } from "../data/models";
  import { fromJson, storeGet } from "../util";
  import { onMount, tick } from "svelte";
  import { navigate } from "svelte-native";
  import { isNullOrUndefined } from "@nativescript/core/utils/types";
  import Main from "./Main.svelte";
  import Login from "./Login.svelte";
  import Onboard from "./Onboard.svelte";

  onMount(async () => {
    await tick();
    storeGet("user")
      .then((res) => (isNullOrUndefined(res) ? new User() : fromJson(res)))
      .then((user: User) => {
        let page = user.loggedIn ? (user.firstLogin ? Onboard : Main) : Login;
        navigate({ page: page, clearHistory: true, props: { user: user } });
      });
  });
</script>

<page actionBarHidden="true" />
