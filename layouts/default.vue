<template>
  <div class="default-layout">
    <Navbar />
    <div class="contain">
      <Nuxt />
    </div>
    <Footer />
    <CookieControl/>
  </div>
</template>

<script>
import Navbar from './partials/Navbar'
import Footer from './partials/Footer'

export default {
  name: 'DefaultLayout',
  components: {
    Navbar,
    Footer
  },
  head () {
    return this.$nuxtI18nHead({ addSeoAttributes: true, addDirAttribute: true })
  }
}
</script>

<style lang="scss" scoped>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  //margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

/*.default-layout{
  min-height:80vh;
}*/

.contain{
  //100vh - navbar - create plot bar - footer - pcInfo
  min-height: calc( 100vh - 74px - 70px - 102px - 80px);
}
</style>
