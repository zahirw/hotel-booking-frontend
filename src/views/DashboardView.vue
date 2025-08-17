<script setup lang="ts">
import BookingDetailCard from '@/components/BookingDetailCard.vue'
import type { getBookingByIdResponseType } from '@/services/core/core.type'
import { getBookings } from '@/services/core/queries/booking'
import { useStore } from '@/stores'
import { onMounted, ref } from 'vue'

const store = useStore()
const bookingsData = ref<getBookingByIdResponseType[]>()

const fetchBookings = () => {
  getBookings({ userId: store.currentUser?.id?.toString() as string }).then(
    (res) => (bookingsData.value = res.data),
  )
}

onMounted(() => fetchBookings())
</script>

<template>
  <div class="dashboard-page">
    <div v-for="booking in bookingsData" v-bind:key="booking.id">
      <BookingDetailCard :room-id="booking.roomId" :contact-id="booking.contactId" />
    </div>
  </div>
</template>
<style scoped>
.dashboard-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 5rem;
}

@media (min-width: 768px) {
  .dashboard-page {
    padding: 0 10rem;
    margin: 5rem auto;
  }
}
</style>
