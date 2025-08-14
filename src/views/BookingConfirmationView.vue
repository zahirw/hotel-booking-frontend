<script setup lang="ts"></script>

<template>
  <div class="booking-confirmation">
    <!-- Header -->
    <h2>Your Booking Has Been Confirmed</h2>
    <p class="confirmation-text">
      We have sent your booking confirmation to the email address that you have provided.<br />
      Check-in/Check-out: <strong>JUN 17, 2025</strong> → <strong>JUN 18, 2025</strong><br />
      Booking Confirmation Number: <strong>RES123456789</strong><br />
      Total Price for 1 Night: <strong>S$1,177.20</strong>
    </p>

    <!-- Booking Details -->
    <div class="booking-details">
      <div class="room-info">
        <div class="room-image">340 × 210</div>
        <div class="room-text">
          <h3>Room: Room 1 Title</h3>
          <p>1 Guest</p>

          <div class="package">
            <h4>Package:</h4>
            <div class="price-row">
              <span>Room</span>
              <span>S$1,080.00</span>
            </div>
            <div class="price-row">
              <span>Tax & Service Charges (9%)</span>
              <span>S$97.20</span>
            </div>
            <div class="price-row total">
              <strong>Total Price</strong>
              <strong>S$1,177.20</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Guest Details -->
      <div class="guest-details">
        <h4>Guest Details</h4>
        <p><strong>Name:</strong> Mr. Keegan Middleton</p>
        <p><strong>Email Address:</strong> bazytepu@teleg.eu</p>
      </div>
    </div>
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

.booking-details {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  border: 1px solid #ddd;
  background: #f9f9f5;
  padding: 15px;
}

.room-info {
  flex: 2;
  display: flex;
  gap: 15px;
}

.room-image {
  width: 150px;
  height: 100px;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #666;
}

.room-text h3 {
  margin: 0;
  font-size: 16px;
}

.package {
  margin-top: 10px;
}

.package h4 {
  margin-bottom: 5px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin: 3px 0;
}

.price-row.total {
  border-top: 1px solid #ccc;
  margin-top: 5px;
  padding-top: 5px;
  font-weight: bold;
}

.guest-details {
  flex: 1;
  background: #eaeae2;
  padding: 10px;
}

.guest-details h4 {
  margin-top: 0;
}

@media (max-width: 768px) {
  .booking-details {
    flex-direction: column;
  }
  .room-info {
    flex-direction: column;
    align-items: flex-start;
  }
  .room-image {
    width: 100%;
    height: 150px;
  }
}
</style>
