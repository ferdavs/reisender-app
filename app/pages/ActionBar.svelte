<script lang="ts">
  export let title: String = "<title>";
  export let action: Function = null;
  export let fontClass = "fas";
  export let fontIcon = "font://&#xf2bd;";
  export let infoText: string = null;

  let style = "warn";
  let html: string = null;

  function disable() {
    infoText = null;
  }
  setInterval(disable, 5000);

  $: html = "<h4 style='text-align:center;'>" + infoText + "</h4>";
  $: style = infoText && infoText.startsWith("Warn") ? "warn" : "error";
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<actionBar flat="false" style="margin-left: -18;">
  {#if action}
    <actionItem
      on:tap={action}
      ios.position="right"
      class={fontClass}
      icon={fontIcon}
      android.position="actionBar"
    />
  {/if}

  <dockLayout>
    <label id="titleText" dock="bottom" class="title">
      <formattedString>
        <span text="     " />
        <span bind:text={title} />
      </formattedString>
    </label>

    {#if infoText}
      <htmlView
        id="infoBarText"
        dock="top"
        class={style}
        on:tap={disable}
        bind:html
      />
    {/if}
  </dockLayout>
</actionBar>

<style>
  .title {
    font-weight: bold;
    font-size: 26;
    text-align: center;
    width: 100%;
  }
  .error {
    height: 20;
    width: 100%;
    text-align: center;
    color: whitesmoke;
    background-color: crimson;
  }
  .warn {
    height: 20;
    width: 100%;
    text-align: center;
    background-color: orange;
  }
</style>
