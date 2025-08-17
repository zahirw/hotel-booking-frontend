<script setup lang="ts">
import StepNavigationComponent from '@/components/StepNavigationComponent.vue'
import type { getBookingByIdResponseType, getRoomsResponseType } from '@/services/core/core.type'
import { postContact } from '@/services/core/mutations/contact'
import { getRoom } from '@/services/core/queries/room'
import { computed, onMounted, reactive, ref } from 'vue'
import { useStore } from '@/stores'
import { patchBookingRooms } from '@/services/core/mutations/booking'
import { getBookingById } from '@/services/core/queries/booking'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const route = useRoute()
const router = useRouter()
const form = reactive({
  title: 'Mr.',
  name: 'Adam',
  email: 'bazytepu@teleg.eu',
})
const bookingData = ref<getBookingByIdResponseType>()
const roomData = ref<getRoomsResponseType>()
const tax = computed(() => (roomData.value ? (roomData.value?.pricePerNight * 9) / 100 : 0))
const total = computed(() =>
  roomData.value ? Number(tax.value) + Number(roomData.value.pricePerNight) : 0,
)

const fetchRoom = async (id: string) => {
  try {
    const params = {
      id,
    }
    const res = await getRoom(params)
    roomData.value = res
  } catch (err) {
    console.error(err)
  }
}

const fetchBooking = async () => {
  getBookingById({ id: route.query.bookingId as string }).then((res) => {
    bookingData.value = res.data
    fetchRoom(res.data.roomId)
  })
}

const createContact = async () => {
  if (store.currentUser) {
    postContact({ userId: store.currentUser?.id?.toString() as string, ...form })
      .then((res) =>
        patchBookingRooms({ id: route.query.bookingId as string, contactId: res.data.contact.id }),
      )
      .finally(() => router.push({ path: '/booking-confirmation', query: { ...route.query } }))
  }
}
onMounted(() => {
  fetchBooking()
})
// watch([date, sort, peoples], () => {
//   fetchRooms()
//   console.log(data)
// })
</script>
<template>
  <div class="contact-page">
    <StepNavigationComponent />

    <div class="contact-container">
      <!-- Contact Information Form -->
      <div class="contact-form">
        <h2 class="form-title">Contact Information</h2>

        <div class="form-group">
          <label for="title">Title</label>
          <select id="title" v-model="form.title">
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Ms.</option>
            <option>Dr.</option>
          </select>
        </div>

        <div class="form-group">
          <label for="name">Full Name</label>
          <input id="name" v-model="form.name" type="text" placeholder="Enter your full name" />
        </div>

        <div class="form-group">
          <label for="email">Email Address</label>
          <input id="email" v-model="form.email" type="email" placeholder="example@mail.com" />
        </div>

        <button class="proceed-btn" @click.prevent="createContact()">
          Proceed to Confirmation
        </button>
      </div>

      <!-- Summary -->
      <div class="summary">
        <p class="date">JUN 17, 2025 → JUN 18, 2025</p>
        <p class="nights">1 NIGHT</p>
        <p class="guests">ROOM FOR: {{ roomData?.maxGuests }} GUEST</p>

        <div class="room-image">340 × 210</div>

        <h3 class="room-title">{{ roomData?.name }}</h3>
        <div class="price-breakdown">
          <div class="row">
            <span>Room</span>
            <span>S${{ roomData?.pricePerNight }}</span>
          </div>
          <div class="row">
            <span>Tax & Service Charges (9%)</span>
            <span>S${{ tax }}</span>
          </div>
          <div class="row total">
            <span>Total</span>
            <span class="total-price">S${{ total }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-page {
  width: 100%;
  font-family: 'Inter', Arial, sans-serif;
  padding: 1rem;
  margin: auto;
  max-width: 1000px;
}

/* Layout */
.contact-container {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

/* Contact Form */
.contact-form {
  flex: 2;
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 14px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
}

.form-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  color: #222;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
}

label {
  font-size: 0.9rem;
  margin-bottom: 0.4rem;
  font-weight: 500;
  color: #333;
}

input,
select {
  padding: 0.6rem 0.8rem;
  border: 1px solid #ccc;
  font-size: 0.9rem;
  border-radius: 8px;
  transition: border 0.2s;
}

input:focus,
select:focus {
  outline: none;
  border-color: #222;
}

.proceed-btn {
  background-color: #222;
  color: white;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: background 0.2s ease;
  margin-top: 0.5rem;
  width: 100%;
}

.proceed-btn:hover {
  background-color: #444;
}

/* Summary Card */
.summary {
  flex: 1;
  background-color: #fafafa;
  padding: 1.2rem;
  border-radius: 14px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.05);
  height: fit-content;
}

.date,
.nights,
.guests {
  font-size: 0.9rem;
  margin-bottom: 0.4rem;
  color: #555;
}

.room-image {
  width: 100%;
  height: 160px;
  background: linear-gradient(135deg, #e0e0e0, #cfcfcf);
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
  border-radius: 10px;
  font-size: 0.9rem;
}

.room-title {
  margin: 0 0 0.8rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #222;
}

.price-breakdown {
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0.4rem 0;
  color: #444;
}

.row.total {
  border-top: 1px dashed #ccc;
  margin-top: 0.8rem;
  padding-top: 0.8rem;
  font-weight: 600;
  font-size: 1rem;
}

.total-price {
  color: #222;
  font-weight: 700;
}

/* Responsive */
@media (max-width: 768px) {
  .contact-container {
    flex-direction: column;
  }

  .contact-form,
  .summary {
    flex: 1 1 100%;
  }
}
</style>
