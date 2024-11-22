<template>
  <div class="container" v-if="showTerms">
    <div class="terms-card">
      <h1>{{ t("Terms and Conditions") }}</h1>
      <div class="content">
        <p>{{ t("Welcome to King Reserve! These terms and conditions outline the rules and regulations for the use of our website.") }}</p>
        <h2>{{ t("1. Introduction") }}</h2>
        <p>{{ t("By accessing this website, we assume you accept these terms and conditions. Do not continue to use King Reserve if you do not agree to all of the terms and conditions stated on this page.") }}</p>
        <h2>{{ t("2. Reservations") }}</h2>
        <p>{{ t("All reservations made through our website are subject to availability and confirmation. We reserve the right to cancel or modify reservations if necessary.") }}</p>
        <h2>{{ t("3. Payment") }}</h2>
        <p>{{ t("Payment for reservations must be made in full at the time of booking. We accept various payment methods as indicated on our website.") }}</p>
        <h2>{{ t("4. Cancellations and Refunds") }}</h2>
        <p>{{ t("Cancellations must be made at least 24 hours before the scheduled check-in time to receive a full refund. No refunds will be issued for cancellations made less than 24 hours before check-in.") }}</p>
        <h2>{{ t("5. Changes to Terms") }}</h2>
        <p>{{ t("We reserve the right to amend these terms and conditions at any time. Any changes will be posted on this page, and it is your responsibility to review these terms regularly.") }}</p>
        <h2>{{ t("6. Contact Us") }}</h2>
        <p>{{ t("If you have any questions about these terms and conditions, please contact us at support@kingreserve.com.") }}</p>
      </div>
      <div class="actions">
        <button class="accept-btn" @click="acceptTerms">{{ t("Accept") }}</button>
        <button class="reject-btn" @click="rejectTerms">{{ t("Reject") }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

export default {
  name: "termsAndConditions",
  props: {
    showTerms: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["close"], // Emitir evento para cerrar el modal
  setup(props, { emit }) {
    const { t } = useI18n();
    const router = useRouter();

    const acceptTerms = () => {
      emit("close"); // Ocultar el modal
      router.push("/home"); // Redirige al home
    };

    const rejectTerms = () => {
      emit("close"); // Ocultar el modal
      router.push("/sign-in"); // Redirige al inicio de sesión
    };

    return {
      t,
      acceptTerms,
      rejectTerms,
    };
  },
};
</script>

<style scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8); /* Fondo oscuro */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.terms-card {
  background: #fff; /* Fondo blanco */
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
}

h1 {
  font-size: 1.8rem;
  color: #4d3b29;
  margin-bottom: 1rem;
  text-align: center;
}

.content {
  overflow-y: auto;
  max-height: 60vh; /* Limitar la altura para permitir scroll */
  padding-right: 1rem;
}

h2 {
  font-size: 1.4rem;
  color: #6b4423;
  margin-top: 1rem;
}

p {
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.actions {
  display: flex;
  justify-content: space-evenly;
  margin-top: 1.5rem;
}

.accept-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.accept-btn:hover {
  background-color: #388e3c;
}

.reject-btn {
  background-color: #e53935;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.reject-btn:hover {
  background-color: #c62828;
}
</style>
