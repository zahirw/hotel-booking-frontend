<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { addDays, format } from 'date-fns'
import StepNavigationComponent from '@/components/StepNavigationComponent.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { getRooms } from '@/services/core/queries/room'
import type { getRoomsResponseType, postBookingRoomParamsType } from '@/services/core/core.type'
import { postBookingRooms } from '@/services/core/mutations/booking'
import { useStore } from '@/stores'

const route = useRoute()
const router = useRouter()
const store = useStore()
const peoples = computed(() => route.query.peoples as string)
const date = computed(() => new Date(route.query.date as string))
const formattedDate = format(date.value, 'MMMM dd, yyyy')
const nextDay = format(addDays(date.value, 1), 'MMMM dd, yyyy')
const sort = ref<'asc' | 'desc'>('asc')
const data = ref<getRoomsResponseType[]>()

const createBookingRoom = async (roomId: string) => {
  try {
    const params: postBookingRoomParamsType = {
      roomId,
      userId: store.currentUser?.id?.toString() as string,
      checkin: formattedDate,
      checkout: nextDay,
    }
    const res = await postBookingRooms(params)
    if (res.status === 200) {
      router.push(`/contact-information?bookingId=${res.data.booking.id}`)
    }
  } catch (err) {
    console.error(err)
  }
}

const fetchRooms = async () => {
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

onMounted(fetchRooms)
watch([date, sort, peoples], () => {
  fetchRooms()
  console.log(data)
})
</script>

<template>
  <div class="select-room-page">
    <!-- Step Navigation -->
    <StepNavigationComponent />

    <!-- Top Bar -->
    <div class="top-bar">
      <div class="dates">
        <span class="date-text">{{ `${formattedDate} → ${nextDay}` }}</span>
      </div>
      <div class="info">
        <span class="stay-info">{{ `1 NIGHT | ${peoples} GUEST` }}</span>
        <label class="sort-label">
          <span>SORT BY:</span>
          <select v-model="sort" class="sort-select">
            <option value="asc">LOWEST PRICE</option>
            <option value="desc">HIGHEST PRICE</option>
          </select>
        </label>
      </div>
    </div>

    <!-- Room List -->
    <div class="room-card" v-for="room in data" :key="room.id">
      <div class="room-image">340 × 210</div>

      <div class="room-details">
        <h3 class="room-title">{{ room.name }}</h3>
        <h4 class="room-subtitle">Deluxe Package</h4>
        <p class="room-description">
          Spacious room with modern amenities. Perfect for relaxing staycation with family or
          business trip.
        </p>
      </div>

      <div class="room-price">
        <div class="price">
          S${{ room.pricePerNight }}
          <span class="night">/night</span>
        </div>
        <small class="tax-note">+ GST & Service Charges</small>
        <button class="book-btn" @click.prevent="createBookingRoom(room.id.toString())">
          BOOK ROOM
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.select-room-page {
  width: 100%;
  font-family: 'Inter', Arial, sans-serif;
  padding: 1rem;
  max-width: 1000px;
  margin: auto;
}

/* Top Bar */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0;
  flex-wrap: wrap;
  gap: 1rem;
}

.date-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: #222;
}

.stay-info {
  font-size: 0.9rem;
  color: #666;
  margin-right: 1rem;
}

.sort-label {
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-select {
  padding: 0.4rem 0.6rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.85rem;
  background: white;
  cursor: pointer;
}

/* Room Card */
.room-card {
  display: flex;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 1.5rem;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.room-card:hover {
  transform: translateY(-3px);
}

.room-image {
  background: linear-gradient(135deg, #e0e0e0, #cfcfcf);
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 320px;
  height: 200px;
  flex-shrink: 0;
  font-size: 0.9rem;
  font-weight: 500;
}

.room-details {
  flex: 1;
  padding: 1.2rem;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.room-title {
  margin: 0 0 0.25rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #222;
}

.room-subtitle {
  margin: 0 0 0.6rem 0;
  font-size: 0.85rem;
  color: #777;
  font-weight: 500;
}

.room-description {
  font-size: 0.9rem;
  line-height: 1.4;
  color: #555;
}

/* Price & Book */
.room-price {
  width: 200px;
  padding: 1.2rem;
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #fafafa;
  border-left: 1px solid #f0f0f0;
}

.price {
  font-size: 1.4rem;
  font-weight: 700;
  color: #222;
}

.night {
  font-size: 0.85rem;
  font-weight: 400;
  color: #666;
}

.tax-note {
  font-size: 0.75rem;
  color: #999;
  margin: 0.3rem 0 0.8rem;
}

.book-btn {
  background: #222;
  color: white;
  padding: 0.6rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: background 0.2s ease;
}

.book-btn:hover {
  background: #444;
}

/* Responsive */
@media (max-width: 768px) {
  .room-card {
    flex-direction: column;
    text-align: center;
  }

  .room-image {
    width: 100%;
    height: 180px;
  }

  .room-price {
    width: 100%;
    border-left: none;
    border-top: 1px solid #f0f0f0;
    text-align: center;
  }
}
</style>
