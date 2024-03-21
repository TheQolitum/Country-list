<template>
  <div class="container--country" v-if="country">
    <div class="country--top">
      <h1 class="country--top--item">{{ name }} - {{ country.translations.rus.official }} {{ country.flag }}</h1>
      <div>
        <v-btn
          class="country--top--item"
          @click="setLocalStorage"
          :theme="props.theme"
          v-if="!favourite.find(item => item === name)">
          В избранное
        </v-btn>
        <v-btn
          class="country--top--item"
          @click="removeLocalStorage"
          :theme="props.theme"
          v-else>
          Удалить из избранного
        </v-btn>
      </div>
      <div>
        <v-btn
          class="country--top--item"
          @click="setCompareCountry"
          :theme="props.theme"
          v-if="!compareCountry.find(item => item === name)">
          Сравнить
        </v-btn>
        <v-btn
          class="country--top--item"
          @click="removeCompareCountry"
          :theme="props.theme"
          v-else>
          Не Сравнивать
        </v-btn>
      </div>
    </div>
    <div class="country--info">
      <div class="country--content--like">
        <img class="country--flag" :src="`${country.flags.svg}`" alt="flag">
        <p>Столица - {{ country.capital[0] }}</p>
        <p>Континент - {{ country.continents[0] }}</p>
        <p v-if="!country.landlocked">Выход к морю - есть</p>
        <p v-if="country.landlocked">Выход к морю - нет</p>
        <div class="country__list">
          <p>Денонимы: </p>
          <div>
            <div v-for="item in country.demonyms"
                 :key="item.key">
              <p>женский - {{ item.f }}, мужской - {{ item.m }}</p>
            </div>
          </div>
        </div>
        <div class="country__list">
          <p>Валюта: </p>
          <div>
            <div v-for="item in country.currencies"
                 :key="item.key">
              <p>{{ item.name }} ({{ item.symbol }})</p>
            </div>
          </div>
        </div>
      </div>
      <div class="country--content--like">
        <p>Площадь - {{ country.area }} км²</p>
        <p>Население - {{ country.population }} чел.</p>
        <p>Направление движения - {{ country.car.side }}</p>
        <div class="country__list">
          <p v-if="country.timezones.length === 1">Часовой пояс: </p>
          <p v-else>Часовые пояса: </p>
          <div>
            <div v-for="item in country.timezones"
                 :key="item.key">
              <p>{{ item }}</p>
            </div>
          </div>
        </div>
        <div class="country__list">
          <p v-if="country.languages.length === 1">Язык: </p>
          <p v-else>Языки: </p>
          <div>
            <div v-for="item in country.languages"
                 :key="item.key">
              <p>{{ item }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="country--map">
      <GMapMap
        :center="center"
        :zoom="4"
        map-type-id="terrain"
        class="country--map"
      />
    </div>
  </div>
</template>

<script setup>
import restcountries from '@/plugins/restcountries.js';
import { ref } from 'vue';
import router from '@/router.js';

const props = defineProps({
  theme: {
    type: String,
  }
});

const name = router.currentRoute.value.params.name;

const country = ref(null);
const center = ref({});

/**
 * Получить информацию страны
 * @returns {Promise<void>}
 */
async function getCountry() {
  const response = await restcountries.get(`/name/${name}`);
  country.value = response.data[0];
  center.value = { lat: response.data[0].latlng[0], lng: response.data[0].latlng[1] };
}

getCountry();

const favourite = ref(localStorage.getItem('favouriteCountries')?.split(',') ?? []);

/**
 * Добавить в избранное
 */
function setLocalStorage() {
  favourite.value.push(name);
  localStorage.setItem('favouriteCountries', favourite.value.toString());
}

/**
 * удалить из избранного
 */
function removeLocalStorage() {
  favourite.value = favourite.value.filter((item) => item !== name);
  localStorage.setItem('favouriteCountries', favourite.value.toString());
  if (localStorage.getItem('favouriteCountries')?.split(',')[0] === '') {
    localStorage.removeItem('favouriteCountries');
  }
}

const history = ref(localStorage.getItem('history')?.split(',') ?? []);

/**
 * Добавить в историю посещенных стран
 */
function addHistory() {
  if (localStorage.getItem('history')) {
    history.value = localStorage.getItem('history').split(',');
    history.value.push(name);
    localStorage.setItem('history', history.value.toString());
  } else {
    localStorage.setItem('history', name);
  }
}

addHistory();

const compareCountry = ref(localStorage.getItem('compareCountry')?.split(',') ?? []);

/**
 * Добавить в сравнение
 */
function setCompareCountry() {
  if (compareCountry.value.length < 2) {
    compareCountry.value.push(name);
    localStorage.setItem('compareCountry', compareCountry.value.toString());
  } else {
    alert('Сравнивать можно не более 2-х стран')
  }

}

/**
 * удалить из сравнения
 */
function removeCompareCountry() {
  compareCountry.value = compareCountry.value.filter((item) => item !== name);
  localStorage.setItem('compareCountry', compareCountry.value.toString());
  if (localStorage.getItem('compareCountry')?.split(',')[0] === '') {
    localStorage.removeItem('compareCountry');
  }
}

</script>

<style scoped>
.container--country {
}
.country--top {
  display: flex;
  align-items: center;
}
.country--top h1 {
}
.country--top--item {
  margin-right: 20px;
}
.country--info {
  margin-top: 20px;
  display: flex;
  font-size: 20px;
  flex-wrap: wrap;
  justify-content: space-around;
}
.country__list {
  display: flex;
}
.country--content--like {
  max-width: 600px;
}
.country--flag {
  width: 100%;
}
p {
  margin: 10px;
}
@media screen and (max-width: 950px) {
  .country--content--like {
    width: 100%;
  }
}
.country--map {
  max-width: 100%;
  height: 300px;
  margin-top: 10px;
}
</style>
