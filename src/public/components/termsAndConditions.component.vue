<script>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

export default {
  name: "termsAndConditions",
  setup() {
    const { t } = useI18n();
    const router = useRouter();

    const returnToConfigurations = () => {
      router.push('/settings');
    };

    return {
      t,
      returnToConfigurations
    };
  }
}
</script>

<template>
  <div class="container">
    <pv-card class="terms-card">
      <template #title>
        <h1>{{ t('Terms and Conditions') }}</h1>
      </template>
      <template #content>
        <p>{{ t('Welcome to King Reserve! These terms and conditions outline the rules and regulations for the use of our website.') }}</p>

        <h2>{{ t('1. Introduction') }}</h2>
        <p>{{ t('By accessing this website, we assume you accept these terms and conditions. Do not continue to use King Reserve if you do not agree to all of the terms and conditions stated on this page.') }}</p>

        <h2>{{ t('2. Reservations') }}</h2>
        <p>{{ t('All reservations made through our website are subject to availability and confirmation. We reserve the right to cancel or modify reservations if necessary.') }}</p>

        <h2>{{ t('3. Payment') }}</h2>
        <p>{{ t('Payment for reservations must be made in full at the time of booking. We accept various payment methods as indicated on our website.') }}</p>

        <h2>{{ t('4. Cancellations and Refunds') }}</h2>
        <p>{{ t('Cancellations must be made at least 24 hours before the scheduled check-in time to receive a full refund. No refunds will be issued for cancellations made less than 24 hours before check-in.') }}</p>

        <h2>{{ t('5. Changes to Terms') }}</h2>
        <p>{{ t('We reserve the right to amend these terms and conditions at any time. Any changes will be posted on this page, and it is your responsibility to review these terms regularly.') }}</p>

        <h2>{{ t('6. Contact Us') }}</h2>
        <p>{{ t('If you have any questions about these terms and conditions, please contact us at support@kingreserve.com.') }}</p>
      </template>
      <template #footer>
        <button @click="returnToConfigurations">{{ t('Return to Configurations') }}</button>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.container {
  background-color: var(--main-bg-color);
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.terms-card {
  max-width: 800px;
  width: 100%;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #4d3b29;
}

h1, h2 {
  color: #fef7e0;
}

p {
  margin-bottom: 1em;
  line-height: 1.6;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  color: #4d3b29;
  background-color: #fef7e0;
}
</style>