<script setup lang="ts">
import type {
  getBookingByIdResponseType,
  getContactByIdResponseType,
  getRoomsResponseType,
} from '@/services/core/core.type'
import { deleteBookingRooms } from '@/services/core/mutations/booking'
import { getContactById } from '@/services/core/mutations/contact'
import { getBookingById } from '@/services/core/queries/booking'
import { getRoom } from '@/services/core/queries/room'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const props = defineProps<{
  roomId: string
  contactId: string
  bookingId: string
}>()

const emit = defineEmits(['refetchBookings'])

const { roomId, contactId, bookingId } = props
const route = useRoute()
const router = useRouter()
const roomData = ref<getRoomsResponseType>()
const contactData = ref<getContactByIdResponseType>()
const bookingData = ref<getBookingByIdResponseType>()
const tax = computed(() => (roomData.value ? (roomData.value?.pricePerNight * 9) / 100 : 0))
const total = computed(() =>
  roomData.value ? Number(tax.value) + Number(roomData.value.pricePerNight) : 0,
)
const showDelete = ref(false)

const setShowDelete = (params?: boolean) => {
  if (params) {
    showDelete.value = params
  } else {
    showDelete.value = !showDelete.value
  }
}

const fetchData = () => {
  getRoom({ id: roomId }).then((room) => (roomData.value = room))
  getContactById({ id: contactId }).then((contact) => (contactData.value = contact.data))
  getBookingById({ id: bookingId }).then((res) => (bookingData.value = res.data))
}

const handleDeleteBooking = () => {
  deleteBookingRooms({ id: bookingId }).then(() => emit('refetchBookings'))
}

const handleClickRoomName = (params: string) => {
  router.push(`/contact-information?bookingId=${params}`)
}

onMounted(() => fetchData())
</script>
<template>
  <div class="booking-card">
    <div v-if="route.path === '/dashboard'" class="elipsis-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="elipsis"
        @click.prevent="setShowDelete()"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
        />
      </svg>
    </div>
    <div
      v-if="showDelete"
      class="remove-menu"
      @mouseleave="setShowDelete(false)"
      @click.prevent="handleDeleteBooking"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>
      Cancel Booking
    </div>

    <!-- Room Info -->
    <div class="room-section">
      <img :src="roomData?.image" :alt="roomData?.name" class="room-image" />
      <div class="room-text">
        <h3
          :class="`room-title ${bookingData?.contactId === '' && 'pointer'}`"
          @click.prevent="handleClickRoomName(bookingId)"
        >
          {{ roomData?.name }}
        </h3>
        <p class="room-guests">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            style="width: 1rem"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
            />
          </svg>
          {{ bookingData?.totalGuest }} Guest
        </p>

        <div class="package">
          <h4 class="section-heading">
            {{ route.path === '/dashboard' ? 'Booking' : 'Package' }} Details
          </h4>
          <div class="price-row">
            <span>{{ route.path === '/dashboard' ? 'Booking ID' : 'Room' }}</span>
            <span>{{
              route.path === '/dashboard' ? bookingData?.id : `S$${roomData?.pricePerNight}`
            }}</span>
          </div>
          <div class="price-row">
            <span>{{ route.path === '/dashboard' ? 'Checkin' : 'Room' }}</span>
            <span>{{
              route.path === '/dashboard' ? bookingData?.checkin : `S$${roomData?.pricePerNight}`
            }}</span>
          </div>
          <div class="price-row">
            <span>{{ route.path === '/dashboard' ? 'Checkout' : 'Tax & Service (9%)' }} </span>
            <span>{{ route.path === '/dashboard' ? bookingData?.checkout : `S$${tax} ` }} </span>
          </div>
          <div v-if="route.path === 'dashboard'" class="price-row total">
            <strong>Total Price</strong>
            <strong>S${{ total }}</strong>
          </div>
        </div>
      </div>
    </div>

    <!-- Guest Details -->
    <div class="guest-section">
      <h4 class="section-heading">Guest Details</h4>
      <p><strong>Name:</strong> {{ contactData?.title }}. {{ contactData?.name }}</p>
      <p><strong>Email:</strong> {{ contactData?.email }}</p>
    </div>
  </div>
</template>

<style scoped>
.booking-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  margin: auto;
  border: 1px solid #f0f0f0;
  position: relative;
}
.elipsis-container {
  position: absolute;
  right: 20px;
  top: 15px;
}
.elipsis-container svg {
  width: 1.8rem;
  cursor: pointer;
}

.remove-menu {
  display: flex;
  gap: 5px;
  position: absolute;
  width: fit-content;
  padding: 10px;
  background-color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  right: 40px;
  top: 30px;
  border-radius: 10px;
  cursor: pointer;
  color: red;
}

.remove-menu svg {
  width: 20px;
  color: red;
}

.room-section {
  display: flex;
  gap: 20px;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.room-image {
  width: 320px;
  height: 200px;
  object-fit: cover;
  border-radius: 20px;
}

.room-text {
  flex: 1;
}

.room-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #222;
}
.pointer {
  cursor: pointer;
}

.room-guests {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin: 4px 0 12px;
  font-size: 14px;
  color: #666;
}

.section-heading {
  margin: 0 0 8px;
  font-size: 15px;
  font-weight: 600;
  color: #444;
}

.package {
  background: #fafafa;
  border-radius: 10px;
  padding: 12px;
  border: 1px solid #eee;
}

.price-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin: 4px 0;
  color: #444;
}

.price-row.total {
  border-top: 1px dashed #ccc;
  margin-top: 8px;
  padding-top: 8px;
  font-size: 15px;
  font-weight: 700;
  color: #222;
}

.guest-section {
  padding: 20px;
  background: #fdfdfd;
}

.guest-section p {
  margin: 4px 0;
  font-size: 14px;
  color: #444;
}

@media (max-width: 768px) {
  .room-section {
    flex-direction: column;
  }
  .room-image {
    width: 100%;
    height: 180px;
  }
}
</style>
