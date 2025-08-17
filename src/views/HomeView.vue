<script setup lang="ts">
import ButtonComponent from '@/components/ButtonComponent.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const peoples = ref<number>(0)
const date = ref<Date>(new Date())
const router = useRouter()

const handleSearch = () => {
  const selectedDate = new Date(date.value)
  const formattedDate = selectedDate.toISOString().split('T')[0]

  router.push({
    name: 'select-room',
    query: {
      peoples: peoples.value,
      date: formattedDate,
    },
  })
}
</script>

<template>
  <div class="book-room-page">
    <!-- Banner -->
    <div class="banner">1000 × 400</div>

    <!-- Title -->
    <h2 class="title">BOOK A ROOM</h2>

    <!-- Booking Form -->
    <div class="booking-form">
      <!-- Guests -->
      <div class="form-group">
        <span class="icon">👤</span>
        <select v-model="peoples">
          <option value="0">Guest</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>

      <!-- Date -->
      <div class="form-group">
        <span class="icon">📅</span>
        <input type="date" v-model="date" />
      </div>
    </div>

    <!-- Search Button -->
    <ButtonComponent variant="primary" @click.prevent="handleSearch"
      >Search for rooms</ButtonComponent
    >
    <button class="search-btn" @click.prevent="handleSearch">SEARCH FOR ROOMS</button>
  </div>
</template>

<style scoped>
.book-room-page {
  text-align: center;
  padding: 2rem 1rem;
  font-family: 'Segoe UI', Roboto, sans-serif;
  background: #fafafa;
  min-height: 100vh;
}

/* Banner */
.banner {
  background: linear-gradient(135deg, #4a90e2, #357ab8);
  width: 100%;
  max-width: 1000px;
  height: 300px;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  font-weight: 600;
}

/* Title */
.title {
  margin-top: 2rem;
  font-size: 1.5rem;
  letter-spacing: 2px;
  font-weight: 600;
  color: #333;
}

/* Booking Form */
.booking-form {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  gap: 1rem;
  flex-wrap: wrap;
}

.form-group {
  display: flex;
  align-items: center;
  background: white;
  padding: 0.6rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition:
    border 0.2s,
    box-shadow 0.2s;
}

.form-group:hover {
  border-color: #4a90e2;
  box-shadow: 0 3px 8px rgba(74, 144, 226, 0.15);
}

.form-group .icon {
  margin-right: 0.5rem;
  font-size: 1.1rem;
}

.form-group select,
.form-group input {
  border: none;
  background: transparent;
  font-size: 1rem;
  outline: none;
  padding: 0.2rem;
}

/* Search Button */
.search-btn {
  background: #4a90e2;
  color: white;
  padding: 0.9rem 2rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  letter-spacing: 1px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(74, 144, 226, 0.3);
  transition:
    background 0.25s,
    transform 0.1s;
}

.search-btn:hover {
  background: #357ab8;
  transform: translateY(-1px);
}

.search-btn:active {
  transform: translateY(0);
}
</style>
