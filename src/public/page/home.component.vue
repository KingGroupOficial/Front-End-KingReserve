<script>
import { useI18n } from 'vue-i18n';

export default {
  name: "home",
  setup() {
    const { t } = useI18n();
    return { t };
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    }
  }
}
</script>

<template>
  <div class="container">

  <div class="container">
    <div class="card">
      <router-link to="/reservation" style="text-decoration: none">
        <div class="card-header">
          <img alt="user header" src="/src/public/page/images/home-reservations.jpg">
        </div>

        <div class="title">
          <p>{{ t('reservations') }}</p>
        </div>

        <div class="card-body">
          <p>{{ t('manageReservations') }}</p>
        </div>

        <div class="footer-button">
          <pv-button class="custom-button">
            <i class="pi pi-calendar" style="font-size: 2rem"></i>
          </pv-button>
        </div>
      </router-link>
    </div>

    <div class="card">
      <router-link to="/stadistic" style="text-decoration: none">
        <div class="card-header">
          <img alt="user header" src="https://www.itmplatform.com/lib/uploads/36978940_m.jpg">
        </div>

        <div class="title">
          <p>{{ t('reports') }}</p>
        </div>

        <div class="card-body">
          <p>{{ t('dataReports') }}</p>
        </div>

        <div class="footer-button">
          <pv-button class="custom-button">
            <i class="pi pi-chart-line" style="font-size: 2rem"></i>
          </pv-button>
        </div>
      </router-link>
    </div>

    <div class="card">
      <router-link to="/staf-view" style="text-decoration: none">
        <div class="card-header">
          <img alt="user header" src="/src/public/page/images/staff-home.jpeg">
        </div>

        <div class="title">
          <p>{{ t('staff') }}</p>
        </div>

        <div class="card-body">
          <p>{{ t('connectStaff') }}</p>
        </div>

        <div class="footer-button">
          <pv-button class="custom-button">
            <i class="pi pi-users" style="font-size: 2rem"></i>
          </pv-button>
        </div>
      </router-link>
    </div>

    <div class="card">
      <router-link to="/inventory" style="text-decoration: none">
        <div class="card-header">
          <img alt="user header" src="/src/public/page/images/inventory-home.jpg">
        </div>

        <div class="title">
          <p>{{ t('inventory') }}</p>
        </div>

        <div class="card-body">
          <p>{{ t('manageInventory') }}</p>
        </div>

        <div class="footer-button">
          <pv-button class="custom-button">
            <i class="pi pi-box" style="font-size: 2rem"></i>
          </pv-button>
        </div>
      </router-link>
    </div>

    <div class="card">
      <router-link to="/veterinarians" style="text-decoration: none">
        <div class="card-header">
          <img alt="user header" src="/src/public/page/images/services-home.jpg">
        </div>

        <div class="title">
          <p>{{ t('services') }}</p>
        </div>

        <div class="card-body">
          <p>{{ t('connectServices') }}</p>
        </div>

        <div class="footer-button">
          <pv-button class="custom-button">
            <i class="pi pi-cog" style="font-size: 2rem"></i>
          </pv-button>
        </div>
      </router-link>
    </div>
  </div>

  <div style="text-align: center">
    <pv-button class="scroll-top-button">
      <i class="pi pi-arrow-up" @click="scrollToTop"></i>
    </pv-button>
  </div>
</div>
</template>

<style scoped>
.animated-title {
  color: #34d399;
  font-size: 3rem;
  font-weight: bold;
  animation: fadeIn 2s ease-in-out;
  text-align: center;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.card {
  flex: 1 1 calc(33.333% - 20px);
  max-width: 400px;
  margin: 10px;
  background-color: #18181b;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: scale(1.1);
  opacity: 0.9;
}

.card-header {
  position: relative;
  height: 200px;
  padding: 3px;
}

.card-header img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.title p {
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  color: #f7f7f7;
}

.card-body {
  border-radius: 10px;
  border-color: #f7f7f7;
}

.card-body p {
  color: #f7f7f7;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  padding: 5px;
  margin-bottom: 15px;
}

.footer-button {
  text-align: center;
  padding: 10px;
}

.card-body .footer-button {
  margin-top: 10px;
}

.custom-button {
  background-color: #f4a261;
  border: none;
  color: white;
  font-weight: bold;
}

.custom-button:hover {
  background-color: #e76f51;
}

.scroll-top-button {
  background-color: #c97b47;
  border-color: #c97b47;
  color: white;
}

.scroll-top-button:hover {
  background-color: #b3683a;
}
.container {
  background-color: var(--main-bg-color);
}
</style>