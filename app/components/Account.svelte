<script lang="ts">
  import { navigate, goBack } from "svelte-native";
  import { isNull, storeDeleteAll } from "~/util";
  import { User, Place } from "../data/models";
  import ActionBar from "./ActionBar.svelte";
  import Login from "./Login.svelte";
  export let user: User;
  let title = "";
  $: title = !isNull(user.name) ? user.name : user.username;

  function onLogout() {
    storeDeleteAll().then((res) => {
      if (res)
        navigate({
          page: Login,
          clearHistory: true,
        });
    });
  }

  function onDelete() {}
</script>

<page>
  <ActionBar
    {title}
    action={goBack}
    fontClass="fas"
    fontIcon="font://&#xf053;"
  />
  <stackLayout>
    <textView editable="false" bind:text={user.username} />
    <button text="Log out" on:tap={onLogout} />
    <button text="Delete Account" on:tap={onDelete} />
  </stackLayout>
</page>
