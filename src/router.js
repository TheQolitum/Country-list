import { createRouter, createWebHistory } from 'vue-router';
import CountriesPage from '@/pages/CountriesPage.vue';
import CountryPage from '@/pages/CountryPage.vue';
import FavouritesPage from '@/pages/FavouritesPage.vue';
import HistoryPage from '@/pages/HistoryPage.vue';
import ComparePage from '@/pages/ComparePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/countries',
      name: 'Countries',
      component: CountriesPage,
    },
    {
      path: '/countries/:name',
      name: 'Country',
      component: CountryPage,
    },
    {
      path: '/countries/compare',
      name: 'Compare',
      component: ComparePage,
    },
    {
      path: '/countries/favourites',
      name: 'Favourites',
      component: FavouritesPage,
    },
    {
      path: '/countries/history',
      name: 'History',
      component: HistoryPage,
    },
  ]
});

export default router;
