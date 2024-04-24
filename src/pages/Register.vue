<template>
  <q-page style="padding: 50px">
    <q-form class="row justify-center" @submit.prevent="handleRegister">
      <div class="col-md-4 col-sm-6 col-xs-12 q-gutter-y-md">
        <div class="d-flex justify-start align-center mb-4">
          <router-link class="back-login" :to="{ name: 'login' }" style="display: flex; align-items: center;">
            <q-icon name="mdi-arrow-left mr-1" class="icon-back"/>
            Back
          </router-link>
          <p class="text-h4 text-center" style="font-weight: 600; line-height: 1.5;"> Register </p>
        </div>

        <q-input
          label="Name"
          v-model="form.name"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Name is required']"
        />

        <q-input
          label="Email"
          v-model="form.email"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Email is required']"
          type="email"
        />

        <q-input
          label="Password"
          v-model="form.password"
          lazy-rules
          :rules="[val => (val && val.length >= 6) || 'Password is required and 6 characters']"
        />

        <!-- Botão de registro -->
        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Register"
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
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageRegister',

  setup () {
    const router = useRouter()

    const { register } = useAuthUser()
    const { notifyError, notifySuccess } = useNotify()

    const form = ref({
      name: '',
      email: '',
      password: ''
    })

    const handleRegister = async () => {
      try {
        await register(form.value)
        notifySuccess('Register successfully!')
        router.push({
          name: 'email-confirmation',
          query: { email: form.value.email }
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      form,
      handleRegister
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
  text-decoration: underline;
}

.icon-back {
  font-size: 18px;
}
</style>
