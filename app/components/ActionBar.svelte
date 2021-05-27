<script lang="ts">
  export let title: String = "<title>";
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<actionBar flat="true">
  <label text={title} fontSize="24" horizontalAlignment="center" />
  <!-- {#if action}
      <actionItem
        on:tap={action()}
        ios.systemIcon="8"
        ios.position="right"
        android.systemIcon={actionIcon}
        android.position="actionBar"
      />
    {/if}  -->
  <slot />
</actionBar>
