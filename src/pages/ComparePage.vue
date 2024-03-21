<template>
  <div>
    <br>
    <v-btn
      class="compare--stop"
      @click="removeCompareCountry"
      :theme="props.theme">
      Не Сравнивать
    </v-btn>
    <br>
    <div class="compare--countries">
      <div class="container--country" v-if="firstCountry">
        <div class="country--top">
          <h1 class="country--top--item">{{ firstCountry.name.official }} - {{ firstCountry.translations.rus.official }}
            {{ firstCountry.flag }}</h1>
        </div>
        <div class="country--info">
          <div class="country--content--like">
            <img class="country--flag" :src="`${firstCountry.flags.svg}`" alt="flag">
            <p>Столица - {{ firstCountry.capital[0] }}</p>
            <p>Континент - {{ firstCountry.continents[0] }}</p>
            <p v-if="!firstCountry.landlocked">Выход к морю - есть</p>
            <p v-if="firstCountry.landlocked">Выход к морю - нет</p>
            <div class="country__list">
              <p>Денонимы: </p>
              <div>
                <div v-for="item in firstCountry.demonyms"
                     :key="item.key">
                  <p>женский - {{ item.f }}, мужской - {{ item.m }}</p>
                </div>
              </div>
            </div>
            <div class="country__list">
              <p>Валюта: </p>
              <div>
                <div v-for="item in firstCountry.currencies"
                     :key="item.key">
                  <p>{{ item.name }} ({{ item.symbol }})</p>
                </div>
              </div>
            </div>
            <p>Площадь - {{ firstCountry.area }} км²</p>
            <p>Население - {{ firstCountry.population }} чел.</p>
            <p>Направление движения - {{ firstCountry.car.side }}</p>
            <div class="country__list">
              <p v-if="firstCountry.timezones.length === 1">Часовой пояс: </p>
              <p v-else>Часовые пояса: </p>
              <div>
                <div v-for="item in firstCountry.timezones"
                     :key="item.key">
                  <p>{{ item }}</p>
                </div>
              </div>
            </div>
            <div class="country__list">
              <p v-if="firstCountry.languages.length === 1">Язык: </p>
              <p v-else>Языки: </p>
              <div>
                <div v-for="item in firstCountry.languages"
                     :key="item.key">
                  <p>{{ item }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container--country" v-if="secondCountry">
        <div class="country--top">
          <h1 class="country--top--item">{{ secondCountry.name.official }} - {{
              secondCountry.translations.rus.official
            }}
            {{ secondCountry.flag }}</h1>
        </div>
        <div class="country--info">
          <div class="country--content--like">
            <img class="country--flag" :src="`${secondCountry.flags.svg}`" alt="flag">
            <p>Столица - {{ secondCountry.capital[0] }}</p>
            <p>Континент - {{ secondCountry.continents[0] }}</p>
            <p v-if="!secondCountry.landlocked">Выход к морю - есть</p>
            <p v-if="secondCountry.landlocked">Выход к морю - нет</p>
            <div class="country__list">
              <p>Денонимы: </p>
              <div>
                <div v-for="item in secondCountry.demonyms"
                     :key="item.key">
                  <p>женский - {{ item.f }}, мужской - {{ item.m }}</p>
                </div>
              </div>
            </div>
            <div class="country__list">
              <p>Валюта: </p>
              <div>
                <div v-for="item in secondCountry.currencies"
                     :key="item.key">
                  <p>{{ item.name }} ({{ item.symbol }})</p>
                </div>
              </div>
            </div>
            <p>Площадь - {{ secondCountry.area }} км²</p>
            <p>Население - {{ secondCountry.population }} чел.</p>
            <p>Направление движения - {{ secondCountry.car.side }}</p>
            <div class="country__list">
              <p v-if="secondCountry.timezones.length === 1">Часовой пояс: </p>
              <p v-else>Часовые пояса: </p>
              <div>
                <div v-for="item in secondCountry.timezones"
                     :key="item.key">
                  <p>{{ item }}</p>
                </div>
              </div>
            </div>
            <div class="country__list">
              <p v-if="secondCountry.languages.length === 1">Язык: </p>
              <p v-else>Языки: </p>
              <div>
                <div v-for="item in secondCountry.languages"
                     :key="item.key">
                  <p>{{ item }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

const firstCountry = ref(null);
const secondCountry = ref(null);
const countries = ref(localStorage.getItem('compareCountry')?.split(',') ?? []);

/**
 * Получить информацию страны
 * @returns {Promise<void>}
 */
async function getCountries() {
  const firsResponse = await restcountries.get(`/name/${countries.value[0]}`);
  const secondResponse = await restcountries.get(`/name/${countries.value[1]}`);
  firstCountry.value = firsResponse.data[0];
  secondCountry.value = secondResponse.data[0];
}

getCountries();

/**
 * удалить из сравнения
 */
function removeCompareCountry() {
  localStorage.removeItem('compareCountry');
  router.push({ name: 'Countries' })
}

</script>

<style scoped>
.compare--countries {
  display: flex;
}
.compare--stop {
  width: 100%;
  margin: 0 auto;
}
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
  max-height: 200px;
}
p {
  margin: 10px;
}
@media screen and (max-width: 950px) {
  .country--content--like {
    width: 100%;
  }
}
</style>
