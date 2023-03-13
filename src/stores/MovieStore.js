import {defineStore} from 'pinia';
import {ref, computed, watch} from 'vue';

// Options API
// export const useMovieStore = defineStore('movieStore', {
//   state: () => ({
//     movies: [],
//     activeTab: 2,
//   }),
//   getters: {
//     watchMovies() {
//       return this.movies.filter(el => el.isWatched);
//     },
//     totalCountMovies() {
//       return this.movies.length;
//     },
//   },
//   actions: {
//     setActionTab(id) {
//       this.activeTab = id;
//     },
//     toggleWatchedMovie(id) {
//       let idNeed = this.movies.findIndex(el => el.id === id);
//       this.movies[idNeed].isWatched = !this.movies[idNeed].isWatched;
//     },
//     deleteMovie(id) {
//       this.movies = this.movies.filter(el => el.id !== id);
//     },
//   },
// });

//  Composition API
export const useMovieStore = defineStore('movieStore', () => {
  const movies = ref([]);
  const activeTab = ref(2);

  const movieOnLocalStorage = localStorage.getItem('movies');
  if (movieOnLocalStorage) {
    movies.value =JSON.parse(movieOnLocalStorage)._value;
  }

  const watchMovies = computed(() => {
    return movies.value.filter(el => el.isWatched);
  });

  const totalCountMovies = computed(() => {
    return movies.value.length;
  });

  const setActionTab = (id) => {
    activeTab.value = id;
  };

  const toggleWatchedMovie = (id) => {
    let idNeed = movies.value.findIndex(el => el.id === id);
    movies.value[idNeed].isWatched = !movies.value[idNeed].isWatched;
  };

  const deleteMovie = (id) => {
    movies.value = movies.value.filter(el => el.id !== id);
  };

  watch(() => movies, state => {
    localStorage.setItem('movies', JSON.stringify(state));
  }, {deep: true});

  return {
    movies, activeTab, watchMovies, totalCountMovies,
    toggleWatchedMovie, setActionTab, deleteMovie,
  };
});