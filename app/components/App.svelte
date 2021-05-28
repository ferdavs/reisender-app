<script type="text/typescript">
  import { User } from "../data/models";
  import Login from "./Login.svelte";
  import { storeGetSync } from "../util";
  import Main from "./Main.svelte";
  import { onMount, tick } from "svelte";
  import { navigate } from "svelte-native";

  let val = storeGetSync("user");
  let user: User = val == null ? new User() : JSON.parse(val);

  onMount(async () => {
    await tick();
    if (user.loggedIn) navigate({ page: Main, props: { user: user } });
    else navigate({ page: Login, props: { user: user } });
  });
</script>

<page actionBarHidden="true">
</page>
