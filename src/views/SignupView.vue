<script setup lang="ts">
import ButtonComponent from '@/components/ButtonComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import type { SignupParamsType } from '@/services/auth/auth.type'
import useSignupMutation from '@/services/auth/mutation/signup'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const signupParams: SignupParamsType = reactive({
  name: '',
  email: '',
  password: '',
})
const router = useRouter()

const handleSignup = useSignupMutation({
  onSuccess: (response) => {
    console.log('Signup successful:', response)
    router.push('/signin')
  },
  onError: (error) => {
    console.error('Signup failed:', error)
  },
})
</script>

<template>
  <div class="signup-container">
    <div class="signup-box">
      <h2>Sign Up</h2>
      <form @submit.prevent="handleSignup.mutate(signupParams)">
        <!-- body.name -->
        <div class="form-group">
          <InputComponent
            type="text"
            label="Full name"
            v-model="signupParams.name"
            placeholder="Enter your body.name"
            required
          />
        </div>

        <!-- Email -->
        <div class="form-group">
          <InputComponent
            type="email"
            label="Email"
            v-model="signupParams.email"
            placeholder="Enter your email"
            required
          />
        </div>

        <!-- Password -->
        <div class="form-group">
          <InputComponent
            type="password"
            label="Password"
            v-model="signupParams.password"
            placeholder="Enter your password"
            required
          />
        </div>

        <ButtonComponent type="submit" variant="secondary">Create Account</ButtonComponent>

        <p class="login-text">
          Already have an account?
          <a @click.prevent="router.push('signin')">Login</a>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.signup-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f6f6f6;
  padding: 20px;
}

.signup-box {
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

.login-text {
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
}

.login-text a {
  color: #4caf50;
  text-decoration: none;
  cursor: pointer;
}

.login-text a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .signup-box {
    padding: 20px;
  }
  h2 {
    font-size: 20px;
  }
}
</style>
