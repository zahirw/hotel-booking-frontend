<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const MenuData: { name: string; link: string }[] = [
  { name: 'Home', link: '/' },
  { name: 'Select Room', link: '/select-room' },
  { name: 'Contact Infomation', link: '/contact-information' },
  { name: 'Booking Confirmation', link: '/booking-confirmation' },
]

const route = useRouter()
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
  route.push(link)
}
</script>

<template>
  <header class="header">
    <div class="container">
      <!-- Logo -->
      <div class="logo">MyLogo</div>

      <!-- Desktop Navigation -->
      <nav class="nav desktop-nav">
        <a v-for="item in MenuData" :key="item.name" @click.prevent="handleClickLink(item.link)">
          {{ item.name }}
        </a>
      </nav>

      <!-- Mobile Menu Button -->
      <button class="menu-btn" @click="toggleMenu">☰</button>
    </div>

    <!-- Mobile Navigation -->
    <nav v-if="isMenuOpen" class="nav mobile-nav">
      <a href="#" @click="closeMenu">Home</a>
      <a href="#" @click="closeMenu">About</a>
      <a href="#" @click="closeMenu">Services</a>
      <a href="#" @click="closeMenu">Contact</a>
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
}

.nav a:hover {
  color: #0077cc;
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
