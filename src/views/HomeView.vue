<script setup lang="ts">
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
  <header class="book-room-page">
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
        <input type="date" v-model="date" />
      </div>
    </div>

    <!-- Search Button -->
    <button class="search-btn" @click.prevent="handleSearch">SEARCH FOR ROOMS</button>
  </header>
</template>

<style scoped>
.book-room-page {
  text-align: center;
  padding: 2rem 1rem;
}

/* Banner */
.banner {
  background: #ccc;
  width: 100%;
  max-width: 1000px;
  height: 400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #666;
}

/* Title */
.title {
  margin-top: 1.5rem;
  font-size: 1.2rem;
  letter-spacing: 2px;
  font-weight: normal;
}

/* Booking Form */
.booking-form {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.5rem 0;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.form-group {
  display: flex;
  align-items: center;
  background: #f3f3ea;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
}

.form-group .icon {
  margin-right: 0.5rem;
}

.form-group select,
.form-group input {
  border: none;
  background: transparent;
  font-size: 1rem;
  outline: none;
}

/* Search Button */
.search-btn {
  background: black;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.search-btn:hover {
  background: #333;
}
</style>
