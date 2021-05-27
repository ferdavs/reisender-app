<script lang="ts">
  export let imageUrl = "~/images/place_holder.png";
  export let name = "";
</script>

<image src={imageUrl} stretch="none" />
<!-- svelte-ignore a11y-label-has-associated-control -->
<label text={name} />

<style>
    
</style>
