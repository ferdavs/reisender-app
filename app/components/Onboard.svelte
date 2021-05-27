<script lang="ts">
  import ActionBar from "./ActionBar.svelte";

  export let features: String[];
</script>

<page>
  <ActionBar title={"Choose at least 5"}/>

  <scrollView>
    <gridLayout />
  </scrollView>
</page>
