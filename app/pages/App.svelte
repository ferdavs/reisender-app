<script type="text/typescript">
  import { User } from "../data/models";
  import Login from "./Login.svelte";
  import { fromJson, isNull, storeGet } from "../util";
  import Main from "./Main.svelte";
  import { onMount, tick } from "svelte";
  import { navigate } from "svelte-native";
  import Onboard from "./Onboard.svelte";

  onMount(async () => {
    await tick();
    storeGet("user")
      .then((res) => (isNull(res) ? new User() : fromJson(res)))
      .then((user: User) => {
        let page = user.loggedIn ? (user.firstLogin ? Onboard : Main) : Login;
        navigate({ page: page, clearHistory: true, props: { user: user } });
      });
  });
</script>

<page actionBarHidden="true" />
