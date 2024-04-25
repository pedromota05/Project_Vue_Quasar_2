<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <a href="/" style="text-decoration: none">
        <q-toolbar class="row no-wrap items-center" style="height: 72px; padding-left: 16px;">
          <q-img class="doc-header__logo-img" src="~assets/logo-dark.svg" alt="Quasar Logo" style="width: 48px; height: 48px;" />
          <q-toolbar-title style="color: #fff; font-weight: 500; letter-spacing: 1px;">
            Project Quasar
          </q-toolbar-title>
        </q-toolbar>
      </a>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'

export default defineComponent({
  name: 'LoginLayout',

  setup () {
    const { logout } = useAuthUser()
    return {
      logout
    }
  }
})
</script>

<style scoped>
.doc-header__logo-img {
  transition: transform .8s ease-in-out;
}

.doc-header__logo-img:hover {
  transform: rotate(360deg);
}
</style>
