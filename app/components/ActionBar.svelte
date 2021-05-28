<script lang="ts">
  export let title: String = "<title>";
  export let action: Function;
  export let fontClass = "fas";
  export let fontIcon = "font://&#xf2bd;";
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<actionBar flat="true">
  <label text={title} fontSize="24" horizontalAlignment="center" />
  {#if action}
    <actionItem
      on:tap={action}
      ios.position="right"
      class={fontClass}
      icon={fontIcon}
      android.position="actionBar"
    />
  {/if}
  <slot />
</actionBar>
