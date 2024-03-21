<template>
  <div class="container--history">
    <h1>Избранные</h1>
    <div v-for="item in favourite"
         :key="item.key"
         class="history--items">
      <p>{{ item }}</p>
      <v-btn :theme="props.theme">
        <RouterLink
          :to="{ name: 'Country', params: { name: item }}"
          :class="{ 'link--light': props.theme === 'dark', 'link--dark': props.theme === 'light' }">
          Перейти
        </RouterLink>
      </v-btn>
      <v-btn
        :class="{ 'link--light': props.theme === 'dark', 'link--dark': props.theme === 'light' }"
        @click="removeLocalStorage(item)"
        :theme="props.theme">
        X
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  theme: {
    type: String,
  }
});

const favourite = ref(localStorage.getItem('favouriteCountries')?.split(',') ?? []);

/**
 * удалить из избранного
 */
function removeLocalStorage(name) {
  favourite.value = favourite.value.filter((item) => item !== name);
  localStorage.setItem('favouriteCountries', favourite.value.toString());
  if (localStorage.getItem('favouriteCountries')?.split(',')[0] === '') {
    localStorage.removeItem('favouriteCountries');
  }
}
</script>

<style scoped>
.container--history {
  margin: 0 auto;
  max-width: 300px;
}
.history--items {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
}
.link--light {
  text-decoration: none;
  color: white;
}
.link--dark {
  text-decoration: none;
  color: black;
}
</style>
