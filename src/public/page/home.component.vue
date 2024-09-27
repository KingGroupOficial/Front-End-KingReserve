<script>
export default {
  name: "home",

  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    }
  }
}
</script>

<template>
  <div>
    <h1 class="animated-title" style="margin-bottom: 80px;">Welcome to King Reserve</h1>
  </div>

  <div class="container">
    <div class="card">
      <router-link to="/reservation" style="text-decoration: none">
        <div class="card-header">
          <img alt="user header" src="/src/public/page/images/home-reservations.jpg">
        </div>

        <div class="title">
          <p>Reservations</p>
        </div>

        <div class="card-body">
          <p>Manage your reservations</p>
        </div>

        <div class="footer-button">
          <pv-button class="custom-button">
            <!-- Ícono de calendario para las reservas -->
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
          <p>Reports</p>
        </div>

        <div class="card-body">
          <p>Data, reports and statistics in real time</p>
        </div>

        <div class="footer-button">
          <pv-button class="custom-button">
            <!-- Ícono de gráfico para los informes -->
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
          <p>Staff</p>
        </div>

        <div class="card-body">
          <p>Connect and lead with your entire staff</p>
        </div>

        <div class="footer-button">
          <pv-button class="custom-button">
            <!-- Ícono de usuario para el staff -->
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
          <p>Inventory</p>
        </div>

        <div class="card-body">
          <p>Keep personalized control of your inventory</p>
        </div>

        <div class="footer-button">
          <pv-button class="custom-button">
            <!-- Ícono de caja para el inventario -->
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
          <p>Services</p>
        </div>

        <div class="card-body">
          <p>Connect the different services for your hotel</p>
        </div>

        <div class="footer-button">
          <pv-button class="custom-button">
            <!-- Ícono de herramientas para los servicios -->
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

/* Estilos personalizados para los botones */
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
</style>
