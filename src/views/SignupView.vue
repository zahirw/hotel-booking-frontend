<script setup lang="ts">
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
          <label>Full name</label>
          <input
            type="text"
            v-model="signupParams.name"
            placeholder="Enter your body.name"
            required
          />
        </div>

        <!-- Email -->
        <div class="form-group">
          <label>Email</label>
          <input
            type="email"
            v-model="signupParams.email"
            placeholder="Enter your email"
            required
          />
        </div>

        <!-- Password -->
        <div class="form-group">
          <label>Password</label>
          <input
            type="password"
            v-model="signupParams.password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" class="btn-signup">Create Account</button>

        <p class="login-text">
          Already have an account?
          <a href="#">Login</a>
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

label {
  display: block;
  font-size: 14px;
  margin-bottom: 6px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.btn-signup {
  width: 100%;
  padding: 12px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.btn-signup:hover {
  background: #3e8e41;
}

.login-text {
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
}

.login-text a {
  color: #4caf50;
  text-decoration: none;
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
