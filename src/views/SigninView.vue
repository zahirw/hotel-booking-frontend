<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

function handleLogin() {
  alert(`Logging in with: ${email.value}`)
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="email" placeholder="Enter your email" required />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" v-model="password" placeholder="Enter your password" required />
        </div>

        <button type="submit" class="btn-login">Login</button>

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

.btn-login {
  width: 100%;
  padding: 12px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.btn-login:hover {
  background: #357ab8;
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
