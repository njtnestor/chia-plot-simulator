<template>
  <div class="nav-wrapper">
    <b-navbar toggleable="lg">
      <b-navbar-brand>
        <nuxt-link class="nav-link" :to="localePath('/')">
          <b>ChiaPlotSimulator</b>
        </nuxt-link>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <li class="nav-item">
            <nuxt-link class="nav-link" :to="localePath('/colaborate-help')">
              {{ $t('navBar.colaborate') }}
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" :to="localePath('/about')">
              {{ $t('navBar.about') }}
            </nuxt-link>
          </li>
          <SwitchLang class="nav-item" />
          <!--<SwitchLang v-if="!isContentPage" class="nav-item" />-->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>

export default {
  name: 'Navbar'
}
</script>

<style lang="scss" scoped>

*{
  color: #35a75a !important;
}
.nav-wrapper{

  z-index: 99999999;
  width: 100%;
}
.navbar{
  background-color: white;
  color: #35a75a;
  border-bottom: 2px solid #35a75a;

}
.logo{
  width: 198px;
}

</style>

<style lang="scss">

.moreMenu > a {
  color: #35a75a !important;
}

</style>
