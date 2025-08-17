<script setup lang="ts">
import BookingDetailCard from '@/components/BookingDetailCard.vue'
import type { getBookingByIdResponseType } from '@/services/core/core.type'
import { getBookings } from '@/services/core/queries/booking'
import { useStore } from '@/stores'
import { onMounted, ref, watch } from 'vue'

const store = useStore()
const bookingsData = ref<getBookingByIdResponseType[]>()
const filteredBookingData = ref<getBookingByIdResponseType[]>()
const tab = ref('all')

const setTab = (params: string) => {
  tab.value = params
  if (params === 'past') {
    filteredBookingData.value = bookingsData?.value?.filter(
      (booking) => new Date(booking.checkin) < new Date(),
    )
  }
  if (params === 'upcoming') {
    filteredBookingData.value = bookingsData?.value?.filter(
      (booking) => new Date(booking.checkin) > new Date(),
    )
  }
  if (params === 'draft') {
    filteredBookingData.value = bookingsData?.value?.filter((booking) => booking.contactId === '')
  }
}

const fetchBookings = () => {
  getBookings({ userId: store.currentUser?.id?.toString() as string })
    .then((res) => (bookingsData.value = res.data))
    .catch((err) => console.error(err))
}

onMounted(() => fetchBookings())
watch([store], () => fetchBookings())
</script>

<template>
  <div class="dashboard-page">
    <!-- Tabs Menu -->
    <div class="tabs">
      <button :class="`tab ${tab === 'all' && 'active'}`" @click.prevent="setTab('all')">
        All
      </button>
      <button :class="`tab ${tab === 'upcoming' && 'active'}`" @click.prevent="setTab('upcoming')">
        Upcoming
      </button>
      <button :class="`tab ${tab === 'past' && 'active'}`" @click.prevent="setTab('past')">
        Past
      </button>
      <button :class="`tab ${tab === 'draft' && 'active'}`" @click.prevent="setTab('draft')">
        Draft
      </button>
    </div>
    <div
      v-for="booking in tab === 'all' ? bookingsData : filteredBookingData"
      v-bind:key="booking.id"
    >
      <BookingDetailCard
        :room-id="booking.roomId"
        :contact-id="booking.contactId"
        :booking-id="booking.id"
        @refetch-bookings="fetchBookings"
      />
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

/* Tabs Container */
.tabs {
  display: flex;
  justify-content: left;
  gap: 1rem;
  margin-bottom: 1rem;
  /* border-bottom: 2px solid #e5e5e5; */
}

/* Tab Button */
.tab {
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.tab:hover {
  color: #000;
  border-bottom: 3px solid #ccc;
}

.tab.active {
  color: #000;
  border-bottom: 3px solid #000;
  font-weight: 600;
}

@media (min-width: 768px) {
  .dashboard-page {
    padding: 0 25rem;
    margin: 5rem auto;
  }
}
</style>
