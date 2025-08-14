<script setup lang="ts">
import StepNavigationComponent from '@/components/StepNavigationComponent.vue'
import { reactive } from 'vue'

const form = reactive({
  title: 'Mr.',
  name: 'Adam',
  email: 'bazytepu@teleg.eu',
})
</script>
<template>
  <div class="contact-page">
    <StepNavigationComponent />

    <div class="contact-container">
      <!-- Contact Information Form -->
      <div class="contact-form">
        <h2>Contact Information</h2>

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
          <label for="name">Name</label>
          <input id="name" v-model="form.name" type="text" />
        </div>

        <div class="form-group">
          <label for="email">Email Address</label>
          <input id="email" v-model="form.email" type="email" />
        </div>

        <button class="proceed-btn">PROCEED</button>
      </div>

      <!-- Summary -->
      <div class="summary">
        <p class="date">JUN 17, 2025 → JUN 18, 2025</p>
        <p class="nights">1 NIGHT</p>
        <p class="guests">ROOM: 1 GUEST</p>

        <div class="room-image">340 × 210</div>

        <h3>ROOM 1 TITLE</h3>
        <div class="price-breakdown">
          <div class="row">
            <span>Room</span>
            <span>S$1,080.00</span>
          </div>
          <div class="row">
            <span>Tax & Service Charges (9%)</span>
            <span>S$97.20</span>
          </div>
          <div class="row total">
            <span>TOTAL</span>
            <span>S$1,177.20</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-page {
  width: 100%;
  font-family: Arial, sans-serif;
  padding: 1rem;
  margin: auto;
  max-width: 900px;
}

.contact-container {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.contact-form {
  flex: 2;
  background-color: #f7f7f0;
  padding: 1rem;
}

.contact-form h2 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

label {
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
}

input,
select {
  padding: 0.4rem;
  border: 1px solid #ccc;
  font-size: 0.9rem;
}

.proceed-btn {
  background-color: black;
  color: white;
  padding: 0.6rem 1rem;
  border: none;
  cursor: pointer;
}

.summary {
  flex: 1;
  background-color: #f7f7f0;
  padding: 1rem;
}

.date,
.nights,
.guests {
  font-size: 0.85rem;
  margin-bottom: 0.3rem;
}

.room-image {
  width: 100%;
  height: 150px;
  background-color: #ccc;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
}

.price-breakdown {
  font-size: 0.85rem;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0.3rem 0;
}

.total {
  font-weight: bold;
  margin-top: 1rem;
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
