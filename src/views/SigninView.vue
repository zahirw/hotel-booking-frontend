<script setup lang="ts">
import type { SigninParamsType } from '@/services/auth/auth.type'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import { signin } from '@/services/auth/mutation/signin'
import { useStore } from '@/stores'
import ButtonComponent from '@/components/ButtonComponent.vue'
import InputComponent from '@/components/InputComponent.vue'

const router = useRouter()
const store = useStore()

const signinParams: SigninParamsType = reactive({
  email: '',
  password: '',
})

const handleSigin = () => {
  signin(signinParams).then((res) => {
    console.log(res)
    Cookies.set('token', res.data.token)
    store.token = res.data.token
    store.currentUser = res.data.user
    router.replace('/')
  })
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Login</h2>
      <form @submit.prevent="handleSigin()">
        <div class="form-group">
          <InputComponent
            type="email"
            label="Email"
            v-model="signinParams.email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="form-group">
          <InputComponent
            type="password"
            label="Password"
            v-model="signinParams.password"
            placeholder="Enter your password"
            required
          />
        </div>
        <ButtonComponent type="submit">Login</ButtonComponent>

        <p class="signup-text">
          Don’t have an account?
          <a href="#" @click.prevent="router.push('/signup')">Sign Up</a>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f6f6f6;
  padding: 20px;
}

.login-box {
  background: #fff;
  padding: 30px;
  max-width: 400px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
}

.form-group {
  margin-bottom: 15px;
}

.signup-text {
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
}

.signup-text a {
  color: #4a90e2;
  text-decoration: none;
}

.signup-text a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login-box {
    padding: 20px;
  }
  h2 {
    font-size: 20px;
  }
}
</style>
