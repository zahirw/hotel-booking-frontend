<script setup lang="ts">
import BookingDetailCard from '@/components/BookingDetailCard.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import type { getBookingByIdResponseType, getRoomsResponseType } from '@/services/core/core.type'
import { getBookingById } from '@/services/core/queries/booking'
import { getRoom } from '@/services/core/queries/room'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const roomId = ref<string>()
const contactId = ref<string>()
const bookingId = route.query.bookingId as string
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
    <BookingDetailCard
      v-if="roomId && contactId && bookingId"
      :room-id="roomId"
      :contact-id="contactId"
      :booking-id="bookingId"
    />
    <div style="display: flex; align-items: center">
      <ButtonComponent
        type="button"
        variant="primary"
        class="btn-dashboard"
        @click.prevent="router.replace('/dashboard')"
        >Go to Dashboard</ButtonComponent
      >
    </div>
  </div>
</template>

<style scoped>
.booking-confirmation {
  max-width: 100vw;
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

.btn-dashboard {
  margin: 1rem auto;
  max-width: 30vw;
  border-radius: 100px;
}

@media (min-width: 768px) {
  .booking-confirmation {
    margin: auto 0;
    padding: 0 30rem;
  }
}
</style>
