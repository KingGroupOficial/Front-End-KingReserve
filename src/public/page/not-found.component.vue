<template>
  <div class="container">
    <div class="card">
      <div class="progress-container">
        <div class="progress-bar"></div>
      </div>
      <div class="content">
        <h1 style="font-size: 40px;">Page not found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <img class="sad-face" :class="{ 'fade-in': showSadFace }" src="/src/public/page/images/cute-cow-sitting-alone-cartoon-vector.png" alt="page not found" style="max-width: 300px; height: auto;">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSadFace: false
    };
  },
  mounted() {
    const progressBar = document.querySelector('.progress-bar');

    progressBar.addEventListener('animationend', () => {
      this.showSadFace = true;
    });
  }
}
</script>

<style scoped>
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.card {
  background-color: #32C793;
  border-radius: 10px;
  color : black;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  overflow: hidden;
  width: 80%;
  max-width: 600px;
  padding: 20px;
  transition: transform 0.3s ease-out;
}

.card:hover {
  transform: translateY(-10px);
}


@keyframes progress {
  0% { width: 0; }
  100% { width: 100%; }
}

.content {
  text-align: center;
}

img.sad-face {
  max-width: 300px;
  height: auto;
  opacity: 100;
  transition: opacity 0.5s ease-in;
}

.fade-in {
  opacity: 1;
}
</style>
