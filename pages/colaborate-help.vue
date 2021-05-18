<template>
  <b-container class="my-5">
    <div v-html="$t('colaboratePage.content')" />
  </b-container>
</template>

<script>
export default {
  head () {
    return {
      title: this.$t('ganttPage.meta.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('ganttPage.meta.description')
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

.coffe{
  max-width: 200px;
}

</style>
