<template>
  <q-page style="padding: 50px">
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
    <p class="text-h5" style="font-weight: bold">Thanks for registering!</p>
    <q-img
      src="~assets/email.jpg"
      style="height: 230px; max-width: 250px"
    />
    <p class="text-body1" style="margin-top: 30px">Please confirm your email to finish registering: <strong>{{ $route.query.email }}</strong></p>
    </div>
    <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md" style="max-width: 500px; margin: 0 auto;">
        <q-btn
          label="Back to login"
          color="dark"
          class="full-width"
          rounded
          style="padding: 10px; letter-spacing: 1px; text-decoration: none;"
          :to="{ name: 'login' }"
        />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageEmailConfirmation'
})
</script>
