<script lang="ts">
  export let title: String = "<title>";
  export let action: Function;
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<actionBar flat="true">
  <label text={title} fontSize="24" horizontalAlignment="center" />
  {#if action}
    <actionItem
      on:tap={action}
      ios.systemIcon="8"
      ios.position="right"
      class="fas"
      icon="font://&#xf2bd;"
      android.position="actionBar"
    />
  {/if}
  <slot />
</actionBar>
