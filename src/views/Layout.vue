<template>
  <n-panel :title="title">
    <router-view />
  </n-panel>
</template>

<script>
export default {
  computed: {
    title() {
      return this.$route.meta.title || this.$route.name;
    },
  }
}
</script>