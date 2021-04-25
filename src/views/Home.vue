<template>
  <main class="scores w-full md:w-2/3 lg:w-1/2 spacing">
    <h2 class="font-bold text-6xl my-5">Scoreboard</h2>
    <p v-if="state === STATES.LOADING">Chargement des scores</p>
    <table v-else class="score-table">
      <thead>
          <tr>
            <th>Top</th>
            <th class="text-left">Username</th>
            <th>Score</th>
          </tr>
      </thead>
      <tbody>
        <tr v-for="(score, i) in scores" :key="score._id">
          <td v-if="i === 0">
            <fa-icon class="" icon="trophy"  />
          </td>
          <td v-else-if="i === 1">
            <fa-icon class="" icon="medal"  />
          </td>
          <td v-else-if="i === 2">
            <fa-icon class="" icon="cookie"  />
          </td>
          <td v-else>{{ i+1 }}</td>
          <td class="text-left">{{ score.username}}</td>
          <td>{{ score.value }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
import ApiService from '@/services/ApiService';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrophy,faMedal,faCookie } from '@fortawesome/free-solid-svg-icons';
library.add(faTrophy,faMedal,faCookie);
const STATES = {
  IDLE: 'idle', EMPTY: 'empty', LOADING: 'loading', ERROR: 'error',
};
export default {
  name: 'Home',
  data: () => {
    return {
      scores: [],
      state: STATES.IDLE,
      STATES,
    }
  },
  methods: {
    fetchScores(){
      this.state = STATES.LOADING;

      ApiService.fetchScoreBoard().then(({data}) => {
        this.scores = data.data || [];
        this.state = STATES.IDLE;
      }).catch(() => {
        this.state = STATES.ERROR;
      });
    }
  },
  created() {
    this.fetchScores();
  }

};
</script>

<style>
.scores{
  @apply flex flex-col bg-elevation-2 shadow-lg;
}
.score-table{
  @apply w-full;
}
table tr:first-child td{
  @apply font-bold text-4xl pt-5;
  color: gold;
}
table tr:nth-child(2) td{
  @apply font-bold text-2xl;
  color: silver;
}
table tr:nth-child(3) td{
  @apply font-bold text-xl;
  color: #cd7f32;
}
th{
  @apply border-b pb-3;
}
td{
  @apply py-3 text-center;
}

</style>
