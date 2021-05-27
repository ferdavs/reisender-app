<script lang="ts">
  import { User, Place } from "../data/models";
  export let user: User;
</script>

<page>
  <actionBar flat="true">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label
      bind:text={user.name}
      fontSize="24"
      horizontalAlignment="center"
    />
  </actionBar>
  <stackLayout>
    <textView editable="false" bind:text={user.username} />
  </stackLayout>
</page>
