<template>
  <main>
    <header class="header">
      <img src="/logo.svg" alt="logo" class="header-logo">
      <h2>My Favorite Movies</h2>
    </header>

    <section class="tabs">
      <button
          :class="['btn', { btn_green: movieStore.activeTab === 1 }]"
          @click="setTab(1)">
        Favorite
      </button>
      <button
          :class="['btn', { btn_green: movieStore.activeTab === 2 }]"
          @click="setTab(2)">
        Search
      </button>
    </section>

    <section class="movies" v-if="movieStore.activeTab === 1">
      <h3>Watched movies ( count: {{ movieStore.watchMovies.length }} )</h3>
      <Movie v-for="movie in  movieStore.watchMovies"
             :v-key="movie.id"
             :movie="movie"/>

      <h3>All movies ( count: {{ movieStore.totalCountMovies }} )</h3>
      <Movie v-for="movie in  movieStore.movies"
             :v-key="movie.id"
             :movie="movie"/>
    </section>

    <section class="search" v-if="movieStore.activeTab === 2">
      <Search />
    </section>
  </main>
</template>

<script setup>
import {useMovieStore} from './stores/MovieStore';
import Movie from './components/Movie';
import Search from './components/Search';

const setTab = (id) => {
  movieStore.setActionTab(id);
};

const movieStore = new useMovieStore();
</script>

<style lang="css">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.header-logo {
  max-width: 50px;
  margin-right: 10px;
}

.btn {
  border: none;
  width: 100px;
  height: 40px;
  font-size: 14px;
  margin: 0 10px;
  border-radius: 10px;
  cursor: pointer;
  background: #efefef;
}

.btn:hover {
  opacity: 0.7;
}

.btn_green {
  background: #37df5c;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
</style>