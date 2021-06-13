<script type="text/typescript">
  import { User } from "../data/models";
  import { inject } from "../util";
  import { onMount, tick } from "svelte";
  import { navigate } from "svelte-native";
  import { isNullOrUndefined } from "@nativescript/core/utils/types";
  import Main from "./Main.svelte";
  import Login from "./Login.svelte";
  import Onboard from "./Onboard.svelte";
  import SStorage from "~/data/storage";
  const store: SStorage = inject("SStorage");

  onMount(async () => {
    await tick();
    store
      .get("user")
      .then((res) => (isNullOrUndefined(res) ? new User() : res))
      .then((user: User) => {
        let page = user.loggedIn ? (user.firstLogin ? Onboard : Main) : Login;
        navigate({ page: page, clearHistory: true, props: { user: user } });
      });
  });
</script>

<page actionBarHidden="true" />
