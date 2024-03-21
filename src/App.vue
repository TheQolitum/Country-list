<template>
  <div :class="{ 'html--light': theme === 'light', 'html--dark': theme === 'dark' }">
    <div
      :class="{ 'layout--light': theme === 'light', 'layout--dark': theme === 'dark' }">
      <NavigationBar
        :theme="theme"
        @change-theme="changeTheme"
      />
      <hr>
      <RouterView
        class="container"
        :theme="theme"
      />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import NavigationBar from '@/components/NavigationBar.vue';
import { ref } from 'vue';

const theme = ref('');

/**
 * Получить цвет оформления
 */
function getTheme() {
  if (localStorage.getItem('theme')) {
    theme.value = localStorage.getItem('theme');
  } else {
    localStorage.setItem('theme', 'light');
    getTheme();
  }
}

getTheme();

/**
 * Сменить цвет оформления
 */
function changeTheme() {
  if (localStorage.getItem('theme') === 'light') {
    localStorage.setItem('theme', 'dark');
    getTheme();
  } else {
    localStorage.setItem('theme', 'light');
    getTheme();
  }
}

</script>

<style scoped>
.html--dark {
  padding: 0;
  margin: 0;
  background-color: white;
}
.html--light {
  padding: 0;
  margin: 0;
  background-color: #1c1e21;
}
.layout--dark {
  max-width: 1400px;
  margin: 0 auto;
  padding: 10px;
  background-color: white;
  color: black;
  min-height: 100vh;
}
.layout--light {
  max-width: 1400px;
  margin: 0 auto;
  padding: 10px;
  background-color: #1c1e21;
  color: white;
  min-height: 100vh;
}
.container {
}

</style>