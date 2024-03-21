<template>
  <div class="container--navigation">
    <button class="link">
      <RouterLink
        :to="{ name: 'Countries' }"
        :class="{ 'link--light': props.theme === 'dark', 'link--dark': props.theme === 'light' }">
        Все страны
      </RouterLink>
    </button>
    <button class="link">
      <RouterLink
        :to="{ name: 'Favourites' }"
        :class="{ 'link--light': props.theme === 'dark', 'link--dark': props.theme === 'light' }">
        Избранные
      </RouterLink>
    </button>
    <button class="link">
      <RouterLink
        :to="{ name: 'History' }"
        :class="{ 'link--light': props.theme === 'dark', 'link--dark': props.theme === 'light' }">
        История
      </RouterLink>
    </button>
    <button class="link">
      <RouterLink
        :to="{ name: 'Compare' }"
        :class="{ 'link--light': props.theme === 'dark', 'link--dark': props.theme === 'light' }">
        Сравнение
      </RouterLink>
    </button>
    <v-btn class="link" @click="emit('change-theme')" :theme="props.theme">Сменить тему</v-btn>
  </div>
</template>

<script setup>
const props = defineProps({
  theme: {
    type: String,
  }
});

const emit = defineEmits(['change-theme']);


</script>

<style scoped>
.container--navigation {
  display: flex;
  justify-content: space-around;
  height: 50px;
  max-width: 100%;
  flex-wrap: wrap;
}
.link--dark {
  text-decoration: none;
  color: white;
}
.link--light {
  text-decoration: none;
  color: black;
}
</style>
