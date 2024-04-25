<template>
  <q-page style="padding: 50px">
    <q-form class="row justify-center" @submit.prevent="handleForgotPassword">
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <div class="d-flex justify-start align-center mb-4">
          <router-link class="back-login" :to="{ name: 'login' }" style="display: flex; align-items: center;">
            <q-icon name="mdi-arrow-left mr-1" class="icon-back"/>
            Back
          </router-link>
          <p class="text-h4 text-center" style="font-weight: 600; line-height: 1.5;"> Forgot Password </p>
        </div>
        <q-input
          label="Email"
          v-model="email"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Email is required']"
          type="email"
        />

        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Send Reset Email"
            color="primary"
            class="full-width"
            rounded
            type="submit"
            style="padding: 10px; letter-spacing: 1px; text-decoration: none"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageForgotPassword',

  setup () {
    const { sendPasswordResetEmail } = useAuthUser()
    const { notifyError, notifySuccess } = useNotify()

    const email = ref('')

    const handleForgotPassword = async () => {
      try {
        await sendPasswordResetEmail(email.value)
        notifySuccess(`Password reset email sent to: ${email.value}`)
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      email,
      handleForgotPassword
    }
  }
})
</script>

<style scoped>
.back-login {
  font-size: 16px;
  color: #121212;
  text-decoration: none;
}

.back-login:hover {
  color: #26A69A;
}

.icon-back {
  font-size: 18px;
}
</style>
