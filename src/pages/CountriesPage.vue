<template>
  <div class="container--countries">
    <h1>Список стран</h1>
    <div class="countries__filters">
      <v-text-field
        v-model="searchQuery"
        @update:modelValue="search"
        label="Поиск страны"
        variant="outlined"
      />
    </div>
    <v-table
      class="countries__table"
      :theme="props.theme === 'dark' ? 'light': 'dark'"
      v-if="countries"
    >
      <thead>
      <tr>
        <th class="text-left">
          <h2>Официальное название</h2>
        </th>
        <th class="text-left" v-if="!smallScreen">
          <h2>Регион</h2>
        </th>
        <th class="text-left">
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="item in countries"
        :key="item.name"
        class="countries--content"
      >
        <td>{{ item.name.official }}</td>
        <td v-if="!smallScreen">{{ item.region }}</td>
        <td>
          <v-btn :theme="props.theme">
            <RouterLink
              :to="{ name: 'Country', params: { name: item.name.common }}"
              :class="{ 'link--light': props.theme === 'dark', 'link--dark': props.theme === 'light' }">
              Подробнее
            </RouterLink>
          </v-btn>
        </td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import restcountries from '@/plugins/restcountries.js';
import { ref } from 'vue';
import { useMatchMedia } from '@/plugins/useMatchMedia';
import debounce from 'lodash.debounce';

const smallScreen = useMatchMedia('(max-width: 859px)');
const countries = ref([]);
const searchQuery = ref('');

const props = defineProps({
  theme: {
    type: String,
  }
});

/**
 * Получить список всех стран
 * @returns {Promise<void>}
 */
async function getCountries() {
  const response = await restcountries.get('/all');
  countries.value = response.data;
}

getCountries();


const search = debounce(() => {
  searchCountries();
}, 500);


/**
 * Поиск страны
 * @returns {Promise<void>}
 */
async function searchCountries() {
  if (searchQuery.value) {
    const response = await restcountries.get(`/name/${searchQuery.value}`);
    countries.value = response.data;
  } else {
    await getCountries();
  }
}

</script>

<style scoped>
.container--countries {
}
.countries__filters {
  margin: 10px 0;
}
.countries__table {
  margin: 0 auto;
  max-width: 1200px;
}
.countries--content {
  font-size: 16px;
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
