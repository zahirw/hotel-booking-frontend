<script setup lang="ts">
import StepNavigationComponent from '@/components/StepNavigationComponent.vue'
const rooms = [
  {
    id: 1,
    imagePlaceholder: '340 × 210',
    title: 'ROOM 1 TITLE',
    subtitle: 'LOREM IPSUM DOLOR SIT AMET',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ex a risus dapibus pharetra facilisis ac felis.',
    price: '1,080',
  },
  {
    id: 2,
    imagePlaceholder: '340 × 210',
    title: 'ROOM 2 TITLE',
    subtitle: 'LOREM IPSUM DOLOR SIT AMET',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ex a risus dapibus pharetra facilisis ac felis.',
    price: '1,280',
  },
]
</script>

<template>
  <div class="select-room-page">
    <!-- Step Navigation -->
    <StepNavigationComponent />
    <!-- Dates & Sorting -->
    <div class="top-bar">
      <div class="dates">JUN 17, 2025 → JUN 18, 2025</div>
      <div class="info">
        <span>1 NIGHT | 1 GUEST</span>
        <label>
          SORT BY:
          <select>
            <option>LOWEST PRICE</option>
            <option>HIGHEST PRICE</option>
          </select>
        </label>
      </div>
    </div>

    <!-- Room List -->
    <div class="room-card" v-for="room in rooms" :key="room.id">
      <div class="room-image">{{ room.imagePlaceholder }}</div>
      <div class="room-details">
        <h3>{{ room.title }}</h3>
        <h4>{{ room.subtitle }}</h4>
        <p>{{ room.description }}</p>
      </div>
      <div class="room-price">
        <div class="price">S${{ room.price }}/<span class="night">night</span></div>
        <small>Subject to GST and charges</small>
        <button class="book-btn">BOOK ROOM</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.select-room-page {
  width: 100%;
  font-family: Arial, sans-serif;
  padding: 1rem;
  max-width: 900px;
  margin: auto;
}

/* Top Bar */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.dates {
  font-weight: bold;
}

.info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.info select {
  padding: 0.25rem;
}

/* Room Card */
.room-card {
  display: flex;
  background: #f8f8f0;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.room-image {
  background: #ccc;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 340px;
  height: 210px;
  flex-shrink: 0;
}

.room-details {
  flex: 1;
  padding: 1rem;
  min-width: 200px;
}

.room-details h3 {
  margin: 0 0 0.25rem 0;
}

.room-details h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.85rem;
  color: #888;
}

.room-details p {
  font-size: 0.9rem;
  line-height: 1.4;
}

.room-price {
  width: 180px;
  padding: 1rem;
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 150px;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
}

.night {
  font-size: 0.85rem;
}

.book-btn {
  background: black;
  color: white;
  padding: 0.5rem;
  border: none;
  margin-top: 0.5rem;
  cursor: pointer;
}

.book-btn:hover {
  background: #333;
}

/* Responsive */
@media (max-width: 768px) {
  .room-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .room-image {
    width: 100%;
  }

  .room-price {
    width: 100%;
    text-align: center;
  }
}
</style>
