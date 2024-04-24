<template>
  <q-page style="padding: 50px">
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h4 text-center" style="font-weight: 600; line-height: 1.5"> Login </p>
      <div class="col-md-4 col-sm-6 col-xs-12 q-gutter-y-md">
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
          :rules="[val => (val && val.length > 0) || 'Password is required']"
        />

        <router-link
          class="full-width q-btn-item"
          :to="{ name: 'forgot-password' }"
        >
          Forgot Password?
        </router-link>

        <div class="full-width q-pt-md">
          <q-btn
            label="Login"
            color="primary"
            class="full-width"
            rounded
            type="submit"
            style="padding: 10px; letter-spacing: 1px; text-decoration: none"
          />
        </div>
        <div class="full-width q-gutter-y-sm account my-8" style="text-align: center">
          <span>Don't have an account? </span>
          <router-link class="full-width q-btn-register" to="/register">Register</router-link>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
/* eslint-disable-next-line vue/match-component-file-name */
import { defineComponent, ref, onMounted } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageLogin',

  setup () {
    const router = useRouter()

    const { login, isLoggedIn } = useAuthUser()

    const { notifyError, notifySuccess } = useNotify()

    const form = ref({
      email: '',
      password: ''
    })

    onMounted(() => {
      if (isLoggedIn) {
        router.push({ name: 'me' })
      }
    })

    const handleLogin = async () => {
      try {
        await login(form.value)
        notifySuccess('Login successfully!')
        router.push({ name: 'me' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      form,
      handleLogin
    }
  }
})
</script>

<style scoped>
.q-btn-item {
  display: block;
  text-align: right;
  margin-top: 2px;
  color: rgba(0, 0, 0, 0.87);
  text-decoration: none;
}

.q-btn-item:hover {
  text-decoration: underline;
}

.account {
  font-size: .875rem;
  line-height: 1.25rem;
}

.my-8 {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.q-btn-register {
  color: #26A69A;
  text-decoration: none;
}

.q-btn-register:hover {
  text-decoration: underline;
}
</style>
