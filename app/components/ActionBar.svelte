<script lang="ts">
  export let title: String = "<title>";
  export let action: Function = null;
  export let fontClass = "fas";
  export let fontIcon = "font://&#xf2bd;";
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<actionBar flat="false">
  <label
    id="actionBarText"
    text={title}
    fontSize="24"
    class=""
    horizontalAlignment="center"
  />
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
