<template v-show="errors">
  <ul class="error-messages">
    <li v-for="(err) in errors" key="key">
      {{err}}
    </li>
  </ul>
</template>

<script>
  export default {
    name: "ListErorrs",
    props: {
      errors: {
        type: Object,
        required: true
      }
    }
  };
</script>
