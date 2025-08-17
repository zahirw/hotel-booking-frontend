<script setup lang="ts">
import type { getContactByIdResponseType, getRoomsResponseType } from '@/services/core/core.type'
import { getContactById } from '@/services/core/mutations/contact'
import { getRoom } from '@/services/core/queries/room'
import { computed, onMounted, ref } from 'vue'
const props = defineProps<{
  roomId: string
  contactId: string
}>()

const { roomId, contactId } = props
const roomData = ref<getRoomsResponseType>()
const contactData = ref<getContactByIdResponseType>()
const tax = computed(() => (roomData.value ? (roomData.value?.pricePerNight * 9) / 100 : 0))
const total = computed(() =>
  roomData.value ? Number(tax.value) + Number(roomData.value.pricePerNight) : 0,
)

const fetchData = () => {
  getRoom({ id: roomId }).then((room) => (roomData.value = room))
  getContactById({ id: contactId }).then((contact) => (contactData.value = contact.data))
}

onMounted(() => fetchData())
</script>
<template>
  <div class="booking-card">
    <!-- Room Info -->
    <div class="room-section">
      <div class="room-image">340 × 210</div>
      <div class="room-text">
        <h3 class="room-title">{{ roomData?.name }}</h3>
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
          {{ roomData?.maxGuests }} Guest
        </p>

        <div class="package">
          <h4 class="section-heading">Package Details</h4>
          <div class="price-row">
            <span>Room</span>
            <span>S${{ roomData?.pricePerNight }}</span>
          </div>
          <div class="price-row">
            <span>Tax & Service (9%)</span>
            <span>S${{ tax }}</span>
          </div>
          <div class="price-row total">
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
  max-width: 800px;
  margin: auto;
  border: 1px solid #f0f0f0;
}

.room-section {
  display: flex;
  gap: 20px;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.room-image {
  flex-shrink: 0;
  width: 180px;
  height: 120px;
  border-radius: 12px;
  background: linear-gradient(135deg, #e3e3e3, #d2d2d2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #555;
  font-weight: 500;
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
