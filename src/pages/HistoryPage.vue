<template>
  <div class="container--history">
    <h1>История</h1>
    <div v-for="item in history"
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
    </div>
    <v-btn @click="clearHistory" :theme="props.theme">Очистить историю</v-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  theme: {
    type: String,
  }
});

const history = ref(localStorage.getItem('history')?.split(',') ?? []);

function clearHistory() {
  history.value = ''
  localStorage.removeItem('history')
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
