<script setup lang="ts">
import { useRoute } from 'vue-router'
import { addDays, format } from 'date-fns'
import StepNavigationComponent from '@/components/StepNavigationComponent.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { getRooms } from '@/services/core/queries/getRooms'
import type { getRoomsResponseType } from '@/services/core/core.type'

const route = useRoute()
const peoples = computed(() => route.query.peoples as string)
const date = computed(() => new Date(route.query.date as string))
const formattedDate = format(date.value, 'MMMM dd, yyyy')
const sort = ref<'asc' | 'desc'>('asc')
const data = ref<getRoomsResponseType[]>()

const fetchRoomsFromQuery = async () => {
  try {
    const params = {
      guests: route.query.peoples as string,
      checkinDate: route.query.date as string,
      sort: sort.value,
    }
    const res = await getRooms(params)
    data.value = res
  } catch (err) {
    console.error(err)
  }
}
onMounted(fetchRoomsFromQuery)
watch([date, sort, peoples], () => {
  fetchRoomsFromQuery()
  console.log(data)
})
</script>

<template>
  <div class="select-room-page">
    <!-- Step Navigation -->
    <StepNavigationComponent />
    <!-- Dates & Sorting -->
    <div class="top-bar">
      <div class="dates">
        {{ `${formattedDate} → ${format(addDays(date, 1), 'MMMM dd, yyyy')}` }}
      </div>
      <div class="info">
        <span>{{ `1 NIGHT | ${peoples} GUEST` }}</span>
        <label>
          SORT BY:
          <select v-model="sort">
            <option value="asc">LOWEST PRICE</option>
            <option value="desc">HIGHEST PRICE</option>
          </select>
        </label>
      </div>
    </div>

    <!-- Room List -->
    <div class="room-card" v-for="room in data" :key="room.id">
      <div class="room-image">{{ room.name }}</div>
      <div class="room-details">
        <h3>{{ room.name }}</h3>
        <h4>{{ room.name }}</h4>
        <p>{{ room.name }}</p>
      </div>
      <div class="room-price">
        <div class="price">S${{ room.pricePerNight }}/<span class="night">night</span></div>
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
