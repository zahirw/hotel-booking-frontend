<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ButtonComponent from '../ButtonComponent.vue'
import { useStore } from '@/stores'

const MenuData: { name: string; link: string }[] = [{ name: 'Dashboard', link: '/dashboard' }]

const router = useRouter()
const store = useStore()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
const handleClickLink = (link: string) => {
  closeMenu()
  // Navigate to the clicked link
  router.push(link)
}
</script>

<template>
  <header class="header">
    <div class="container">
      <!-- Logo -->
      <div class="logo" @click.prevent="router.push('/')">MyLogo</div>

      <!-- Desktop Navigation -->
      <nav v-if="!!store.currentUser" class="nav desktop-nav">
        <a v-for="item in MenuData" :key="item.name" @click.prevent="handleClickLink(item.link)">
          {{ item.name }}
        </a>
      </nav>
      <nav v-else class="nav desktop-nav">
        <ButtonComponent
          type="button"
          variant="primary"
          class="btn-login"
          @click="router.push('/signin')"
          >Login</ButtonComponent
        >
      </nav>

      <!-- Mobile Menu Button -->
      <button class="menu-btn" @click="toggleMenu">☰</button>
    </div>

    <!-- Mobile Navigation -->
    <nav v-if="isMenuOpen" class="nav mobile-nav">
      <a v-for="item in MenuData" :key="item.name" @click.prevent="handleClickLink(item.link)">
        {{ item.name }}
      </a>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #0077cc;
  cursor: pointer;
}

/* Navigation Links */
.nav {
  display: flex;
  gap: 1rem;
}

.nav a {
  text-decoration: none;
  color: #333;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
}

.nav a:hover {
  color: #0077cc;
}

.btn-login {
  padding: 0.7rem 3rem 0.7rem 3rem;
  border-radius: 12px;
  font-weight: 700;
}

/* Mobile Menu Button */
.menu-btn {
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  display: none;
}

/* Mobile Navigation */
.mobile-nav {
  flex-direction: column;
  background: white;
  padding: 0.5rem 1rem;
  border-top: 1px solid #eee;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .menu-btn {
    display: block;
  }

  .mobile-nav a {
    padding: 0.5rem 0;
  }
}
</style>
