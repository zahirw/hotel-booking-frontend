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
  <div class="book-room-page">
    <section class="hero">
      <img
        src="https://smithgeestudio.com/wp-content/uploads/2023/03/Harpeth-Hotel-Hero-1920-x-1000.jpg"
        alt="Hotel hero image"
        class="hero-image"
      />
      <div class="hero-overlay">
        <!-- Title & Subtitle -->
        <h1 class="hero-heading">Experience Luxury & Comfort</h1>
        <p class="hero-subtitle">Book your perfect stay with us</p>

        <!-- Booking Form -->
        <div class="booking-form">
          <!-- Guests -->
          <div class="form-group">
            <span class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="black"
                style="width: 20px"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </span>
            <input type="number" v-model="peoples" />
          </div>

          <!-- Date -->
          <div class="form-group">
            <span class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="black"
                style="width: 20px"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>
            </span>
            <input type="date" v-model="date" style="width: 100%" />
          </div>

          <!-- Search Button -->
          <button class="search-btn" @click.prevent="handleSearch">SEARCH</button>
        </div>
      </div>
    </section>
    <!-- Banner -->
    <!-- <div class="banner">1000 × 400</div> -->
  </div>
</template>

<style scoped>
.book-room-page {
  text-align: center;
  /* padding: 2rem 1rem; */
  font-family: 'Segoe UI', Roboto, sans-serif;
  background: #fafafa;
  min-height: 100vh;
}
.hero {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%; /* adjust as needed */
  overflow: hidden;
  z-index: 0;
}
.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.45);
  color: white;
  text-align: center;
  padding: 2rem;
}

.hero-heading {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  letter-spacing: 2px;
}

.hero-subtitle {
  font-size: 1.2rem;
  font-weight: 300;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.booking-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  gap: 1rem;
  backdrop-filter: blur(8px);
}

.form-group {
  display: flex;
  align-items: center;
  gap: 10px;
  background: white;
  padding: 0.6rem 1rem;
  border-radius: 8px;
}
.form-group input {
  width: 130px;
}

.form-group select,
.form-group input {
  border: none;
  background: transparent;
  font-size: 1rem;
  outline: none;
  color: #333;
}

.search-btn {
  background: #ff6f61;
  color: white;
  padding: 0.8rem 1.8rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  transition: background 0.25s;
}

.search-btn:hover {
  background: #e65c50;
}

.icon {
  display: flex;
  align-items: center;
}

@media (min-width: 768px) {
  .booking-form {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: rgba(255, 255, 255, 0.15);
    padding: 1rem 1.5rem;
    border-radius: 12px;
    gap: 1rem;
    backdrop-filter: blur(8px);
  }
  .form-group input {
    width: 50px;
  }
}
</style>
