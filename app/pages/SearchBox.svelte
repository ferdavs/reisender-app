<script lang="ts">
  import { hideKeyboard } from "~/util";

  let text = "";
  let active = false;

  export let row = "1";
  export let onHide = () => {};
  export let onShow = () => {};
  export let onSubmit = (q) => {};
  export let onClear = () => {};
  
  function onTextChange() {
    onSubmit(text);
  }
  function onShowText() {
    active = true;
    onShow();
  }
  function onHideText() {
    active = false;
    hideKeyboard();
    onHide();
  }
</script>

<stackLayout
  {row}
  style="horizontal-align: right; vertical-align: bottom"
  orientation="horizontal"
>
  {#if active}
    <searchBar
      id="searchText"
      hint="Search"
      class="search-box"
      bind:text
      on:textChange={onTextChange}
      on:submit={onSubmit}
      on:clear={onClear}
    />
    <button class="fab-button fas" text="&#xf00d;" on:tap={onHideText} />
  {:else}
    <button class="fab-button fas" text="&#xf002;" on:tap={onShowText} />
  {/if}
</stackLayout>
