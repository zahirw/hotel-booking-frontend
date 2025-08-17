<script setup lang="ts">
import BookingDetailCard from '@/components/BookingDetailCard.vue'
import type { getBookingByIdResponseType, getRoomsResponseType } from '@/services/core/core.type'
import { getBookingById } from '@/services/core/queries/booking'
import { getRoom } from '@/services/core/queries/room'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const roomId = ref<string>()
const contactId = ref<string>()
const bookingData = ref<getBookingByIdResponseType>()
const roomData = ref<getRoomsResponseType>()

const fetchBooking = () => {
  getBookingById({ id: route.query.bookingId as string }).then((res) => {
    bookingData.value = res.data
    contactId.value = res.data.contactId
    roomId.value = res.data.roomId
    getRoom({ id: res.data.roomId }).then((room) => (roomData.value = room))
  })
}

onMounted(() => fetchBooking())
</script>

<template>
  <div class="booking-confirmation">
    <!-- Header -->
    <h2>Your Booking Has Been Confirmed</h2>
    <p class="confirmation-text">
      We have sent your booking confirmation to the email address that you have provided.<br />
      Check-in/Check-out: <strong>{{ bookingData?.checkin }}</strong> →
      <strong>{{ bookingData?.checkout }}</strong
      ><br />
      Booking Confirmation Number: <strong>{{ `book${bookingData?.id}` }}</strong
      ><br />
      Total Price for 1 Night: <strong>S${{ roomData?.pricePerNight }}</strong>
    </p>

    <!-- Booking Details -->
    <BookingDetailCard v-if="roomId && contactId" :room-id="roomId" :contact-id="contactId" />
  </div>
</template>

<style scoped>
.booking-confirmation {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.booking-confirmation h2 {
  text-align: center;
  margin-bottom: 10px;
}

.confirmation-text {
  text-align: center;
  font-size: 14px;
  margin-bottom: 20px;
  line-height: 1.5;
}
</style>
