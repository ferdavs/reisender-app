<script type="text/typescript">
  import { User, Place } from "../data/models";
  import Login from "./Login.svelte";
  import { storeGetSync } from "../util";
  import Main from "./Main.svelte";
  import ActionBar from "./ActionBar.svelte";
  import { onMount } from "svelte";
  import { navigate } from "svelte-native";

  let val = storeGetSync("user");
  let user: User = val == null ? new User() : JSON.parse(val);
  onMount(() => {
    // navigate({ page: Main, props: { user: user } });
    // navigate({ page: Login, props: { user: user } });
  });
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<page actionBarHidden="false">
  <ActionBar title={"Reisender"} />
  {#if user.loggedIn}
    <Main bind:user />
  {:else}
    <Login bind:user />
  {/if}
</page>
