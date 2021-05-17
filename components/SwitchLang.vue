<template>
  <b-nav-item-dropdown :text="$i18n.localeProperties.name" right>
    <b-dropdown-item v-for="lang in availableLocales" :key="lang.id" class="itemLang" href="#" @click="changeLang(lang)">
      {{ lang.name }}
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  },
  methods: {
    changeLang (lang) {
      this.$router.push(this.switchLocalePath(lang.code))
    }
  }
}
</script>

<style lang="scss" >

</style>
